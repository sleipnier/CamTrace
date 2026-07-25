"""A1Z + YOLOv8 person tracking demo.

Workflow:
  1. Open gripper, move to neutral — verify camera + detection
  2. [ENTER] → close gripper, phone clamped
  3. [ENTER] → start person tracking (arm follows detected person)
  4. [ENTER] → return to hold_neutral
  5. [ENTER] → open gripper, move to home, zero-gravity
  6. Target lost > Ns → hold neutral, auto-reacquire when visible

Usage:
    python person_tracker.py --workspace ~/a1z_ws --device 0 --preview
"""

import argparse
import os
import signal
import sys
import threading
import time
from pathlib import Path

import cv2
import numpy as np

# --- Args ---
parser = argparse.ArgumentParser(description="A1Z person tracking with YOLOv8")
parser.add_argument("--workspace", default="", help="A1Z workspace (or set A1Z_WS)")
parser.add_argument("--device", type=int, default=1, help="Camera device index (default: 1)")
parser.add_argument("--model", default="yolov8n.pt", help="YOLOv8 model (default: yolov8n.pt)")
parser.add_argument("--conf", type=float, default=0.5, help="YOLO confidence (default: 0.5)")
parser.add_argument("--hz", type=float, default=15.0, help="Arm update frequency Hz (default: 15)")
parser.add_argument("--gain-x", type=float, default=1.0,
                    help="Screen X offset -> j1 gain in radians (default: 1.0)")
parser.add_argument("--gain-y", type=float, default=0.5,
                    help="Screen Y offset -> j2/j3 delta in radians (default: 0.5)")
parser.add_argument("--reacquire-time", type=float, default=3.0,
                    help="Seconds without target before reacquire (default: 3.0)")
parser.add_argument("--preview", action="store_true", help="Show camera preview window")
args = parser.parse_args()

if not args.workspace:
    args.workspace = os.environ.get("A1Z_WS", "")
ws = Path(args.workspace).expanduser().resolve()
if not ws.exists():
    print(f"ERROR: workspace not found: {ws}", flush=True)
    sys.exit(1)

NEUTRAL_DEG = [0.0, 34.0, -23.0, -29.0, 0.0, 0.0]
HOME_DEG = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
NEUTRAL_RAD = np.deg2rad(np.array(NEUTRAL_DEG))
HOME_RAD = np.deg2rad(np.array(HOME_DEG))
GRIPPER_OPEN = 1.0
GRIPPER_CLOSE = 0.0


# --- Shared state ---
# tracked_*: the currently-followed target (largest person, persistent)
# all_annotated: frame with ALL person boxes drawn (tracked=bright, others=grey)
class State:
    def __init__(self):
        self.lock = threading.Lock()
        self.running = True
        self.frame = None
        self.annotated = None    # legacy, not used
        self.tracked_ox = 0.0    # offset of tracked target
        self.tracked_oy = 0.0
        self.tracked_conf = 0.0
        self.tracked_detected = False
        self.all_annotated = None  # frame with all boxes drawn
        self.detect_fps = 0.0

state = State()

# --- Keyboard monitor ---
_enter_event = threading.Event()
_kb_running = True

def _keyboard_thread():
    import select as _sel
    while _kb_running:
        try:
            r, _, _ = _sel.select([sys.stdin], [], [], 0.1)
            if r:
                sys.stdin.readline()
                _enter_event.set()
        except Exception:
            break


# --- YOLO detection thread ---
def detection_thread(cap, model):
    from collections import deque
    fps_buf = deque(maxlen=30)
    last_t = time.monotonic()
    PERSON_ID = 0

    while state.running:
        ret, frame = cap.read()
        if not ret:
            time.sleep(0.1)
            continue

        with state.lock:
            state.frame = frame.copy()

        try:
            results = model(frame, verbose=False, conf=args.conf)
        except Exception:
            continue
        r = results[0]

        persons = []   # list of (area, ox, oy, conf, x1, y1, x2, y2)
        anno = frame.copy()

        if r.boxes is not None and len(r.boxes) > 0:
            h, w = frame.shape[:2]
            for box in r.boxes:
                if int(box.cls[0]) == PERSON_ID:
                    x1, y1, x2, y2 = box.xyxy[0].cpu().numpy()
                    area = (x2 - x1) * (y2 - y1)
                    cx, cy = (x1 + x2) / 2, (y1 + y2) / 2
                    conf = float(box.conf[0])
                    ox, oy = (cx / w) * 2 - 1, (cy / h) * 2 - 1
                    persons.append((area, ox, oy, conf, x1, y1, x2, y2))

        # Pick largest person by bounding box area
        tracked_ox = 0.0
        tracked_oy = 0.0
        tracked_conf = 0.0
        found = False
        if persons:
            persons.sort(key=lambda p: p[0], reverse=True)  # largest first
            area, tracked_ox, tracked_oy, tracked_conf, x1, y1, x2, y2 = persons[0]
            found = True
            # Draw tracked target: bright cyan
            cv2.rectangle(anno, (int(x1), int(y1)), (int(x2), int(y2)),
                          (0, 255, 255), 3)
            label = f"TRACKED area={int(area)} conf={tracked_conf:.2f}"
            (lw, lh), _ = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.6, 2)
            cv2.rectangle(anno, (int(x1), int(y1) - lh - 10),
                          (int(x1) + lw, int(y1)), (0, 255, 255), -1)
            cv2.putText(anno, label, (int(x1), int(y1) - 6),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 0), 2)
            # Draw other persons: grey
            for area2, ox2, oy2, conf2, x1b, y1b, x2b, y2b in persons[1:]:
                cv2.rectangle(anno, (int(x1b), int(y1b)), (int(x2b), int(y2b)),
                              (120, 120, 120), 1)
                cv2.putText(anno, f"person {conf2:.2f}", (int(x1b), int(y1b) - 4),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (120, 120, 120), 1)

        with state.lock:
            state.tracked_ox = tracked_ox
            state.tracked_oy = tracked_oy
            state.tracked_conf = tracked_conf
            state.tracked_detected = found
            state.all_annotated = anno

        now = time.monotonic()
        fps_buf.append(1.0 / max(now - last_t, 1e-6))
        last_t = now
        with state.lock:
            state.detect_fps = sum(fps_buf) / len(fps_buf)


class LPF:
    def __init__(self, alpha=0.08):
        self.val = None
        self.alpha = alpha

    def update(self, new):
        if self.val is None:
            self.val = new
        else:
            self.val = self.alpha * new + (1 - self.alpha) * self.val
        return self.val


def _render_overlay(frame, fw, fh, detected, conf, fps_d, ox, oy):
    if frame is None:
        return frame
    cv2.rectangle(frame, (0, 0), (fw, 45), (0, 0, 0), -1)
    cv2.putText(frame, f"person_tracker  {fw}x{fh}  fps={fps_d:.0f}",
                (8, 28), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (180, 180, 180), 1)
    color = (0, 255, 0) if detected else (0, 100, 255)
    label = (f"TRACKING  ox={ox:+.2f} oy={oy:+.2f} conf={conf:.2f}"
             if detected else "SEARCHING  (no person)")
    cv2.putText(frame, label, (8, fh - 20),
                cv2.FONT_HERSHEY_SIMPLEX, 0.55, color, 1)
    cx, cy = fw // 2, fh // 2
    cv2.line(frame, (cx - 25, cy), (cx + 25, cy), (80, 80, 80), 1)
    cv2.line(frame, (cx, cy - 25), (cx, cy + 25), (80, 80, 80), 1)
    cv2.circle(frame, (cx, cy), 4, (80, 80, 80), 1)
    if detected and abs(ox) > 0.05:
        dx = int(ox * 60)
        dy = int(oy * 30)
        cv2.arrowedLine(frame, (cx, cy), (cx + dx, cy + dy),
                        (0, 255, 0), 2, tipLength=0.4)
    return frame


def main() -> int:
    global _kb_running

    sys.path.insert(0, str(ws))
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
        print("\n[tracker] shutting down...", flush=True)
        global _kb_running
        _kb_running = False
        _enter_event.set()
        with state.lock:
            state.running = False
        kb_t.join(timeout=1.0)
        det_t.join(timeout=2.0)
        if args.preview:
            cv2.destroyAllWindows()
        try:
            if robot.is_running:
                robot.stop()
        except Exception:
            pass
        bus.shutdown()
        print("[tracker] done.", flush=True)

    def handle_sig(signum, frame):
        graceful_shutdown()
        sys.exit(0)

    signal.signal(signal.SIGINT, handle_sig)
    signal.signal(signal.SIGTERM, handle_sig)

    # --- Keyboard + camera before arm starts ---
    kb_t = threading.Thread(target=_keyboard_thread, daemon=True)
    kb_t.start()

    print("[tracker] loading YOLOv8...", flush=True)
    from ultralytics import YOLO
    model = YOLO(args.model)
    print(f"[tracker] model loaded ({len(model.names)} classes).", flush=True)

    cap = cv2.VideoCapture(args.device)
    if not cap.isOpened():
        print(f"ERROR: cannot open camera device {args.device}", flush=True)
        return 1
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)
    cap.set(cv2.CAP_PROP_FPS, 30)
    fw = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    fh = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    print(f"[tracker] camera: {fw}x{fh} @ {int(cap.get(cv2.CAP_PROP_FPS))}fps", flush=True)

    print("[tracker] starting control loop...", flush=True)
    robot.start()

    # Open gripper immediately (arm is now powered)
    print("[tracker] opening gripper...", flush=True)
    robot.command_gripper(GRIPPER_OPEN)

    det_t = threading.Thread(target=detection_thread, args=(cap, model), daemon=True)
    det_t.start()

    # ============================================================
    # STEP 1: Move to neutral, show preview
    # ============================================================
    print(f"\n{'='*50}", flush=True)
    print(f"[step 1/5] Moving to neutral {NEUTRAL_DEG}...", flush=True)
    print(f"[step 1/5] Camera preview active — verify detection", flush=True)
    print(f"[step 1/5] Press ENTER when ready to clamp phone", flush=True)
    print(f"{'='*50}", flush=True)

    robot.move_joints(NEUTRAL_RAD, speed=0.3)
    time.sleep(5.5)

    st = robot.get_joint_state()
    print(f"[step 1/5] pos(deg): {np.round(np.degrees(st['pos']), 2)}", flush=True)

    _enter_event.clear()
    while not _enter_event.is_set() and state.running:
        with state.lock:
            ox = state.tracked_ox
            oy = state.tracked_oy
            detected = state.tracked_detected
            conf = state.tracked_conf
            fps_d = state.detect_fps
            anno = state.all_annotated

        if args.preview and anno is not None:
            hud = _render_overlay(anno.copy(), fw, fh, detected, conf, fps_d, ox, oy)
            cv2.imshow("Person Tracker  [Q=quit]", hud)
            key = cv2.waitKey(1) & 0xFF
            if key == ord("q") or key == 27:
                print("[step 1/5] Q pressed, quitting.", flush=True)
                graceful_shutdown()
                return 0
        time.sleep(0.05)

    _enter_event.clear()
    if args.preview:
        cv2.destroyAllWindows()

    # ============================================================
    # STEP 2: Close gripper (phone clamped)
    # ============================================================
    print(f"\n{'='*50}", flush=True)
    print(f"[step 2/5] Closing gripper (phone clamped)...", flush=True)
    print(f"{'='*50}", flush=True)
    robot.command_gripper(GRIPPER_CLOSE)
    time.sleep(2.0)
    try:
        gp = robot.get_gripper_pos()
        print(f"[step 2/5] Gripper pos: {gp:.4f}", flush=True)
    except Exception as e:
        print(f"[step 2/5] Gripper read error: {e}", flush=True)

    # ============================================================
    # STEP 3: Person tracking
    # ============================================================
    print(f"\n{'='*50}", flush=True)
    print(f"[step 3/5] Press ENTER to start person tracking", flush=True)
    print(f"[step 3/5] gain_x={args.gain_x} gain_y={args.gain_y} hz={args.hz}", flush=True)
    print(f"[step 3/5] No target > {args.reacquire_time:.0f}s -> hold neutral", flush=True)
    print(f"[step 3/5] Press ENTER again -> return to neutral", flush=True)
    print(f"{'='*50}", flush=True)

    _enter_event.clear()
    while not _enter_event.is_set() and state.running:
        time.sleep(0.05)
    _enter_event.clear()

    print(f"[step 3/5] Tracking started (hz={args.hz}).", flush=True)

    lpf_x = LPF(alpha=0.15)
    lpf_y = LPF(alpha=0.15)
    target_lost_at = None
    interval = 1.0 / args.hz
    last_print = 0
    last_preview = 0
    preview_interval = 1.0 / 30.0

    tracking_active = True
    while tracking_active and state.running:
        t_start = time.monotonic()

        if _enter_event.is_set():
            _enter_event.clear()
            print("[step 3/5] ENTER pressed, exiting tracking.", flush=True)
            tracking_active = False
            break

        with state.lock:
            ox = state.tracked_ox
            oy = state.tracked_oy
            detected = state.tracked_detected
            conf = state.tracked_conf
            fps_d = state.detect_fps
            anno = state.all_annotated

        now = time.monotonic()

        if detected and conf > 0.4:
            target_lost_at = None
            j1_delta = -ox * args.gain_x
            j23_delta = oy * args.gain_y
            j1_s = lpf_x.update(j1_delta)
            j23_s = lpf_y.update(j23_delta)
            cmd = NEUTRAL_RAD.copy()
            cmd[0] = NEUTRAL_RAD[0] + j1_s
            cmd[1] = NEUTRAL_RAD[1] + j23_s
            cmd[2] = NEUTRAL_RAD[2] - j23_s * 0.6
        else:
            cmd = NEUTRAL_RAD.copy()
            if target_lost_at is None:
                target_lost_at = now
                print("[step 3/5] WARNING: target lost, holding position...", flush=True)

        robot.command_joint_state({
            "pos": cmd,
            "vel": np.zeros(6),
            "kp": robot._default_kp,
            "kd": robot._default_kd * 0.5,
        })

        if now - last_print > 2.0:
            if detected:
                print(f"  [tracking] ox={ox:+.2f} oy={oy:+.2f} "
                      f"j1={np.degrees(cmd[0]):+.1f}deg j2={np.degrees(cmd[1]):+.1f}deg "
                      f"conf={conf:.2f} cam_fps={fps_d:.0f}", flush=True)
            else:
                elapsed = now - target_lost_at if target_lost_at else 0
                print(f"  [searching] no target {elapsed:.1f}s", flush=True)
            last_print = now

        if args.preview and anno is not None:
            if now - last_preview >= preview_interval:
                hud = _render_overlay(anno.copy(), fw, fh, detected, conf, fps_d, ox, oy)
                cv2.imshow("Person Tracker  [Q=quit]", hud)
                key = cv2.waitKey(1) & 0xFF
                if key == ord("q") or key == 27:
                    print("[step 3/5] Q pressed, quitting.", flush=True)
                    graceful_shutdown()
                    return 0
                last_preview = now

        elapsed = time.monotonic() - t_start
        if interval - elapsed > 0:
            time.sleep(interval - elapsed)

    if args.preview:
        cv2.destroyAllWindows()

    # ============================================================
    # STEP 4: Return to neutral (position hold with move_joints)
    # ============================================================
    print(f"\n{'='*50}", flush=True)
    print(f"[step 4/5] Press ENTER to return to hold_neutral", flush=True)
    print(f"{'='*50}", flush=True)

    _enter_event.clear()
    while not _enter_event.is_set() and state.running:
        time.sleep(0.05)
    _enter_event.clear()

    print("[step 4/5] Returning to neutral...", flush=True)
    robot.move_joints(NEUTRAL_RAD, speed=0.3)
    time.sleep(4.0)

    st = robot.get_joint_state()
    print(f"[step 4/5] pos(deg): {np.round(np.degrees(st['pos']), 2)}", flush=True)

    # ============================================================
    # STEP 5: Home + zero-gravity
    # ============================================================
    print(f"\n{'='*50}", flush=True)
    print(f"[step 5/5] Press ENTER to home and switch to zero-gravity", flush=True)
    print(f"{'='*50}", flush=True)

    _enter_event.clear()
    while not _enter_event.is_set() and state.running:
        time.sleep(0.05)
    _enter_event.clear()

    print("[step 5/5] Opening gripper...", flush=True)
    robot.command_gripper(GRIPPER_OPEN)
    time.sleep(1.0)

    print(f"[step 5/5] Moving to home {HOME_DEG}...", flush=True)
    robot.move_joints(HOME_RAD, speed=0.3)
    time.sleep(4.0)

    print("[step 5/5] Switching to zero-gravity...", flush=True)
    robot.command_joint_state({
        "pos": HOME_RAD,
        "vel": np.zeros(6),
        "kp": np.zeros(6),
        "kd": robot._default_kd * 0.5,
    })

    graceful_shutdown()
    return 0


if __name__ == "__main__":
    sys.exit(main())
