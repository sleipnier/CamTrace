"""A1Z + YOLOv8 real-time 2D object tracking demo.

Phone is clamped in the gripper (fixed relative pose). The arm's j1 (base
rotation) follows the target object's horizontal position on screen.

Architecture:
    iPhone camera (Continuity Camera)
        -> OpenCV (30fps capture)
        -> YOLOv8 (object detection)
        -> 2D offset: (center_x - screen_center) / screen_width
        -> j1 command: neutral_angle + offset * gain
        -> SERVO_POSITION 15Hz streaming to arm

Usage:
    python object_tracker.py --class "cup" --gain 0.5
    python object_tracker.py --class "person" --gain 0.8 --hz 15
"""

import argparse
import signal
import sys
import threading
import time
from pathlib import Path

import cv2
import numpy as np

# --- Command-line args ---
parser = argparse.ArgumentParser(description="A1Z real-time 2D object tracking with YOLOv8")
parser.add_argument("--workspace", default="", help="A1Z workspace (or set A1Z_WS)")
parser.add_argument("--device", type=int, default=0, help="Camera device index (default: 0)")
parser.add_argument("--class", dest="class_name", default="cup",
                    help="YOLO class name to track (default: cup)")
parser.add_argument("--model", default="yolov8n.pt",
                    help="YOLOv8 model file (default: yolov8n.pt, auto-downloads)")
parser.add_argument("--conf", type=float, default=0.5,
                    help="YOLO confidence threshold (default: 0.5)")
parser.add_argument("--neutral", type=float, default=0.0,
                    help="Neutral j1 angle in degrees (default: 0.0)")
parser.add_argument("--gain", type=float, default=0.5,
                    help="Screen-offset -> j1 gain in radians (default: 0.5 rad ≈ 28.6° at full screen)")
parser.add_argument("--hz", type=float, default=15.0,
                    help="Control loop frequency in Hz (default: 15)")
parser.add_argument("--max-j1", type=float, default=0.35,
                    help="Max j1 deviation from neutral in radians (default: 0.35 ≈ 20°)")
parser.add_argument("--preview", action="store_true",
                    help="Show OpenCV preview window (press q to quit)")
args = parser.parse_args()

import os
if not args.workspace:
    args.workspace = os.environ.get("A1Z_WS", "")
ws = Path(args.workspace).expanduser().resolve()

# --- YOLOv8 class names (partial list, enough for demo) ---
YOLO_CLASSES = {
    0: "person", 1: "bicycle", 2: "car", 3: "motorcycle", 4: "airplane",
    5: "bus", 6: "train", 7: "truck", 8: "boat", 9: "traffic light",
    14: "bird", 15: "cat", 16: "dog", 17: "horse", 18: "sheep", 19: "cow",
    20: "elephant", 21: "bear", 22: "zebra", 23: "giraffe",
    24: "backpack", 26: "umbrella", 27: "handbag", 28: "tie", 29: "suitcase",
    30: "frisbee", 31: "skis", 32: "snowboard", 33: "sports ball",
    34: "kite", 35: "baseball bat", 36: "baseball glove", 37: "skateboard",
    38: "surfboard", 39: "tennis racket", 40: "bottle", 41: "wine glass",
    42: "cup", 43: "fork", 44: "knife", 45: "spoon", 46: "bowl",
    47: "banana", 48: "apple", 49: "sandwich", 50: "orange", 51: "broccoli",
    52: "carrot", 53: "hot dog", 54: "pizza", 55: "donut", 56: "cake",
    57: "chair", 58: "couch", 59: "potted plant", 60: "bed",
    61: "dining table", 62: "toilet", 63: "tv", 64: "laptop", 65: "mouse",
    66: "remote", 67: "keyboard", 68: "cell phone", 69: "microwave",
    70: "oven", 71: "toaster", 72: "sink", 73: "refrigerator",
    74: "book", 75: "clock", 76: "vase", 77: "scissors",
    78: "teddy bear", 79: "hair drier", 80: "toothbrush",
}

# Find class ID for target name
target_class_id = None
for cid, cname in YOLO_CLASSES.items():
    if cname.lower() == args.class_name.lower():
        target_class_id = cid
        break
if target_class_id is None:
    print(f"ERROR: class '{args.class_name}' not found in YOLO classes. Available:", flush=True)
    print("  " + ", ".join(sorted(set(YOLO_CLASSES.values()))[:30]) + "...", flush=True)
    sys.exit(1)
print(f"[tracker] tracking class: '{args.class_name}' (id={target_class_id})", flush=True)


# --- Shared state between threads ---
class SharedState:
    def __init__(self):
        self.target_j1 = args.neutral  # radians
        self.lock = threading.Lock()
        self.running = True
        self.detected = False
        self.confidence = 0.0
        self.offset_x = 0.0  # -1 to 1 (left to right)
        self.frame_count = 0
        self.fps = 0.0


state = SharedState()


# --- YOLO thread: reads camera, runs detection, updates shared state ---
def detection_thread(cap, model):
    from collections import deque
    fps_buf = deque(maxlen=30)
    last_t = time.monotonic()

    while state.running:
        ret, frame = cap.read()
        if not ret:
            time.sleep(0.1)
            continue

        # YOLOv8 inference
        results = model(frame, verbose=False, conf=args.conf)
        r = results[0]

        offset = 0.0
        detected = False
        conf = 0.0

        if r.boxes is not None and len(r.boxes) > 0:
            for box in r.boxes:
                cls_id = int(box.cls[0])
                if cls_id == target_class_id:
                    x1, y1, x2, y2 = box.xyxy[0].cpu().numpy()
                    cx = (x1 + x2) / 2
                    cy = (y1 + y2) / 2
                    # offset: -1 (left) to +1 (right)
                    offset = (cx / frame.shape[1]) * 2 - 1
                    conf = float(box.conf[0])
                    detected = True
                    break

        with state.lock:
            state.offset_x = offset
            state.detected = detected
            state.confidence = conf
            state.frame_count += 1

        now = time.monotonic()
        fps_buf.append(1.0 / (now - last_t))
        last_t = now
        state.fps = sum(fps_buf) / len(fps_buf)

        # Preview window (optional)
        if args.preview:
            annotated = r.plot()
            status = f"{args.class_name} detected" if detected else "no target"
            cv2.putText(annotated, f"{status} | fps={state.fps:.0f}", (10, 30),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)
            cv2.imshow("A1Z Object Tracker", annotated)
            if cv2.waitKey(1) & 0xFF == ord("q"):
                state.running = False
                break

    if args.preview:
        cv2.destroyAllWindows()


# --- Main: connect arm, run tracking loop ---
def main() -> int:
    # Connect arm
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
        with state.lock:
            state.running = False
        det_t.join(timeout=2.0)
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

    print("[tracker] starting control loop...", flush=True)
    robot.start()

    # Start in neutral position first
    NEUTRAL_DEG = [0.0, 34.0, -23.0, -29.0, 0.0, 0.0]
    neutral_rad = np.deg2rad(np.array(NEUTRAL_DEG))
    print(f"[tracker] moving to neutral {NEUTRAL_DEG}...", flush=True)
    robot.move_joints(neutral_rad, speed=0.3)
    time.sleep(5.0)
    print("[tracker] neutral reached. current j1=neutral.", flush=True)

    input(f"\n[tracker] Place phone in gripper, press ENTER to start tracking '{args.class_name}'... ")

    # Switch to SERVO_POSITION
    robot.set_servo_control(True)
    print(f"[tracker] tracking at {args.hz}Hz, gain={args.gain} rad, neutral={args.neutral}°", flush=True)
    print("[tracker] Ctrl+C to stop (arm returns to neutral first)...", flush=True)

    # Load YOLOv8
    print(f"[tracker] loading YOLOv8 model ({args.model})...", flush=True)
    from ultralytics import YOLO
    model = YOLO(args.model)
    print(f"[tracker] model loaded.", flush=True)

    # Open camera
    cap = cv2.VideoCapture(args.device)
    if not cap.isOpened():
        print(f"ERROR: cannot open camera device {args.device}", flush=True)
        return 1

    # Try to get a good resolution
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)
    cap.set(cv2.CAP_PROP_FPS, 30)
    print(f"[tracker] camera opened: {int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))}x"
          f"{int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))} @ "
          f"{int(cap.get(cv2.CAP_PROP_FPS))}fps", flush=True)

    # Start detection thread
    det_t = threading.Thread(target=detection_thread, args=(cap, model), daemon=True)
    det_t.start()

    # Tracking loop: update arm at hz
    interval = 1.0 / args.hz
    last_print = 0
    while state.running:
        t_start = time.monotonic()

        # Read shared state
        with state.lock:
            offset = state.offset_x
            detected = state.detected
            conf = state.confidence
            fps = state.fps

        # Map offset to j1: neutral + offset * gain, clamped
        j1_target = args.neutral + offset * args.gain
        j1_target = np.clip(j1_target, args.neutral - args.max_j1, args.neutral + args.max_j1)

        # Current j1 from state
        try:
            joints = robot.get_joint_pos()
            j1_cur = joints[0]
        except Exception:
            j1_cur = j1_target

        # Build 6-joint command (hold other joints at neutral)
        cmd = neutral_rad.copy()
        cmd[0] = j1_target

        robot.command_joint_state({
            "pos": cmd,
            "vel": np.zeros(6),
            "kp": robot._default_kp,
            "kd": robot._default_kd * 0.5,
        })

        # Status print every 2s
        now = time.monotonic()
        if now - last_print > 2.0:
            status = "detected" if detected else "searching"
            print(f"  [{status}] offset={offset:+.2f} j1={np.degrees(j1_target):+.1f}° "
                  f"(cur={np.degrees(j1_cur):+.1f}°) conf={conf:.2f} cam_fps={fps:.0f}",
                  flush=True)
            last_print = now

        # Sleep to maintain hz
        elapsed = time.monotonic() - t_start
        sleep_time = interval - elapsed
        if sleep_time > 0:
            time.sleep(sleep_time)

    # Return to neutral before shutdown
    print("[tracker] returning to neutral...", flush=True)
    try:
        robot.set_servo_control(False)
        robot.move_joints(neutral_rad, speed=0.3)
        time.sleep(3.0)
    except Exception:
        pass

    graceful_shutdown()
    return 0


if __name__ == "__main__":
    sys.exit(main())
