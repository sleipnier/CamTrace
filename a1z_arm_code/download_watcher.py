"""Watch ~/Downloads/camera_cartesian_trajectory.json for changes.

When the file is updated (download button clicked), runs:
  1. parse_trajectory.py   → generates arm waypoints JSON
  2. execute_trajectory.py → executes on the arm, then exits

Usage:
    python download_watcher.py [--workspace DIR] [--speed 0.5] [--scale 0.5] [--wait 0.05] [--auto]
    # Ctrl+C to stop watching (won't trigger execution)
    # --auto skips ENTER waits in execute_trajectory.py
"""

import argparse
import os
import signal
import subprocess
import sys
import time
from pathlib import Path

SKILL_SCRIPTS = Path(__file__).resolve().parent
DEFAULT_DOWNLOADS = Path.home() / "Downloads"
DEFAULT_TRAJ_FILE = "camera_cartesian_trajectory.json"


def main():
    parser = argparse.ArgumentParser(description="Watch Downloads for trajectory JSON, run arm pipeline")
    parser.add_argument("--workspace", default="", help="A1Z workspace (or set A1Z_WS)")
    parser.add_argument("--speed", type=float, default=0.5,
                        help="execute_trajectory move speed rad/s (default: 0.5)")
    parser.add_argument("--scale", type=float, default=0.5,
                        help="Displacement scale passed to both parse and execute (default: 0.5)")
    parser.add_argument("--interval", "-n", type=int, default=8,
                        help="Sample every N frames in parse (default: 8)")
    parser.add_argument("--wait", type=float, default=0.05,
                        help="Pause between waypoints in seconds (default: 0.05)")
    parser.add_argument("--auto", action="store_true",
                        help="Skip ENTER waits in execute_trajectory.py")
    args = parser.parse_args()

    ws = Path(args.workspace or os.environ.get("A1Z_WS", "")).expanduser().resolve()
    if not ws.exists():
        parser.error(f"workspace not found: {ws}")

    traj_path = DEFAULT_DOWNLOADS / DEFAULT_TRAJ_FILE
    print(f"[watcher] workspace: {ws}", flush=True)
    print(f"[watcher] watching: {traj_path}", flush=True)
    print(f"[watcher] scale={args.scale} speed={args.speed} interval={args.interval} wait={args.wait} auto={args.auto}", flush=True)
    print("[watcher] Waiting for download button click... (Ctrl+C to abort)", flush=True)

    last_mtime = 0.0
    if traj_path.exists():
        last_mtime = traj_path.stat().st_mtime

    triggered = False
    stop_flag = False

    def abort(signum, frame):
        nonlocal stop_flag
        print("\n[watcher] aborted.", flush=True)
        stop_flag = True

    signal.signal(signal.SIGINT, abort)
    signal.signal(signal.SIGTERM, abort)

    while not stop_flag:
        time.sleep(0.5)
        if not traj_path.exists():
            continue
        mtime = traj_path.stat().st_mtime
        if mtime == last_mtime:
            continue
        last_mtime = mtime

        if triggered:
            print("[watcher] already triggered, ignoring change", flush=True)
            continue
        triggered = True

        print(f"\n[watcher] detected change: {traj_path}", flush=True)

        # Give the file a moment to finish writing
        time.sleep(2.0)
        if stop_flag:
            break

        # Step 1: parse trajectory
        out_path = ws / "location" / "traj.json"
        out_path.parent.mkdir(parents=True, exist_ok=True)

        print(f"[watcher] parsing {traj_path}...", flush=True)
        ret1 = subprocess.run(
            [sys.executable, str(SKILL_SCRIPTS / "parse_trajectory.py"),
             "-i", str(traj_path),
             "-o", str(out_path),
             "-s", str(args.scale),
             "-n", str(args.interval)],
            capture_output=True, text=True,
        )
        if ret1.returncode != 0:
            print(f"[watcher] parse failed:\n{ret1.stderr[-1000:]}", flush=True)
            break
        print(f"[watcher] parse done: {out_path}", flush=True)

        # Step 2: execute_trajectory.py
        print("[watcher] starting execute_trajectory.py...", flush=True)
        exec_cmd = [
            sys.executable, str(SKILL_SCRIPTS / "execute_trajectory.py"),
            "-i", str(out_path),
            "--workspace", str(ws),
            "--speed", str(args.speed),
            "--wait", str(args.wait),
            "--scale", str(args.scale),
        ]
        if args.auto:
            exec_cmd.append("--auto")
        ret2 = subprocess.run(exec_cmd, capture_output=True, text=True)
        if ret2.returncode != 0:
            print(f"[watcher] execute failed:\n{ret2.stderr[-1000:]}", flush=True)
            break
        print("[watcher] execute done.", flush=True)
        break

    print("[watcher] stopped.", flush=True)


if __name__ == "__main__":
    main()
