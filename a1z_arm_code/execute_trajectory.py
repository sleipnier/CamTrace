"""Execute a trajectory JSON on the A1Z arm.

Sequence:
  1. Move to neutral, open gripper
  2. [Enter] -> close gripper
  3. [Enter] -> execute waypoints from JSON (move_joints sequentially), return to neutral
  4. [Enter] -> home [0,0,0,0,0,0], switch to zero-gravity

Usage:
    python execute_trajectory.py -i location/traj.json [--workspace DIR]
    python execute_trajectory.py -i location/traj.json --speed 0.8 --wait 0.0
"""

import argparse
import json
import os
import signal
import sys
import time
from pathlib import Path

import numpy as np

SKILL_SCRIPTS = Path(__file__).resolve().parent

NEUTRAL_DEG = [0.0, 34.0, -23.0, -29.0, 0.0, 0.0]
HOME_DEG = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
NEUTRAL_RAD = np.deg2rad(np.array(NEUTRAL_DEG))
GRIPPER_OPEN = 1.0
GRIPPER_CLOSE = 0.0


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "-i", "--input",
        required=True,
        help="Trajectory JSON from parse_trajectory.py",
    )
    parser.add_argument(
        "--workspace",
        default=os.environ.get("A1Z_WS", ""),
        help="A1Z workspace (or set A1Z_WS)",
    )
    parser.add_argument(
        "--speed",
        type=float,
        default=0.5,
        help="move_joints speed (rad/s, default: 0.5, higher = faster)",
    )
    parser.add_argument(
        "--wait",
        type=float,
        default=0.0,
        help="pause between waypoints in seconds (default: 0.0 = no pause)",
    )
    parser.add_argument(
        "--scale",
        type=float,
        default=1.0,
        help="displacement scale vs neutral (default: 1.0, 2.0 = 2x range, must match JSON generation)",
    )
    parser.add_argument(
        "--auto",
        action="store_true",
        help="Run without waiting for ENTER (for automated pipeline)",
    )
    args = parser.parse_args()

    ws = Path(args.workspace).expanduser().resolve()
    if not ws.exists():
        parser.error(f"workspace not found: {ws}")

    traj_path = Path(args.input)
    if not traj_path.exists():
        traj_path = SKILL_SCRIPTS.parent / args.input
    if not traj_path.exists():
        parser.error(f"trajectory not found: {args.input}")

    with open(traj_path) as f:
        traj = json.load(f)

    waypoints = traj["waypoints"]
    traj_scale = traj.get("displacement_scale", 1.0)
    print(f"[main] loaded {len(waypoints)} waypoints from {traj_path.name}")
    print(f"[main] JSON scale={traj_scale}  --scale={args.scale}  --speed={args.speed}  --wait={args.wait}s")
    if abs(args.scale - traj_scale) > 0.01:
        print(f"[main] WARN: --scale differs from JSON generation scale ({traj_scale})")

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

    print(f"\n[step 1/4] Moving to neutral {NEUTRAL_DEG} deg...", flush=True)
    robot.move_joints(NEUTRAL_RAD, speed=args.speed)
    print("[step 1/4] Opening gripper...", flush=True)
    robot.command_gripper(GRIPPER_OPEN)
    time.sleep(5.0)
    state = robot.get_joint_state()
    print(f"[step 1/4] pos(deg): {np.round(np.degrees(state['pos']), 2)}", flush=True)

    if not args.auto:
        input("\n[step 2/4] Place phone and press ENTER to close gripper... ")
    else:
        print("[step 2/4] AUTO: closing gripper immediately...", flush=True)
    print("[step 2/4] Closing gripper...", flush=True)
    robot.command_gripper(GRIPPER_CLOSE)
    time.sleep(2.0)
    try:
        print(f"[step 2/4] Gripper pos: {robot.get_gripper_pos():.4f}", flush=True)
    except Exception as e:
        print(f"[step 2/4] Gripper read error: {e}", flush=True)

    if not args.auto:
        input(f"\n[step 3/4] Press ENTER to execute {len(waypoints)} waypoints... ")

    print(f"[step 3/4] Starting trajectory (scale={args.scale}, speed={args.speed}, wait={args.wait}s)...", flush=True)
    t_start = time.monotonic()

    for i, wp in enumerate(waypoints):
        target_deg = np.array(wp["joint_deg"])
        scaled_deg = NEUTRAL_DEG + (target_deg - NEUTRAL_DEG) * args.scale
        joints_rad = np.deg2rad(scaled_deg)

        robot.move_joints(joints_rad, speed=args.speed)
        if args.wait > 0:
            time.sleep(args.wait)

        elapsed = time.monotonic() - t_start
        base_xyz = wp.get("base_xyz", [])
        t_s = wp.get("time_from_start_s", 0)
        if (i + 1) % 10 == 0 or i == 0:
            print(f"  [{i+1}/{len(waypoints)}] t={elapsed:.1f}s (src_t={t_s:.2f}s) "
                  f"base=({','.join(f'{v:.3f}' for v in base_xyz[:3])})", flush=True)

    total_time = time.monotonic() - t_start
    print(f"[step 3/4] Trajectory complete in {total_time:.1f}s", flush=True)

    print("[step 3/4] Returning to neutral...", flush=True)
    robot.move_joints(NEUTRAL_RAD, speed=args.speed)
    time.sleep(3.0)

    if not args.auto:
        input("\n[step 4/4] Press ENTER to home and switch to zero-gravity... ")

    print("[step 4/4] Opening gripper...", flush=True)
    robot.command_gripper(GRIPPER_OPEN)
    time.sleep(1.0)

    home_rad = np.deg2rad(np.array(HOME_DEG))
    print(f"[step 4/4] Moving to home {HOME_DEG}...", flush=True)
    robot.move_joints(home_rad, speed=args.speed)
    time.sleep(3.0)

    print("[step 4/4] Switching to zero-gravity (arm can be picked up)...", flush=True)
    robot.command_joint_state(
        {"pos": home_rad, "vel": np.zeros(6), "kp": np.zeros(6), "kd": robot._default_kd * 0.5}
    )

    print("[main] done. Arm is in zero-gravity.", flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
