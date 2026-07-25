"""A1Z smooth waypoint sequence on macOS via gs_usb.

Demonstrates smooth motion by calling move_joints sequentially for multiple
nearby waypoints — each move_joints uses 5th-order minimum-jerk interpolation
at 250Hz inside the SDK's control loop, so motion is perfectly smooth and the
80Hz frequency watchdog is never triggered.

Sequence:
  1. Move to neutral, open gripper
  2. [Enter] -> close gripper
  3. [Enter] -> smooth loop through 3 waypoints near neutral, return to neutral
  4. [Enter] -> home [0,0,0,0,0,0], switch to zero-gravity

Usage:
    python waypoint_test.py --workspace /path/to/workspace
"""

import argparse
import os
import signal
import sys
import time
from pathlib import Path

import numpy as np

SKILL_SCRIPTS = Path(__file__).resolve().parent

# Neutral pose (holding phone upright)
NEUTRAL_DEG = [0.0, 34.0, -23.0, -29.0, 0.0, 0.0]
HOME_DEG = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
MOVE_SPEED = 0.5  # rad/s for move_joints
GRIPPER_OPEN = 1.0
GRIPPER_CLOSE = 0.0

# Three waypoints near neutral — small joint offsets for smooth demo motion
# Each is a tiny offset from neutral so the arm stays in a safe workspace
_WP1 = np.deg2rad(np.array([2.0, 38.0, -20.0, -25.0, 0.0, 0.0]))   # slight right + elbow up
_WP2 = np.deg2rad(np.array([-2.0, 42.0, -18.0, -22.0, 0.0, 0.0]))  # slight left + more elbow up
_WP3 = np.deg2rad(np.array([1.0, 36.0, -21.0, -27.0, 0.0, 0.0]))   # back toward neutral


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
    time.sleep(5.0)

    state = robot.get_joint_state()
    print(f"[step 1/4] pos(deg): {np.round(np.degrees(state['pos']), 2)}", flush=True)

    # --- Step 2: close gripper ---
    input("\n[step 2/4] Place phone and press ENTER to close gripper... ")
    print("[step 2/4] Closing gripper...", flush=True)
    robot.command_gripper(GRIPPER_CLOSE)
    time.sleep(2.0)
    try:
        gripper_pos = robot.get_gripper_pos()
        print(f"[step 2/4] Gripper pos: {gripper_pos:.4f}", flush=True)
    except Exception as e:
        print(f"[step 2/4] Gripper read error: {e}", flush=True)

    # --- Step 3: smooth waypoint loop ---
    input("\n[step 3/4] Press ENTER to start smooth waypoint loop... ")

    waypoints = [neutral_rad, _WP1, _WP2, _WP3, neutral_rad]
    wp_names = ["neutral", "WP1", "WP2", "WP3", "neutral"]
    print(f"[step 3/4] Executing {len(waypoints)-1} smooth transitions...", flush=True)

    for i in range(1, len(waypoints)):
        from_deg = np.round(np.degrees(waypoints[i - 1]), 1)
        to_deg = np.round(np.degrees(waypoints[i]), 1)
        print(f"  -> {wp_names[i]} (from {from_deg} to {to_deg})", flush=True)
        robot.move_joints(waypoints[i], speed=MOVE_SPEED)
        # Small pause between moves so the loop breathes; move_joints is blocking
        # so the arm has fully reached each waypoint before we proceed
        time.sleep(0.1)

    print("[step 3/4] Loop complete, at neutral.", flush=True)

    # --- Step 4: return home and zero-gravity ---
    input("\n[step 4/4] Press ENTER to return home and switch to zero-gravity... ")

    home_rad = np.deg2rad(np.array(HOME_DEG))
    print("[step 4/4] Opening gripper...", flush=True)
    robot.command_gripper(GRIPPER_OPEN)
    time.sleep(1.0)

    print(f"[step 4/4] Moving to home {HOME_DEG} deg...", flush=True)
    robot.move_joints(home_rad, speed=MOVE_SPEED)
    time.sleep(4.0)

    print("[step 4/4] Switching to zero-gravity (arm can be picked up)...", flush=True)
    robot.command_joint_state(
        {"pos": home_rad, "vel": np.zeros(6), "kp": np.zeros(6), "kd": robot._default_kd * 0.5}
    )

    print("[main] done. Arm is in zero-gravity.", flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
