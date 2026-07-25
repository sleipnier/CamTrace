"""A1Z position hold on macOS via gs_usb.

Starts in position-hold (PD + gravity comp) at current pose, moves slowly to a
neutral pose, then holds. Ctrl+C / SIGTERM gracefully moves to [0,0,0,0,0,0]
then switches to zero-gravity (gravity comp only, kp=0) — arm can be picked up.
Press Ctrl+C again to fully exit (motors disabled, arm goes limp).

Usage:
    A1Z_WS=/path/to/workspace python hold_neutral.py
    python hold_neutral.py --workspace /path/to/workspace
"""

import argparse
import os
import signal
import sys
import time
from pathlib import Path

import numpy as np

SKILL_SCRIPTS = Path(__file__).resolve().parent

# Within joint limits: j3 range is [-180, 0] deg, so bend negative
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
    gr.can.interface.Bus = lambda **kw: bus  # get_a1z_robot hardcodes socketcan

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

    print("[hold] starting control loop (position hold at current pose)...", flush=True)
    robot.start()
    state = robot.get_joint_state()
    print("[hold] running. pos(deg):", np.round(np.degrees(state["pos"]), 2), flush=True)

    target = np.deg2rad(np.array(NEUTRAL_DEG))
    print(f"[hold] moving to neutral {NEUTRAL_DEG} deg at {MOVE_SPEED} rad/s...", flush=True)
    robot.move_joints(target, speed=MOVE_SPEED)
    print("[hold] target reached, holding. Ctrl+C to stop (graceful exit: home then zero-g).", flush=True)

    while running and robot.is_running:
        if exiting:
            # Graceful exit: move to home then switch to zero-gravity
            home = np.deg2rad(np.array(HOME_DEG))
            print(f"[hold] graceful exit: moving to home {HOME_DEG} deg at {MOVE_SPEED} rad/s...", flush=True)
            robot.move_joints(home, speed=MOVE_SPEED)
            print("[hold] at home, switching to zero-gravity (arm can be picked up)...", flush=True)
            robot.command_joint_state(
                {"pos": home, "vel": np.zeros(6), "kp": np.zeros(6), "kd": robot._default_kd * 0.5}
            )
            print("[hold] zero-gravity active. Ctrl+C again to fully exit, or pick up the arm.", flush=True)
            exiting = False
            break

        state = robot.get_joint_state()
        pos_deg = np.degrees(state["pos"])
        eff = state["eff"]
        print(
            f"  pos(deg): [{', '.join(f'{p:7.2f}' for p in pos_deg)}]  "
            f"eff(Nm): [{', '.join(f'{e:6.2f}' for e in eff)}]",
            flush=True,
        )
        time.sleep(1.0)

    print("[hold] stopping (motors disabling)...", flush=True)
    robot.stop()
    bus.shutdown()
    print("[hold] done.", flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
