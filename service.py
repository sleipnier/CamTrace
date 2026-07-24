"""Isolated upload-to-dataset service for the MegaSaM CLI."""

from __future__ import annotations

import fcntl
import csv
import hashlib
import json
import logging
import math
import os
import re
import shutil
import signal
import subprocess
import sys
import tempfile
import time
import uuid
import zipfile
from dataclasses import dataclass
from datetime import datetime, timezone
from fractions import Fraction
from pathlib import Path
from typing import Callable


OUTPUT_NAMES = (
    "camera_pose_stamped.jsonl",
    "camera_trajectory.csv",
    "camera_cartesian_trajectory.json",
)
ALLOWED_SUFFIXES = {".mp4", ".mov", ".mkv", ".avi", ".webm", ".m4v"}


class ServiceError(Exception):
    """An error that is safe to display to the uploader."""


@dataclass(frozen=True)
class ServiceConfig:
    project_root: Path
    megasam_root: Path
    runtime_root: Path
    gpu: str = "0"
    max_upload_mb: int = 200
    max_duration_seconds: float = 60.0
    min_frames: int = 8
    max_frames: int = 1000
    max_width: int = 3840
    max_height: int = 2160
    timeout_seconds: int = 1800
    result_ttl_seconds: int = 3600
    max_results_mb: int = 5000

    @classmethod
    def from_env(cls) -> "ServiceConfig":
        home = Path(os.environ.get("VTC_HOME", "/hyperai/home"))
        return cls(
            project_root=Path(os.environ.get("VTC_PROJECT_ROOT", home / "videotocamera")),
            megasam_root=Path(os.environ.get("VTC_MEGASAM_ROOT", home / "mega-sam")),
            runtime_root=Path(os.environ.get("VTC_RUNTIME_ROOT", home / "vtc-runtime")),
            gpu=os.environ.get("VTC_GPU", "0"),
            max_upload_mb=int(os.environ.get("VTC_MAX_UPLOAD_MB", "200")),
            max_duration_seconds=float(os.environ.get("VTC_MAX_DURATION_SECONDS", "60")),
            min_frames=int(os.environ.get("VTC_MIN_FRAMES", "8")),
            max_frames=int(os.environ.get("VTC_MAX_FRAMES", "1000")),
            max_width=int(os.environ.get("VTC_MAX_WIDTH", "3840")),
            max_height=int(os.environ.get("VTC_MAX_HEIGHT", "2160")),
            timeout_seconds=int(os.environ.get("VTC_JOB_TIMEOUT_SECONDS", "1800")),
            result_ttl_seconds=int(os.environ.get("VTC_RESULT_TTL_SECONDS", "3600")),
            max_results_mb=int(os.environ.get("VTC_MAX_RESULTS_MB", "5000")),
        )


def _sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def _copy_upload(source: Path, destination: Path, max_bytes: int) -> tuple[int, str]:
    if source.is_symlink() or not source.is_file():
        raise ServiceError("Upload must be a regular file")
    suffix = source.suffix.lower()
    if suffix not in ALLOWED_SUFFIXES:
        raise ServiceError("Unsupported video type")
    destination.parent.mkdir(parents=True, exist_ok=False)
    digest = hashlib.sha256()
    size = 0
    try:
        with source.open("rb") as input_file, destination.open("xb") as output_file:
            while chunk := input_file.read(1024 * 1024):
                size += len(chunk)
                if size > max_bytes:
                    raise ServiceError("Video exceeds the upload size limit")
                digest.update(chunk)
                output_file.write(chunk)
    except Exception:
        destination.unlink(missing_ok=True)
        raise
    return size, digest.hexdigest()


def inspect_video(video: Path, config: ServiceConfig) -> dict[str, object]:
    try:
        result = subprocess.run(
            [
                "ffprobe",
                "-v",
                "error",
                "-select_streams",
                "v:0",
                "-count_frames",
                "-show_entries",
                "stream=codec_name,width,height,nb_read_frames,nb_frames,avg_frame_rate:format=duration",
                "-of",
                "json",
                str(video),
            ],
            check=True,
            capture_output=True,
            text=True,
            timeout=120,
        )
        payload = json.loads(result.stdout)
        stream = payload["streams"][0]
        duration = float(payload["format"]["duration"])
        width = int(stream["width"])
        height = int(stream["height"])
        frame_value = stream.get("nb_read_frames") or stream.get("nb_frames")
        if frame_value in (None, "N/A"):
            frame_count = round(duration * float(Fraction(stream["avg_frame_rate"])))
        else:
            frame_count = int(frame_value)
    except (IndexError, KeyError, TypeError, ValueError, json.JSONDecodeError, subprocess.SubprocessError) as error:
        raise ServiceError("The upload is not a decodable video") from error
    if not (0 < duration <= config.max_duration_seconds):
        raise ServiceError(f"Video duration must be at most {config.max_duration_seconds:g} seconds")
    if width <= 0 or height <= 0 or width > config.max_width or height > config.max_height:
        raise ServiceError(f"Video resolution must not exceed {config.max_width}x{config.max_height}")
    if not (config.min_frames <= frame_count <= config.max_frames):
        raise ServiceError(f"Video must contain between {config.min_frames} and {config.max_frames} frames")
    return {
        "codec": stream.get("codec_name", "unknown"),
        "duration_seconds": duration,
        "width": width,
        "height": height,
        "frame_count": frame_count,
    }


def _clean_megasam_artifacts(root: Path, scene: str) -> None:
    paths = (
        root / "outputs" / f"{scene}_droid.npz",
        root / "Depth-Anything" / "video_visualization" / scene,
        root / "UniDepth" / "outputs" / scene,
        root / "reconstructions" / scene,
    )
    for path in paths:
        if path.is_dir() and not path.is_symlink():
            shutil.rmtree(path)
        elif path.exists() or path.is_symlink():
            path.unlink()


def run_pipeline(config: ServiceConfig, task_root: Path, video: Path, scene: str) -> None:
    log_path = task_root / "pipeline.log"
    command = [
        sys.executable,
        "-I",
        str(config.project_root / "video_to_camera.py"),
        "all",
        str(video),
        "--megasam-root",
        str(config.megasam_root),
        "--scene",
        scene,
        "--work-dir",
        str(task_root / "work"),
        "--output-dir",
        str(task_root / "output"),
        "--gpu",
        config.gpu,
    ]
    lock_path = config.megasam_root / ".vtc-gpu.lock"
    with lock_path.open("a+") as lock, log_path.open("wb") as log:
        deadline = time.monotonic() + config.timeout_seconds
        while True:
            try:
                fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
                break
            except BlockingIOError:
                if time.monotonic() >= deadline:
                    raise ServiceError("GPU queue wait timed out")
                time.sleep(0.25)
        process = subprocess.Popen(
            command,
            stdin=subprocess.DEVNULL,
            stdout=log,
            stderr=subprocess.STDOUT,
            start_new_session=True,
        )
        try:
            return_code = process.wait(timeout=config.timeout_seconds)
        except subprocess.TimeoutExpired as error:
            os.killpg(process.pid, signal.SIGTERM)
            try:
                process.wait(timeout=10)
            except subprocess.TimeoutExpired:
                os.killpg(process.pid, signal.SIGKILL)
                try:
                    process.wait(timeout=10)
                except subprocess.TimeoutExpired as kill_error:
                    raise ServiceError("GPU process could not be terminated") from kill_error
            raise ServiceError("GPU processing timed out") from error
        if return_code != 0:
            raise ServiceError(f"Reconstruction failed; job ID: {scene.removeprefix('job_')}")


def _safe_original_name(name: str) -> str:
    value = re.sub(r"[^A-Za-z0-9_.-]+", "_", Path(name).name).strip("._")
    return value[:120] or "video"


def _assert_finite(value: object) -> None:
    if isinstance(value, float) and not math.isfinite(value):
        raise ServiceError("Reconstruction output contains non-finite values")
    if isinstance(value, dict):
        for child in value.values():
            _assert_finite(child)
    elif isinstance(value, list):
        for child in value:
            _assert_finite(child)


def _validate_outputs(output_dir: Path, expected_count: int) -> None:
    try:
        jsonl_path = output_dir / OUTPUT_NAMES[0]
        records = [json.loads(line) for line in jsonl_path.read_text().splitlines()]
        if len(records) != expected_count:
            raise ServiceError("PoseStamped record count does not match the source video")
        for index, record in enumerate(records):
            _assert_finite(record)
            if record["schema"] != "camera_pose_stamped/v2" or record["frame_index"] != index:
                raise ServiceError("PoseStamped output schema is invalid")
            if record["robot_execution_ready"] is not False:
                raise ServiceError("PoseStamped output has an unsafe execution flag")
        first_pose = records[0]["pose"]
        first_values = [first_pose["position"][axis] for axis in "xyz"]
        first_quaternion = [first_pose["orientation"][axis] for axis in "xyzw"]
        if any(abs(value) > 1e-6 for value in first_values) or any(
            abs(actual - expected) > 1e-6
            for actual, expected in zip(first_quaternion, (0.0, 0.0, 0.0, 1.0))
        ):
            raise ServiceError("The first camera pose is not normalized")

        with (output_dir / OUTPUT_NAMES[1]).open(newline="", encoding="utf-8") as source:
            csv_records = list(csv.DictReader(source))
        if len(csv_records) != expected_count or any(int(row["frame"]) != index for index, row in enumerate(csv_records)):
            raise ServiceError("CSV record count or frame indexes are invalid")

        trajectory = json.loads((output_dir / OUTPUT_NAMES[2]).read_text())
        _assert_finite(trajectory)
        if (
            trajectory["type"] != "cartesian_trajectory"
            or trajectory["robot_execution_ready"] is not False
            or len(trajectory["points"]) != expected_count
        ):
            raise ServiceError("Cartesian trajectory schema is invalid")
    except ServiceError:
        raise
    except (OSError, KeyError, TypeError, ValueError, json.JSONDecodeError, csv.Error) as error:
        raise ServiceError("Reconstruction output schema validation failed") from error


def cleanup_results(config: ServiceConfig) -> None:
    root = config.runtime_root / "results"
    if not root.exists():
        return
    now = time.time()
    directories = sorted((path for path in root.iterdir() if path.is_dir()), key=lambda path: path.stat().st_mtime)
    for path in list(directories):
        if now - path.stat().st_mtime > config.result_ttl_seconds:
            shutil.rmtree(path, ignore_errors=True)
            directories.remove(path)
    limit = config.max_results_mb * 1024 * 1024
    sizes = {path: sum(file.stat().st_size for file in path.rglob("*") if file.is_file()) for path in directories}
    total = sum(sizes.values())
    for path in directories:
        if total <= limit:
            break
        shutil.rmtree(path, ignore_errors=True)
        total -= sizes[path]


def _package_dataset(
    output_dir: Path,
    result_dir: Path,
    job_id: str,
    original_name: str,
    source_size: int,
    source_sha256: str,
    video_info: dict[str, object],
    created_at: str,
) -> Path:
    _validate_outputs(output_dir, int(video_info["frame_count"]))
    outputs = []
    for name in OUTPUT_NAMES:
        path = output_dir / name
        if path.is_symlink() or not path.is_file() or path.stat().st_size == 0:
            raise ServiceError("Reconstruction produced an incomplete dataset")
        outputs.append({"name": name, "size_bytes": path.stat().st_size, "sha256": _sha256(path)})
    manifest = {
        "schema_version": 1,
        "job_id": job_id,
        "status": "succeeded",
        "created_at": created_at,
        "completed_at": datetime.now(timezone.utc).isoformat(),
        "source": {
            "original_name": _safe_original_name(original_name),
            "size_bytes": source_size,
            "sha256": source_sha256,
            **video_info,
        },
        "pipeline": {
            "name": "MegaSaM video-to-camera",
            "first_pose_normalized": True,
            "robot_execution_ready": False,
        },
        "outputs": outputs,
    }
    result_dir.mkdir(parents=True, exist_ok=False)
    try:
        final_path = result_dir / f"camera_dataset_{job_id}.zip"
        temporary_path = result_dir / f".{final_path.name}.tmp"
        with zipfile.ZipFile(temporary_path, "x", compression=zipfile.ZIP_DEFLATED) as archive:
            for name in OUTPUT_NAMES:
                archive.write(output_dir / name, name)
            archive.writestr("manifest.json", json.dumps(manifest, indent=2, allow_nan=False) + "\n")
        with zipfile.ZipFile(temporary_path) as archive:
            if archive.testzip() is not None:
                raise ServiceError("Dataset archive verification failed")
        os.replace(temporary_path, final_path)
        return final_path
    except Exception:
        shutil.rmtree(result_dir, ignore_errors=True)
        raise


def build_dataset(
    uploaded_path: str | Path,
    config: ServiceConfig,
    pipeline_runner: Callable[[ServiceConfig, Path, Path, str], None] = run_pipeline,
) -> tuple[Path, str]:
    source = Path(uploaded_path)
    cleanup_results(config)
    job_id = uuid.uuid4().hex
    scene = f"job_{job_id}"
    tasks_root = config.runtime_root / "tasks"
    results_root = config.runtime_root / "results"
    tasks_root.mkdir(parents=True, exist_ok=True)
    results_root.mkdir(parents=True, exist_ok=True)
    task_root = Path(tempfile.mkdtemp(prefix=f"{job_id}-", dir=tasks_root))
    result_dir = results_root / job_id
    created_at = datetime.now(timezone.utc).isoformat()
    try:
        destination = task_root / "input" / f"source{source.suffix.lower()}"
        size, source_hash = _copy_upload(source, destination, config.max_upload_mb * 1024 * 1024)
        video_info = inspect_video(destination, config)
        pipeline_runner(config, task_root, destination, scene)
        archive = _package_dataset(
            task_root / "output",
            result_dir,
            job_id,
            source.name,
            size,
            source_hash,
            video_info,
            created_at,
        )
        return archive, f"Completed job {job_id}: {video_info['frame_count']} poses"
    except Exception:
        log_path = task_root / "pipeline.log"
        if log_path.is_file():
            error_dir = config.runtime_root / "errors"
            error_dir.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(log_path, error_dir / f"{job_id}.log")
        raise
    finally:
        try:
            _clean_megasam_artifacts(config.megasam_root, scene)
        except OSError:
            logging.exception("Failed to clean MegaSaM artifacts for %s", scene)
        finally:
            shutil.rmtree(task_root, ignore_errors=True)
