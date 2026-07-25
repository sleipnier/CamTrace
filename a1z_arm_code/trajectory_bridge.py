"""Bridge: receives POST from GPU server, downloads JSON, runs arm trajectory.

Runs a lightweight HTTP server on the Mac. When the GPU server's web page POSTs
to it (triggered by the JSON download button), this script:
  1. Downloads the JSON from the specified URL
  2. Saves it to the trajectory folder
  3. Runs execute_trajectory.py

Architecture:
    GPU server web page
        ↓ POST /download?url=...&trajectory=...
    Mac:8888 (this script)
        ↓ fetch JSON
        ↓ save to location/
        ↓ call execute_trajectory.py

Usage:
    python trajectory_bridge.py --port 8888 --workspace ~/a1z_ws
"""

import argparse
import json
import os
import queue
import signal
import subprocess
import sys
import threading
import time
import urllib.request
from http.server import HTTPServer, BaseHTTPRequestHandler
from pathlib import Path
from typing import Optional

SKILL_SCRIPTS = Path(__file__).resolve().parent
DEFAULT_PORT = 8888
TRAJECTORY_DIR = "location"


class BridgeState:
    def __init__(self):
        self.last_status = "idle"
        self.last_result = ""
        self.is_running = False
        self.lock = threading.Lock()


state = BridgeState()
# Queue: (url, trajectory_name) items to process
task_queue: queue.Queue[tuple[str, str]] = queue.Queue()


def run_trajectory(json_path: Path, workspace: Path, speed: float, scale: float, wait: float) -> str:
    """Execute trajectory via execute_trajectory.py in a subprocess."""
    cmd = [
        sys.executable,
        str(SKILL_SCRIPTS / "execute_trajectory.py"),
        "-i", str(json_path),
        "--workspace", str(workspace),
        "--speed", str(speed),
        "--wait", str(wait),
    ]
    # Strip --scale if 1.0 to avoid mismatch warning
    if abs(scale - 1.0) > 0.01:
        cmd.extend(["--scale", str(scale)])

    print(f"[bridge] executing: {' '.join(cmd)}", flush=True)
    try:
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=300,  # 5 min max
        )
        if result.returncode == 0:
            return f"OK: trajectory completed\n{result.stdout}"
        else:
            return f"ERROR (exit {result.returncode}):\n{result.stderr[-500:]}"
    except subprocess.TimeoutExpired:
        return "ERROR: trajectory timed out after 300s"
    except Exception as e:
        return f"ERROR: {e}"


def worker(workspace: Path, speed: float, scale: float, wait: float):
    """Background thread: process queue and run trajectories."""
    trajectory_dir = workspace / TRAJECTORY_DIR
    trajectory_dir.mkdir(parents=True, exist_ok=True)

    while True:
        try:
            url, trajectory_name = task_queue.get(timeout=1.0)
        except queue.Empty:
            continue

        with state.lock:
            state.is_running = True
            state.last_status = f"downloading {trajectory_name}..."
            state.last_result = ""

        # Download JSON
        json_path = trajectory_dir / f"{trajectory_name}.json"
        try:
            print(f"[bridge] downloading {url} -> {json_path}", flush=True)
            req = urllib.request.Request(url, headers={"User-Agent": "A1Z-Bridge/1.0"})
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = resp.read()
            with open(json_path, "wb") as f:
                f.write(data)
        except Exception as e:
            with state.lock:
                state.last_status = "error"
                state.last_result = f"Download failed: {e}"
                state.is_running = False
            task_queue.task_done()
            continue

        # Save raw JSON for inspection
        with open(json_path) as f:
            content = json.load(f)
        num_wp = len(content.get("waypoints", []))
        print(f"[bridge] saved {json_path} ({num_wp} waypoints)", flush=True)

        # Run trajectory
        with state.lock:
            state.last_status = f"running {trajectory_name} ({num_wp} waypoints)..."

        result = run_trajectory(json_path, workspace, speed, scale, wait)

        with state.lock:
            state.last_status = "idle"
            state.last_result = result
            state.is_running = False

        print(f"[bridge] result: {result[:200]}", flush=True)
        task_queue.task_done()


class BridgeHandler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        print(f"[bridge] {args[0]}", flush=True)

    def do_GET(self):
        """Status page."""
        if self.path == "/" or self.path == "/status":
            with state.lock:
                status = state.last_status
                result = state.last_result
                running = state.is_running

            html = f"""<!DOCTYPE html>
<html><head><title>A1Z Trajectory Bridge</title></head>
<body>
<h1>A1Z Trajectory Bridge</h1>
<p><b>Status:</b> {status}</p>
<p><b>Running:</b> {running}</p>
<pre>{result}</pre>
<hr>
<p>Send POST to /download with JSON body: <code>{{"url": "...", "trajectory": "name"}}</code></p>
</body></html>"""
            self.send_response(200)
            self.send_header("Content-Type", "text/html")
            self.end_headers()
            self.wfile.write(html.encode())
            return

        self.send_response(404)
        self.end_headers()
        self.wfile.write(b"Not Found")

    def do_POST(self):
        """Download JSON and run trajectory."""
        if self.path != "/download":
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"POST /download only")
            return

        try:
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length)
            payload = json.loads(body)
        except Exception as e:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(f"Bad request: {e}".encode())
            return

        url = payload.get("url", "")
        trajectory_name = payload.get("trajectory", "traj")

        if not url:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(b'"url" field required')
            return

        # Accept task
        with state.lock:
            state.last_status = f"queued: {trajectory_name}"
            state.last_result = ""

        task_queue.put((url, trajectory_name))

        self.send_response(202)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        resp = {"status": "queued", "trajectory": trajectory_name, "url": url}
        self.wfile.write(json.dumps(resp).encode())


def main():
    parser = argparse.ArgumentParser(description="A1Z trajectory bridge server")
    parser.add_argument("--port", type=int, default=DEFAULT_PORT,
                        help=f"HTTP server port (default: {DEFAULT_PORT})")
    parser.add_argument("--workspace", default="",
                        help="A1Z workspace (or set A1Z_WS)")
    parser.add_argument("--speed", type=float, default=0.5,
                        help="Trajectory speed rad/s (default: 0.5)")
    parser.add_argument("--scale", type=float, default=1.0,
                        help="Displacement scale (default: 1.0)")
    parser.add_argument("--wait", type=float, default=0.0,
                        help="Pause between waypoints (default: 0.0)")
    args = parser.parse_args()

    ws = Path(args.workspace or os.environ.get("A1Z_WS", "")).expanduser().resolve()
    if not ws.exists():
        parser.error(f"workspace not found: {ws}")

    print(f"[bridge] workspace: {ws}", flush=True)
    print(f"[bridge] port: {args.port}", flush=True)
    print(f"[bridge] speed={args.speed} scale={args.scale} wait={args.wait}", flush=True)

    # Start worker thread
    t = threading.Thread(target=worker, args=(ws, args.speed, args.scale, args.wait), daemon=True)
    t.start()

    # Start HTTP server
    server = HTTPServer(("0.0.0.0", args.port), BridgeHandler)
    print(f"[bridge] listening on http://0.0.0.0:{args.port}/", flush=True)
    print("[bridge] GPU server should POST to: http://localhost:" + str(args.port) + "/download", flush=True)
    print("[bridge] or: http://YOUR_MAC_IP:" + str(args.port) + "/download", flush=True)
    print("[bridge] Ctrl+C to stop", flush=True)

    def shutdown(signum, frame):
        print("\n[bridge] shutting down...", flush=True)
        server.shutdown()
        sys.exit(0)

    signal.signal(signal.SIGINT, shutdown)
    signal.signal(signal.SIGTERM, shutdown)

    server.serve_forever()


if __name__ == "__main__":
    main()
