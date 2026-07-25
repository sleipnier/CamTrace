"""A1Z circle drawing test on macOS via gs_usb.

Holds phone in gripper, draws a circle (~10cm diameter) using Cartesian IK.
Orientation is kept at neutral pitch (URDF gripper frame = -18deg in world).

Interactive sequence:
  1. Move to neutral, open gripper
  2. [Enter] -> close gripper (hold phone)
  3. [Enter] -> draw circle (12 IK waypoints), return to neutral
  4. [Enter] -> open gripper, return to home, zero-gravity

Usage:
    python circle_draw_test.py --workspace /path/to/workspace
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
MOVE_SPEED = 0.5  # rad/s for initial move to neutral/home
GRIPPER_OPEN = 1.0
GRIPPER_CLOSE = 0.0
CIRCLE_RADIUS = 0.05  # meters (5cm = 10cm diameter)
CIRCLE_PLANE = "XY"  # circle in XY plane (horizontal)
NUM_WAYPOINTS = 12  # IK keyframes around the circle
# Smooth streaming: interpolate between keyframes at high frequency
STREAM_HZ = 50  # trajectory streaming rate
STREAM_DURATION_PER_WP = 1.5  # seconds per wayframe (override via --speed)
EE_FRAME = "gripper_finger_rIght_link"  # typo in URDF: "rIght" not "right"


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

        for _ in range(500):
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


def compute_circle_waypoints(
    kin: ArmKinematics,
    neutral_q: np.ndarray,
    radius: float,
    num_points: int,
    plane: str = "XY",
) -> list[tuple[np.ndarray, np.ndarray]]:
    """Compute IK waypoints for a circle.

    Args:
        kin: Kinematics solver
        neutral_q: Neutral joint configuration (starting pose)
        radius: Circle radius in meters
        num_points: Number of waypoints around the circle
        plane: 'XY', 'XZ', or 'YZ' — the plane of the circle

    Returns:
        List of (target_pose_4x4, q_solution) for each waypoint
    """
    neutral_pose = kin.fk(neutral_q)
    R0 = neutral_pose[:3, :3].copy()
    center = neutral_pose[:3, 3].copy()

    waypoints: list[tuple[np.ndarray, np.ndarray]] = []
    prev_q = neutral_q

    for i in range(num_points + 1):
        angle = 2 * np.pi * i / num_points
        if plane == "XY":
            dx = radius * np.cos(angle)
            dy = radius * np.sin(angle)
            dz = 0.0
        elif plane == "XZ":
            dx = radius * np.cos(angle)
            dy = 0.0
            dz = radius * np.sin(angle)
        elif plane == "YZ":
            dx = 0.0
            dy = radius * np.cos(angle)
            dz = radius * np.sin(angle)
        else:
            raise ValueError(f"Unknown plane: {plane}")

        target = np.eye(4)
        target[:3, 3] = center + np.array([dx, dy, dz])
        target[:3, :3] = R0

        ok, q = kin.ik(target, prev_q)
        if not ok:
            # Fall back to solving from neutral
            ok, q = kin.ik(target, neutral_q)

        waypoints.append((target, q))
        prev_q = q

    return waypoints


def quintic_interpolate(q0: np.ndarray, q1: np.ndarray, t: float) -> np.ndarray:
    """Quintic polynomial interpolation (0<=t<=1), zero vel/acc at endpoints."""
    t2 = t * t
    t3 = t2 * t
    t4 = t3 * t
    t5 = t4 * t
    h00 = 6 * t5 - 15 * t4 + 10 * t3
    h10 = t5 - 2 * t4 + t3
    h01 = 1 - h00
    h11 = -t5 + t4
    return h00 * q1 + h10 * (q1 - q0) * 0.5 + h01 * q0 + h11 * (q1 - q0) * 0.5


def stream_trajectory(
    robot,
    waypoints: list[np.ndarray],
    duration_per_wp: float,
    hz: int,
) -> None:
    """Precompute full trajectory at hz, then stream to SDK's 250Hz control loop with precise timing.

    Precomputes all quintic-interpolated joint positions at hz rate, then pushes them
    directly to the SDK's MIT control loop in a tight loop using time.monotonic()
    for microsecond-accurate pacing — matching the 250Hz control loop's natural cadence.
    """
    n = len(waypoints)
    if n < 2:
        return

    steps_per_wp = int(duration_per_wp * hz)
    total_steps = n * steps_per_wp

    # Precompute all interpolated joint positions
    print(f"[stream] precomputing {total_steps} steps at {hz}Hz...", flush=True)
    trajectory: list[np.ndarray] = []
    for step in range(total_steps):
        wp_idx = step // steps_per_wp
        if wp_idx >= n - 1:
            trajectory.append(waypoints[-1].copy())
        else:
            local_t = (step % steps_per_wp) / steps_per_wp
            trajectory.append(quintic_interpolate(waypoints[wp_idx], waypoints[wp_idx + 1], local_t))

    kd = robot._default_kd * 0.5
    kp = robot._default_kp
    interval = 1.0 / hz  # seconds per step

    print(f"[stream] streaming {total_steps} steps at {hz}Hz ({interval*1000:.2f}ms/step)...", flush=True)
    t_start = time.monotonic()
    for step, q_target in enumerate(trajectory):
        robot.command_joint_state(
            {"pos": q_target, "vel": np.zeros(6), "kp": kp, "kd": kd}
        )
        # Spin-lock until exact interval boundary — much tighter than sleep()
        target_t = t_start + (step + 1) * interval
        while time.monotonic() < target_t:
            pass  # busy-wait for microsecond precision

        if step % hz == 0:
            print(f"  [{step}/{total_steps}] {step//hz}s", flush=True)

    print("[stream] done", flush=True)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--workspace",
        default=os.environ.get("A1Z_WS", ""),
        help="A1Z workspace dir (or set A1Z_WS)",
    )
    parser.add_argument(
        "--plane",
        default="XY",
        choices=["XY", "XZ", "YZ"],
        help="Circle plane (default: XY — horizontal circle)",
    )
    parser.add_argument(
        "--radius",
        type=float,
        default=0.05,
        help="Circle radius in meters (default: 0.05 = 10cm diameter)",
    )
    parser.add_argument(
        "--waypoints",
        type=int,
        default=12,
        help="Number of waypoints around the circle (default: 12)",
    )
    parser.add_argument(
        "--speed",
        type=float,
        default=1.5,
        help="Seconds per wayframe (default: 1.5, lower = faster, total = waypoints * speed)",
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
        print(f"[step 1/4] FK error: {e}", flush=True)

    input("\n[step 2/4] Place phone and press ENTER to close gripper... ")

    print("[step 2/4] Closing gripper...", flush=True)
    robot.command_gripper(GRIPPER_CLOSE)
    time.sleep(2.0)
    try:
        gripper_pos = robot.get_gripper_pos()
        print(f"[step 2/4] Gripper pos: {gripper_pos:.4f}", flush=True)
    except Exception as e:
        print(f"[step 2/4] Gripper read error: {e}", flush=True)

    input(
        f"\n[step 3/4] Press ENTER to draw circle "
        f"(r={args.radius}m, plane={args.plane}, {args.waypoints} waypoints, {args.speed}s/wp)... "
    )

    # Pre-compute IK keyframes (joint positions)
    print(f"[step 3/4] Computing {args.waypoints} IK keyframes...", flush=True)
    raw_waypoints = compute_circle_waypoints(
        kin, neutral_rad, args.radius, args.waypoints, args.plane
    )
    # Extract just the joint positions for the streamer
    q_waypoints = [q for (_target, q) in raw_waypoints]

    neutral_pose = kin.fk(neutral_rad)
    R0 = neutral_pose[:3, :3].copy()
    neutral_pitch = np.degrees(np.arctan2(-R0[2, 0], np.sqrt(R0[2, 1] ** 2 + R0[2, 2] ** 2)))
    print(f"[step 3/4] Circle: center=({neutral_pose[0,3]:.4f}, {neutral_pose[1,3]:.4f}, {neutral_pose[2,3]:.4f}) "
          f"r={args.radius}m plane={args.plane}", flush=True)
    print(f"[step 3/4] Gripper pitch (world): {neutral_pitch:.1f} deg", flush=True)

    # Stream the circle with quintic interpolation
    stream_trajectory(robot, q_waypoints, args.speed, STREAM_HZ)

    print("[step 3/4] Circle complete, returning to neutral...", flush=True)
    robot.move_joints(neutral_rad, speed=MOVE_SPEED)
    time.sleep(4.0)

    input("\n[step 4/4] Press ENTER to open gripper and go home (zero-g)... ")

    print("[step 4/4] Opening gripper...", flush=True)
    robot.command_gripper(GRIPPER_OPEN)
    time.sleep(2.0)

    home_rad = np.deg2rad(np.array(HOME_DEG))
    print("[step 4/4] Moving to home...", flush=True)
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
