"""iPhone camera + YOLOv8 object detection demo (no arm).

Displays the iPhone camera feed with real-time YOLOv8 detection bounding boxes.
Useful to test camera connection and YOLO detection before connecting the arm.

Usage:
    python camera_preview.py --device 1 --class cup
    python camera_preview.py --device 1 --class person --preview  # full screen
"""

import argparse
import time

import cv2
import numpy as np

parser = argparse.ArgumentParser(description="iPhone camera + YOLOv8 detection (no arm)")
parser.add_argument("--device", type=int, default=1,
                    help="Camera device index (default: 1 = iPhone)")
parser.add_argument("--class", dest="class_name", default="cup",
                    help="YOLO class name to highlight (default: cup, or 'all' for everything)")
parser.add_argument("--model", default="yolov8n.pt",
                    help="YOLOv8 model (default: yolov8n.pt)")
parser.add_argument("--conf", type=float, default=0.5,
                    help="YOLO confidence threshold (default: 0.5)")
parser.add_argument("--width", type=int, default=1280,
                    help="Camera frame width (default: 1280)")
parser.add_argument("--height", type=int, default=720,
                    help="Camera frame height (default: 720)")
args = parser.parse_args()

# YOLO class names (partial)
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

track_all = args.class_name.lower() == "all"
target_class_id = None
if not track_all:
    for cid, cname in YOLO_CLASSES.items():
        if cname.lower() == args.class_name.lower():
            target_class_id = cid
            break
    if target_class_id is None:
        print(f"ERROR: class '{args.class_name}' not found. Use --class all to show all detections.", flush=True)
        import sys; sys.exit(1)

# Load YOLO
print(f"[cam] loading YOLOv8 ({args.model})...", flush=True)
from ultralytics import YOLO
model = YOLO(args.model)
print(f"[cam] model loaded. {len(model.names)} classes.", flush=True)

# Open camera
cap = cv2.VideoCapture(args.device)
if not cap.isOpened():
    print(f"ERROR: cannot open camera device {args.device}", flush=True)
    import sys; sys.exit(1)

cap.set(cv2.CAP_PROP_FRAME_WIDTH, args.width)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, args.height)
cap.set(cv2.CAP_PROP_FPS, 30)
w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
fps = int(cap.get(cv2.CAP_PROP_FPS))
print(f"[cam] camera open: {w}x{h} @ {fps}fps (device={args.device})", flush=True)
track_label = "ALL classes" if track_all else f"'{args.class_name}' (id={target_class_id})"
print(f"[cam] tracking: {track_label}", flush=True)
print("[cam] press Q to quit", flush=True)

track_color = (0, 255, 0)  # green
all_color = (0, 200, 255)  # orange for "all" detections

det_count = 0
last_t = time.monotonic()
fps_display = 0.0

while True:
    ret, frame = cap.read()
    if not ret:
        print("[cam] frame grab failed, retrying...", flush=True)
        time.sleep(0.5)
        continue

    # YOLO inference
    results = model(frame, verbose=False, conf=args.conf)
    r = results[0]

    detections = []
    if r.boxes is not None and len(r.boxes) > 0:
        for box in r.boxes:
            cls_id = int(box.cls[0])
            if track_all or cls_id == target_class_id:
                x1, y1, x2, y2 = box.xyxy[0].cpu().numpy()
                conf = float(box.conf[0])
                label = YOLO_CLASSES.get(cls_id, f"id{cls_id}")
                detections.append((x1, y1, x2, y2, label, conf, cls_id == target_class_id))

    # Draw boxes
    for x1, y1, x2, y2, label, conf, is_target in detections:
        color = track_color if is_target else all_color
        cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), color, 2)
        text = f"{label} {conf:.2f}"
        (tw, th), _ = cv2.getTextSize(text, cv2.FONT_HERSHEY_SIMPLEX, 0.6, 1)
        cv2.rectangle(frame, (int(x1), int(y1) - th - 6), (int(x1) + tw, int(y1)), color, -1)
        cv2.putText(frame, text, (int(x1), int(y1) - 4),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 1)

    # FPS
    now = time.monotonic()
    fps_display = 0.9 * fps_display + 0.1 * (1.0 / (now - last_t))
    last_t = now
    cv2.putText(frame, f"cam {w}x{h} fps={fps_display:.0f}  det={len(detections)}",
                (10, 25), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 1)

    # Screen center guide
    cx, cy = w // 2, h // 2
    cv2.line(frame, (cx - 20, cy), (cx + 20, cy), (100, 100, 100), 1)
    cv2.line(frame, (cx, cy - 20), (cx, cy + 20), (100, 100, 100), 1)
    cv2.circle(frame, (cx, cy), 5, (100, 100, 100), 1)

    cv2.imshow("iPhone + YOLOv8 (Q to quit)", frame)
    key = cv2.waitKey(1) & 0xFF
    if key == ord("q") or key == 27:
        break

cap.release()
cv2.destroyAllWindows()
print("[cam] done.", flush=True)
