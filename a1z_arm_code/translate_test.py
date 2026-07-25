"""A1Z translation test on macOS via gs_usb.

Starts in position-hold at current pose, moves to neutral, then slowly translates
forward/backward by adjusting the shoulder pitch (joint 2), then returns to
[0,0,0,0,0,0] and switches to zero-gravity mode. Ctrl+C exits gracefully.

Usage:
    python translate_test.py --workspace /path/to/workspace
"""

import argparse
import os
import signal
import sys
import time
from pathlib import Path

import numpy as np

SKILL_SCRIPTS = Path(__file__).resolve().parent

NEUTRAL_DEG = [0.0, 34.0, -23.0, -29.0, 0.0, 0.0]
HOME_DEG = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
MOVE_SPEED = 0.3  # rad/s


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
    sdk = ws / "GALAXEA-A1Z"
    if not sdk.is_dir():
        parser.error(f"SDK repo not found at {sdk}")

    sys.path.insert(0, str(SKILL_SCRIPTS))
    sys.path.insert(0, str(sdk))

    from a1z_mac import EchoFilterBus, open_bus
    import a1z.robots.get_robot as gr

    bus = EchoFilterBus(open_bus())
    gr.can.interface.Bus = lambda **kw: bus

    robot = gr.get_a1z_robot(
        gravity_comp_factor=1.0,
        zero_gravity_mode=False,
        control_freq_hz=250,
    )

    running = True
    exiting = False

    def handle_sig(signum, frame):
        nonlocal running, exiting
        if exiting:
            running = False
        else:
            exiting = True

    signal.signal(signal.SIGINT, handle_sig)
    signal.signal(signal.SIGTERM, handle_sig)

    print("[translate] starting control loop...", flush=True)
    robot.start()
    state = robot.get_joint_state()
    print("[translate] initial pos(deg):", np.round(np.degrees(state["pos"]), 2), flush=True)

    # Step 1: move to neutral
    target = np.deg2rad(np.array(NEUTRAL_DEG))
    print(f"[translate] moving to neutral {NEUTRAL_DEG} deg...", flush=True)
    robot.move_joints(target, speed=MOVE_SPEED)

    # Step 2: translate forward/backward by adjusting j2 (shoulder pitch)
    # Positive j2 = arm tip goes forward/up, negative = backward/down
    j2_delta = 15.0  # degrees
    print(f"[translate] translating forward (+j2={j2_delta} deg)...", flush=True)
    forward_pos = target.copy()
    forward_pos[1] = np.deg2rad(NEUTRAL_DEG[1] + j2_delta)
    robot.move_joints(forward_pos, speed=MOVE_SPEED)

    print(f"[translate] translating backward (-j2={j2_delta} deg)...", flush=True)
    robot.move_joints(target, speed=MOVE_SPEED)

    print(f"[translate] translating forward again (+j2={j2_delta} deg)...", flush=True)
    robot.move_joints(forward_pos, speed=MOVE_SPEED)

    print(f"[translate] translating back to neutral...", flush=True)
    robot.move_joints(target, speed=MOVE_SPEED)

    print("[translate] translation test complete. Holding. Ctrl+C to home+zero-g.", flush=True)

    while running and robot.is_running:
        if exiting:
            home = np.deg2rad(np.array(HOME_DEG))
            print(f"[translate] graceful exit: moving to home {HOME_DEG} deg...", flush=True)
            robot.move_joints(home, speed=MOVE_SPEED)
            print("[translate] switching to zero-gravity...", flush=True)
            robot.command_joint_state(
                {"pos": home, "vel": np.zeros(6), "kp": np.zeros(6), "kd": robot._default_kd * 0.5}
            )
            print("[translate] zero-gravity active. Ctrl+C again to fully exit.", flush=True)
            exiting = False
            break

        state = robot.get_joint_state()
        pos_deg = np.degrees(state["pos"])
        print(
            f"  pos(deg): [{', '.join(f'{p:7.2f}' for p in pos_deg)}]",
            flush=True,
        )
        time.sleep(1.0)

    print("[translate] stopping...", flush=True)
    robot.stop()
    bus.shutdown()
    print("[translate] done.", flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
