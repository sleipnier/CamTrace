"""A1Z lateral translation test on macOS via gs_usb.

Interactive 4-step sequence (mirror of gripper_translate_test but for Y-axis):
  1. Move to neutral, open gripper
  2. [Enter] -> close gripper (hold phone)
  3. [Enter] -> lateral (Y-axis) translation +X translation, return to neutral
  4. [Enter] -> open gripper, return to home, zero-gravity

Note: lateral (Y) translation causes minimal j4 perturbation (~3.7deg at 5cm)
— much more stable than forward/backward (X) which requires 10deg+ compensation.

Usage:
    python lateral_translate_test.py --workspace /path/to/workspace
"""

import argparse
import os
import signal
import sys
import time
from pathlib import Path

import numpy as np
import pinocchio as pin

SKILL_SCRIPTS = Path(__file__).resolve().parent

NEUTRAL_DEG = [0.0, 34.0, -23.0, -29.0, 0.0, 0.0]
HOME_DEG = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
MOVE_SPEED = 0.3  # rad/s
GRIPPER_OPEN = 1.0
GRIPPER_CLOSE = 0.0
TRANSLATE_Y = -0.05  # meters lateral in Cartesian Y (negative = left)
TRANSLATE_X = 0.03  # small forward nudge (same side as lateral)
EE_FRAME = "gripper_finger_rIght_link"  # NOTE: typo in URDF - "rIght" not "right"


class ArmKinematics:
    """Owns its own Pinocchio model/data — never touches the SDK's state."""

    def __init__(self, urdf_path: str, end_effector_frame: str):
        from a1z.robots.kinematics import Kinematics as SDKKinematics

        sdk_kin = SDKKinematics(urdf_path, end_effector_frame=end_effector_frame)
        self._model = sdk_kin._model
        self._data = self._model.createData()
        self._fid = sdk_kin._frame_id
        self._q_lower = sdk_kin._q_lower.copy()
        self._q_upper = sdk_kin._q_upper.copy()
        print(f"[kin] nframes={self._model.nframes} fid={self._fid} ee={end_effector_frame}", flush=True)

    def fk(self, q: np.ndarray) -> np.ndarray:
        pin.forwardKinematics(self._model, self._data, q)
        pin.updateFramePlacements(self._model, self._data)
        return self._data.oMf[self._fid].homogeneous.copy()

    def ik(self, target_pose: np.ndarray, init_q: np.ndarray) -> tuple[bool, np.ndarray]:
        target_se3 = pin.SE3(target_pose[:3, :3], target_pose[:3, 3])
        q = np.clip(init_q.copy(), self._q_lower, self._q_upper)
        damping = 1e-6

        for _ in range(200):
            pin.forwardKinematics(self._model, self._data, q)
            pin.updateFramePlacements(self._model, self._data)
            oMf = self._data.oMf[self._fid]
            err_se3 = pin.log6(oMf.actInv(target_se3))
            err = err_se3.vector

            pos_err = np.linalg.norm(err[:3])
            ori_err = np.linalg.norm(err[3:])
            if pos_err <= 1e-4 and ori_err <= 1e-4:
                return True, q

            J = pin.computeFrameJacobian(self._model, self._data, q, self._fid, pin.LOCAL)
            JtJ = J.T @ J + damping * np.eye(self._model.nv)
            dq = np.linalg.solve(JtJ, J.T @ err)
            q = pin.integrate(self._model, q, dq)
            q = np.clip(q, self._q_lower, self._q_upper)

        return False, q

    def compute_lateral_target(
        self, current_q: np.ndarray, dy: float, dx: float = 0.0
    ) -> tuple[bool, np.ndarray]:
        current_pose = self.fk(current_q)
        target_pose = current_pose.copy()
        target_pose[:3, 3] += np.array([dx, dy, 0.0])
        success, q_target = self.ik(target_pose, current_q)
        return success, q_target


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--workspace",
        default=os.environ.get("A1Z_WS", ""),
        help="A1Z workspace dir (or set A1Z_WS)",
    )
    args = parser.parse_args()
    if not args.workspace:
        parser.error("workspace required: --workspace DIR or A1Z_WS env")

    ws = Path(args.workspace).expanduser().resolve()
    sys.path.insert(0, str(SKILL_SCRIPTS))
    sys.path.insert(0, str(ws / "GALAXEA-A1Z"))

    from a1z_mac import EchoFilterBus, open_bus
    import a1z.robots.get_robot as gr

    bus = EchoFilterBus(open_bus())
    gr.can.interface.Bus = lambda **kw: bus

    urdf = str(ws / "GALAXEA-A1Z" / "a1z" / "robot_models" / "a1z" / "A1Z_G1Z.urdf")
    kin = ArmKinematics(urdf, EE_FRAME)

    robot = gr.get_a1z_robot(
        gravity_comp_factor=1.0,
        zero_gravity_mode=False,
        control_freq_hz=250,
        urdf_path=urdf,
        with_gripper=True,
        gripper_max_torque=0.5,
    )

    def graceful_shutdown():
        print("\n[main] shutting down gracefully...", flush=True)
        try:
            if robot.is_running:
                robot.stop()
        except Exception:
            pass
        bus.shutdown()
        print("[main] done.", flush=True)

    def handle_sig(signum, frame):
        graceful_shutdown()
        sys.exit(0)

    signal.signal(signal.SIGINT, handle_sig)
    signal.signal(signal.SIGTERM, handle_sig)

    print("[main] starting control loop...", flush=True)
    robot.start()

    # --- Step 1: move to neutral, open gripper ---
    neutral_rad = np.deg2rad(np.array(NEUTRAL_DEG))
    print(f"\n[step 1/4] Moving to neutral {NEUTRAL_DEG} deg...", flush=True)
    robot.move_joints(neutral_rad, speed=MOVE_SPEED)

    print("[step 1/4] Opening gripper...", flush=True)
    robot.command_gripper(GRIPPER_OPEN)

    print("[step 1/4] Waiting to reach neutral...", flush=True)
    time.sleep(5.0)

    state = robot.get_joint_state()
    try:
        ee_pose = kin.fk(state["pos"])
        print(f"[step 1/4] EE (x,y,z): ({ee_pose[0,3]:.4f}, {ee_pose[1,3]:.4f}, {ee_pose[2,3]:.4f}) m", flush=True)
    except Exception as e:
        print(f"[step 1/4] FK error (skipping pose print): {e}", flush=True)

    input("\n[step 2/4] Place phone and press ENTER to close gripper... ")

    print("[step 2/4] Closing gripper...", flush=True)
    robot.command_gripper(GRIPPER_CLOSE)
    time.sleep(2.0)
    try:
        gripper_pos = robot.get_gripper_pos()
        print(f"[step 2/4] Gripper pos: {gripper_pos:.4f}", flush=True)
    except Exception as e:
        print(f"[step 2/4] Gripper read error: {e}", flush=True)

    input(f"\n[step 3/4] Press ENTER to lateral translate dy={TRANSLATE_Y}m + dx={TRANSLATE_X}m (Cartesian IK)... ")

    def do_lateral(dy: float, dx: float = 0.0) -> bool:
        current_q = robot.get_joint_state()["pos"]
        try:
            success, q_target = kin.compute_lateral_target(current_q, dy, dx)
        except Exception as e:
            print(f"  [IK] compute failed: {e}", flush=True)
            return False
        if not success:
            print(f"  [IK] failed for dy={dy:.3f}m, dx={dx:.3f}m, skipping", flush=True)
            return False
        try:
            ee_before = kin.fk(current_q)
        except Exception:
            ee_before = None
        robot.move_joints(q_target, speed=MOVE_SPEED)
        time.sleep(5.0)
        actual_q = robot.get_joint_state()["pos"]
        try:
            ee_after = kin.fk(actual_q)
            if ee_before is not None:
                print(
                    f"  [IK] EE: ({ee_before[0,3]:.4f}, {ee_before[1,3]:.4f}, {ee_before[2,3]:.4f}) "
                    f"-> ({ee_after[0,3]:.4f}, {ee_after[1,3]:.4f}, {ee_after[2,3]:.4f}) m",
                    flush=True,
                )
            else:
                print(f"  [IK] move complete, EE: ({ee_after[0,3]:.4f}, {ee_after[1,3]:.4f}, {ee_after[2,3]:.4f}) m", flush=True)
        except Exception as e:
            print(f"  [IK] move complete (FK error: {e})", flush=True)
        return True

    print(f"[step 3/4] Translating left Y={TRANSLATE_Y}m +X={TRANSLATE_X}m...", flush=True)
    do_lateral(TRANSLATE_Y, TRANSLATE_X)

    print(f"[step 3/4] Translating right +Y={-TRANSLATE_Y}m...", flush=True)
    do_lateral(-TRANSLATE_Y)

    print(f"[step 3/4] Translating left again Y={TRANSLATE_Y}m +X={TRANSLATE_X}m...", flush=True)
    do_lateral(TRANSLATE_Y, TRANSLATE_X)

    print("[step 3/4] Returning to neutral via joint move...", flush=True)
    robot.move_joints(neutral_rad, speed=MOVE_SPEED)
    time.sleep(4.0)

    input("\n[step 4/4] Press ENTER to open gripper and go home (zero-g)... ")

    print("[step 4/4] Opening gripper...", flush=True)
    robot.command_gripper(GRIPPER_OPEN)
    time.sleep(2.0)

    home_rad = np.deg2rad(np.array(HOME_DEG))
    print(f"[step 4/4] Moving to home...", flush=True)
    robot.move_joints(home_rad, speed=MOVE_SPEED)
    time.sleep(5.0)

    print("[step 4/4] Switching to zero-gravity...", flush=True)
    robot.command_joint_state(
        {"pos": home_rad, "vel": np.zeros(6), "kp": np.zeros(6), "kd": robot._default_kd * 0.5}
    )

    print("[main] done. Arm is in zero-gravity — pick it up!", flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
