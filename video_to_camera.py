#!/usr/bin/env python3
"""Run MegaSaM on a video and export a standard Cartesian camera trajectory."""

from __future__ import annotations

import argparse
import csv
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import zipfile
from pathlib import Path

import numpy as np


def run(command: list[str], *, cwd: Path | None = None, env: dict[str, str] | None = None) -> None:
    print("+", " ".join(str(part) for part in command), flush=True)
    subprocess.run(command, cwd=cwd, env=env, check=True)


def video_fps(video: Path) -> float:
    result = subprocess.run(
        [
            "ffprobe",
            "-v",
            "error",
            "-select_streams",
            "v:0",
            "-show_entries",
            "stream=avg_frame_rate",
            "-of",
            "default=noprint_wrappers=1:nokey=1",
            str(video),
        ],
        check=True,
        capture_output=True,
        text=True,
    )
    value = result.stdout.strip()
    try:
        numerator, separator, denominator = value.partition("/")
        fps = float(numerator) / float(denominator) if separator else float(value)
    except (ValueError, ZeroDivisionError) as error:
        raise ValueError(f"Invalid video frame rate reported by ffprobe: {value!r}") from error
    if not np.isfinite(fps) or fps <= 0:
        raise ValueError(f"Invalid video frame rate reported by ffprobe: {value!r}")
    return fps


def video_timestamps(video: Path) -> np.ndarray:
    """Return decoded video-frame PTS relative to the first frame."""
    result = subprocess.run(
        [
            "ffprobe",
            "-v",
            "error",
            "-select_streams",
            "v:0",
            "-show_frames",
            "-show_entries",
            "frame=best_effort_timestamp_time",
            "-of",
            "json",
            str(video),
        ],
        check=True,
        capture_output=True,
        text=True,
    )
    try:
        frames = json.loads(result.stdout)["frames"]
        timestamps = np.asarray(
            [float(frame["best_effort_timestamp_time"]) for frame in frames], dtype=np.float64
        )
    except (KeyError, TypeError, ValueError, json.JSONDecodeError) as error:
        raise ValueError("ffprobe did not report a timestamp for every decoded video frame") from error
    if len(timestamps) == 0 or not np.all(np.isfinite(timestamps)):
        raise ValueError("Video has no finite frame timestamps")
    timestamps -= timestamps[0]
    if len(timestamps) > 1 and np.any(np.diff(timestamps) <= 0):
        raise ValueError("Video frame timestamps are not strictly increasing")
    return timestamps


def scene_name(value: str) -> str:
    value = re.sub(r"[^A-Za-z0-9_.-]+", "_", value).strip("._")
    if not value:
        raise ValueError("Scene name is empty after sanitization")
    return value


def extract_frames(video: Path, frame_dir: Path) -> int:
    frame_dir.mkdir(parents=True, exist_ok=True)
    existing = list(frame_dir.iterdir())
    if existing:
        raise FileExistsError(
            f"Frame directory is not empty: {frame_dir}. Remove it or choose another work directory."
        )
    run(
        [
            "ffmpeg",
            "-i",
            str(video),
            "-map",
            "0:v:0",
            "-fps_mode",
            "passthrough",
            "-start_number",
            "0",
            str(frame_dir / "%06d.jpg"),
        ]
    )
    frames = sorted(frame_dir.glob("*.jpg"))
    if not frames:
        raise ValueError("ffmpeg did not extract any video frames")
    return len(frames)


def run_megasam(video: Path, megasam_root: Path, work_dir: Path, scene: str, gpu: str) -> tuple[Path, int]:
    for executable in ("ffmpeg", "ffprobe"):
        if shutil.which(executable) is None:
            raise RuntimeError(f"Required executable is not on PATH: {executable}")

    root = megasam_root.resolve()
    frames = work_dir.resolve() / "data" / scene
    result = root / "outputs" / f"{scene}_droid.npz"
    depth_output = root / "Depth-Anything" / "video_visualization" / scene
    metric_output = root / "UniDepth" / "outputs" / scene
    reconstruction_output = root / "reconstructions" / scene
    required_files = [
        root / "Depth-Anything" / "run_videos.py",
        root / "Depth-Anything" / "checkpoints" / "depth_anything_vitl14.pth",
        root / "UniDepth" / "scripts" / "demo_mega-sam.py",
        root / "camera_tracking_scripts" / "test_demo.py",
        root / "checkpoints" / "megasam_final.pth",
    ]
    required_directories = [root / "base" / "droid_slam", root / "UniDepth" / "unidepth"]
    missing = [str(path) for path in required_files if not path.is_file()]
    missing.extend(str(path) for path in required_directories if not path.is_dir())
    if missing:
        raise FileNotFoundError("Missing MegaSaM dependency: " + ", ".join(missing))
    stale = [path for path in (result, depth_output, metric_output, reconstruction_output) if path.exists()]
    if stale:
        raise FileExistsError(
            "Refusing to reuse existing scene artifacts: "
            + ", ".join(str(path) for path in stale)
            + ". Remove them or choose another --scene."
        )
    env = os.environ.copy()
    env["CUDA_VISIBLE_DEVICES"] = gpu
    env["PYTHONPATH"] = os.pathsep.join(
        filter(None, [env.get("PYTHONPATH"), str(root / "UniDepth")])
    )
    python = sys.executable
    run(
        [
            python,
            "-c",
            "import torch, unidepth, lietorch; assert torch.cuda.is_available(), 'CUDA is unavailable'",
        ],
        cwd=root,
        env=env,
    )
    frame_count = extract_frames(video.resolve(), frames)
    if frame_count > 1000:
        raise ValueError("MegaSaM NPZ export is limited to 1000 frames; split the source video first")

    run(
        [
            python,
            str(root / "Depth-Anything" / "run_videos.py"),
            "--encoder",
            "vitl",
            "--load-from",
            str(root / "Depth-Anything" / "checkpoints" / "depth_anything_vitl14.pth"),
            "--img-path",
            str(frames),
            "--outdir",
            str(root / "Depth-Anything" / "video_visualization" / scene),
        ],
        cwd=root,
        env=env,
    )
    run(
        [
            python,
            str(root / "UniDepth" / "scripts" / "demo_mega-sam.py"),
            "--scene-name",
            scene,
            "--img-path",
            str(frames),
            "--outdir",
            str(root / "UniDepth" / "outputs"),
        ],
        cwd=root,
        env=env,
    )
    run(
        [
            python,
            str(root / "camera_tracking_scripts" / "test_demo.py"),
            "--datapath",
            str(frames),
            "--weights",
            str(root / "checkpoints" / "megasam_final.pth"),
            "--scene_name",
            scene,
            "--mono_depth_path",
            str(root / "Depth-Anything" / "video_visualization"),
            "--metric_depth_path",
            str(root / "UniDepth" / "outputs"),
            "--disable_vis",
        ],
        cwd=root,
        env=env,
    )

    if not result.is_file():
        raise FileNotFoundError(f"MegaSaM completed but did not create {result}")
    pose_count = len(load_camera_poses(result, normalize_first=False))
    if pose_count != frame_count:
        raise ValueError(f"Frame/pose count mismatch: extracted {frame_count}, MegaSaM returned {pose_count}")
    return result, frame_count


def matrix_to_quaternion_xyzw(matrix: np.ndarray) -> np.ndarray:
    """Convert a proper 3x3 rotation matrix to a normalized XYZW quaternion."""
    m = np.asarray(matrix, dtype=np.float64)
    trace = np.trace(m)
    if trace > 0:
        s = np.sqrt(trace + 1.0) * 2
        q = np.array(
            [(m[2, 1] - m[1, 2]) / s, (m[0, 2] - m[2, 0]) / s, (m[1, 0] - m[0, 1]) / s, 0.25 * s]
        )
    else:
        i = int(np.argmax(np.diag(m)))
        if i == 0:
            s = np.sqrt(1.0 + m[0, 0] - m[1, 1] - m[2, 2]) * 2
            q = np.array([0.25 * s, (m[0, 1] + m[1, 0]) / s, (m[0, 2] + m[2, 0]) / s, (m[2, 1] - m[1, 2]) / s])
        elif i == 1:
            s = np.sqrt(1.0 + m[1, 1] - m[0, 0] - m[2, 2]) * 2
            q = np.array([(m[0, 1] + m[1, 0]) / s, 0.25 * s, (m[1, 2] + m[2, 1]) / s, (m[0, 2] - m[2, 0]) / s])
        else:
            s = np.sqrt(1.0 + m[2, 2] - m[0, 0] - m[1, 1]) * 2
            q = np.array([(m[0, 2] + m[2, 0]) / s, (m[1, 2] + m[2, 1]) / s, 0.25 * s, (m[1, 0] - m[0, 1]) / s])
    q /= np.linalg.norm(q)
    return q


def load_camera_poses(npz_path: Path, normalize_first: bool) -> np.ndarray:
    with np.load(npz_path, allow_pickle=False) as data:
        if "cam_c2w" not in data:
            raise KeyError(f"{npz_path} does not contain cam_c2w")
        poses = np.asarray(data["cam_c2w"], dtype=np.float64)
    if poses.ndim != 3 or poses.shape[1:] != (4, 4):
        raise ValueError(f"Expected cam_c2w shape (N, 4, 4), got {poses.shape}")
    if len(poses) == 0 or not np.all(np.isfinite(poses)):
        raise ValueError("Camera trajectory is empty or contains non-finite values")
    expected_bottom_row = np.array([0.0, 0.0, 0.0, 1.0])
    if not np.allclose(poses[:, 3, :], expected_bottom_row, atol=1e-5):
        raise ValueError("cam_c2w contains invalid homogeneous transform bottom rows")
    rotations = poses[:, :3, :3]
    orthogonality = rotations.transpose(0, 2, 1) @ rotations
    if not np.allclose(orthogonality, np.eye(3), atol=1e-4):
        raise ValueError("cam_c2w contains non-orthonormal rotation matrices")
    determinants = np.linalg.det(rotations)
    if not np.allclose(determinants, 1.0, atol=1e-4):
        raise ValueError("cam_c2w contains reflected or invalid rotation matrices")
    if normalize_first:
        poses = np.linalg.inv(poses[0]) @ poses
        if not np.all(np.isfinite(poses)):
            raise ValueError("First-pose normalization produced non-finite values")
    return poses


def pose_records(
    poses: np.ndarray,
    fps: float,
    frame_id: str,
    timestamps: np.ndarray | None = None,
    length_unit: str = "reconstruction_unit",
) -> list[dict[str, object]]:
    if not np.isfinite(fps) or fps <= 0:
        raise ValueError("FPS must be finite and greater than zero")
    if timestamps is None:
        timestamps = np.arange(len(poses), dtype=np.float64) / fps
        timestamp_quality = "synthetic_uniform_fps"
    else:
        timestamps = np.asarray(timestamps, dtype=np.float64)
        timestamp_quality = "source_frame_pts"
    if timestamps.shape != (len(poses),) or not np.all(np.isfinite(timestamps)):
        raise ValueError("Timestamps must be finite and match the pose count")
    if len(timestamps) and (timestamps[0] != 0 or np.any(np.diff(timestamps) <= 0)):
        raise ValueError("Timestamps must start at zero and be strictly increasing")
    records = []
    previous_quaternion = None
    for frame, pose in enumerate(poses):
        position = pose[:3, 3]
        quaternion = matrix_to_quaternion_xyzw(pose[:3, :3])
        if previous_quaternion is not None and np.dot(previous_quaternion, quaternion) < 0:
            quaternion = -quaternion
        previous_quaternion = quaternion
        seconds = int(timestamps[frame])
        nanoseconds = int(round((timestamps[frame] - seconds) * 1_000_000_000))
        if nanoseconds == 1_000_000_000:
            seconds += 1
            nanoseconds = 0
        records.append(
            {
                "schema": "camera_pose_stamped/v2",
                "message_compatibility": "geometry_msgs/PoseStamped",
                "frame_index": frame,
                "time_from_start_s": float(timestamps[frame]),
                "timestamp_quality": timestamp_quality,
                "stamp_basis": "media_time_from_start_not_ros_clock",
                "length_unit": length_unit,
                "coordinate_domain": "camera_reconstruction",
                "robot_execution_ready": False,
                "header": {
                    "stamp": {"sec": seconds, "nanosec": nanoseconds},
                    "frame_id": frame_id,
                },
                "pose": {
                    "position": {"x": float(position[0]), "y": float(position[1]), "z": float(position[2])},
                    "orientation": {
                        "x": float(quaternion[0]),
                        "y": float(quaternion[1]),
                        "z": float(quaternion[2]),
                        "w": float(quaternion[3]),
                    },
                },
            }
        )
    return records


def export_trajectory(
    npz_path: Path,
    output_dir: Path,
    fps: float,
    normalize_first: bool = True,
    meters_per_unit: float | None = None,
    timestamps: np.ndarray | None = None,
    expected_pose_count: int | None = None,
    force: bool = False,
) -> None:
    if meters_per_unit is not None and (not np.isfinite(meters_per_unit) or meters_per_unit <= 0):
        raise ValueError("meters_per_unit must be finite and greater than zero")
    poses = load_camera_poses(npz_path, normalize_first)
    if expected_pose_count is not None and len(poses) != expected_pose_count:
        raise ValueError(f"Frame/pose count mismatch: source has {expected_pose_count}, NPZ has {len(poses)}")
    if meters_per_unit is not None:
        poses[:, :3, 3] *= meters_per_unit
        if not np.all(np.isfinite(poses)):
            raise ValueError("Metric scale conversion produced non-finite values")
    length_unit = "meter" if meters_per_unit is not None else "reconstruction_unit"
    frame_id = "reconstruction_camera0" if normalize_first else "reconstruction_world_raw"
    parent_axis_convention = (
        "camera0_opencv_optical_x_right_y_down_z_forward"
        if normalize_first
        else "megasam_reconstruction_world_unspecified"
    )
    records = pose_records(poses, fps, frame_id, timestamps, length_unit)

    target_names = [
        "camera_pose_stamped.jsonl",
        "camera_trajectory.csv",
        "camera_cartesian_trajectory.json",
    ]
    existing = [output_dir / name for name in target_names if (output_dir / name).exists()]
    if existing and not force:
        raise FileExistsError("Refusing to overwrite trajectory output: " + ", ".join(map(str, existing)))
    for path in existing:
        if path.is_symlink() or not path.is_file():
            raise FileExistsError(f"Refusing to replace non-regular output: {path}")
    if output_dir.is_symlink():
        raise FileExistsError(f"Refusing to write through a symlinked output directory: {output_dir}")
    output_dir.parent.mkdir(parents=True, exist_ok=True)

    trajectory = {
        "type": "cartesian_trajectory",
        "schema_version": 1,
        "frame_id": frame_id,
        "child_frame_id": "camera",
        "transform": "frame_id_T_child_frame_id",
        "coordinate_domain": "camera_reconstruction",
        "robot_execution_ready": False,
        "parent_axis_convention": parent_axis_convention,
        "child_axis_convention": "opencv_optical_x_right_y_down_z_forward",
        "units": {"length": length_unit, "orientation": "unit_quaternion_xyzw", "time": "second"},
        "source": {
            "format": "MegaSaM cam_c2w",
            "fps": fps,
            "time_basis": records[0]["timestamp_quality"],
            "first_pose_normalized": normalize_first,
            "meters_per_reconstruction_unit": meters_per_unit,
            "metric_scale_calibrated": meters_per_unit is not None,
        },
        "points": [
            {
                "time_from_start_s": record["time_from_start_s"],
                "frame_index": record["frame_index"],
                "position_xyz": [record["pose"]["position"][axis] for axis in "xyz"],
                "orientation_xyzw": [record["pose"]["orientation"][axis] for axis in "xyzw"],
            }
            for record in records
        ],
    }
    jsonl_text = "".join(json.dumps(record, separators=(",", ":"), allow_nan=False) + "\n" for record in records)
    trajectory_text = json.dumps(trajectory, indent=2, allow_nan=False) + "\n"
    with tempfile.TemporaryDirectory(prefix=".trajectory-", dir=output_dir.parent) as temporary:
        staging = Path(temporary)
        (staging / target_names[0]).write_text(jsonl_text, encoding="utf-8")
        with (staging / target_names[1]).open("w", newline="", encoding="utf-8") as output:
            writer = csv.writer(output)
            writer.writerow(["frame", "time_from_start_s", "timestamp_quality", "frame_id", "length_unit", "coordinate_domain", "robot_execution_ready", "x", "y", "z", "qx", "qy", "qz", "qw"])
            for record in records:
                p = record["pose"]["position"]
                q = record["pose"]["orientation"]
                writer.writerow([record["frame_index"], record["time_from_start_s"], record["timestamp_quality"], frame_id, length_unit, record["coordinate_domain"], record["robot_execution_ready"], p["x"], p["y"], p["z"], q["x"], q["y"], q["z"], q["w"]])
        (staging / target_names[2]).write_text(trajectory_text, encoding="utf-8")
        output_dir.mkdir(parents=True, exist_ok=True)
        for name in target_names:
            os.replace(staging / name, output_dir / name)
    print(f"Exported {len(records)} poses to {output_dir}")


def parser() -> argparse.ArgumentParser:
    command = argparse.ArgumentParser(description=__doc__)
    subcommands = command.add_subparsers(dest="command", required=True)

    export = subcommands.add_parser("export", help="Export an existing MegaSaM NPZ result")
    export.add_argument("npz", type=Path)
    export.add_argument("--video", type=Path, help="Source video; used to detect FPS")
    export.add_argument("--fps", type=float, help="Override source video FPS")
    export.add_argument("--output-dir", type=Path, default=Path("trajectory_output"))
    export.add_argument(
        "--meters-per-unit",
        type=float,
        help="Calibrated metric scale; without this, positions remain reconstruction units",
    )
    export.add_argument("--keep-first-pose", action="store_true", help="Do not make the first pose the origin")
    export.add_argument("--force", action="store_true", help="Replace existing regular trajectory files")

    all_command = subcommands.add_parser("all", help="Extract frames, run MegaSaM, and export poses")
    all_command.add_argument("video", type=Path)
    all_command.add_argument("--megasam-root", type=Path, required=True)
    all_command.add_argument("--work-dir", type=Path, default=Path("work"))
    all_command.add_argument("--output-dir", type=Path, default=Path("trajectory_output"))
    all_command.add_argument("--scene")
    all_command.add_argument("--gpu", default="0")
    all_command.add_argument("--meters-per-unit", type=float)
    all_command.add_argument("--force", action="store_true", help="Replace existing regular trajectory files")
    return command


def main() -> None:
    args = parser().parse_args()
    if args.command == "export":
        if args.fps is None and args.video is None:
            raise SystemExit("export requires either --video or --fps")
        fps = args.fps if args.fps is not None else video_fps(args.video)
        if not np.isfinite(fps) or fps <= 0:
            raise SystemExit("--fps must be greater than zero")
        timestamps = None if args.fps is not None else video_timestamps(args.video)
        export_trajectory(
            args.npz,
            args.output_dir,
            fps,
            not args.keep_first_pose,
            args.meters_per_unit,
            timestamps,
            len(timestamps) if timestamps is not None else None,
            args.force,
        )
        return

    if not args.video.is_file():
        raise SystemExit(f"Video does not exist: {args.video}")
    scene = scene_name(args.scene or args.video.stem)
    fps = video_fps(args.video)
    timestamps = video_timestamps(args.video)
    result, frame_count = run_megasam(args.video, args.megasam_root, args.work_dir, scene, args.gpu)
    if len(timestamps) != frame_count:
        raise SystemExit(f"Decoded timestamp/frame count mismatch: {len(timestamps)} vs {frame_count}")
    export_trajectory(
        result,
        args.output_dir,
        fps,
        meters_per_unit=args.meters_per_unit,
        timestamps=timestamps,
        expected_pose_count=frame_count,
        force=args.force,
    )


if __name__ == "__main__":
    try:
        main()
    except (OSError, EOFError, TypeError, ValueError, KeyError, zipfile.BadZipFile, subprocess.CalledProcessError) as error:
        raise SystemExit(f"error: {error}") from None
