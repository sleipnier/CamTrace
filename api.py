#!/usr/bin/env python3
"""FastAPI service for the independent CAM//TRACE frontend."""

from __future__ import annotations

import base64
import binascii
import hashlib
import hmac
import json
import logging
import os
import shutil
import threading
import time
import uuid
import zipfile
from concurrent.futures import Future, ThreadPoolExecutor
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any, Callable

from fastapi import FastAPI, File, Form, HTTPException, Query, Request, UploadFile
from fastapi.exceptions import RequestValidationError
from fastapi.responses import FileResponse, JSONResponse, Response
from fastapi.staticfiles import StaticFiles

from render_camera_trajectory_video import render_video
from service import ServiceConfig, ServiceError, build_dataset, inspect_video, run_pipeline
from state_store import StateStore
from visualize_camera_trajectory import CameraTrajectory, load_trajectory


CONFIG = ServiceConfig.from_env()
API_ROOT = CONFIG.runtime_root / "api"
JOB_ROOT = API_ROOT / "jobs"
UPLOAD_ROOT = API_ROOT / "uploads"
VISUALIZATION_ROOT = API_ROOT / "visualizations"
TRAJECTORY_MAX_BYTES = 25 * 1024 * 1024
TRAJECTORY_SUFFIXES = {".zip", ".csv", ".json", ".jsonl"}
VIDEO_SUFFIXES = {".mp4", ".mov", ".mkv", ".avi", ".webm", ".m4v"}
executor = ThreadPoolExecutor(max_workers=max(2, int(os.environ.get("VTC_API_WORKERS", "4"))))
state_lock = threading.RLock()
job_futures: dict[str, Future[None]] = {}
visualization_states: dict[str, dict[str, Any]] = {}
logger = logging.getLogger("camera_trace.api")


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def empty_source(name: str, size: int) -> dict[str, Any]:
    return {
        "originalName": name,
        "sizeBytes": size,
        "codec": "pending",
        "durationSeconds": 0,
        "width": 0,
        "height": 0,
        "frameCount": 0,
        "fps": 0,
    }


def source_payload(name: str, size: int, info: dict[str, object]) -> dict[str, Any]:
    return {
        "originalName": name,
        "sizeBytes": size,
        "codec": str(info["codec"]),
        "durationSeconds": float(info["duration_seconds"]),
        "width": int(info["width"]),
        "height": int(info["height"]),
        "frameCount": int(info["frame_count"]),
        "fps": float(info["fps"]),
    }


def job_path(job_id: str) -> Path:
    return JOB_ROOT / f"{job_id}.json"


def state_store() -> StateStore:
    """Return the store relative to the current runtime root."""
    return StateStore(JOB_ROOT.parent / "state.sqlite3", JOB_ROOT, VISUALIZATION_ROOT)


def encode_cursor(record: dict[str, Any]) -> str:
    payload = json.dumps(
        {"createdAt": record["createdAt"], "id": record["id"]},
        separators=(",", ":"),
    ).encode("utf-8")
    return base64.urlsafe_b64encode(payload).decode("ascii").rstrip("=")


def decode_cursor(cursor: str) -> tuple[str, str]:
    try:
        padding = "=" * (-len(cursor) % 4)
        payload = json.loads(base64.urlsafe_b64decode(cursor + padding))
        created_at = str(payload["createdAt"])
        job_id = str(payload["id"])
        if not created_at or not job_id:
            raise ValueError
        return created_at, job_id
    except (ValueError, KeyError, TypeError, UnicodeDecodeError, binascii.Error, json.JSONDecodeError) as error:
        raise HTTPException(
            422,
            detail={"code": "INVALID_CURSOR", "message": "分页游标无效或已经损坏"},
        ) from error


def public_job(job: dict[str, Any]) -> dict[str, Any]:
    payload = {key: value for key, value in job.items() if key != "archivePath"}
    if job.get("status") == "succeeded":
        archive_value = job.get("archivePath")
        payload["resultAvailable"] = bool(archive_value and Path(archive_value).is_file())
    return payload


def write_json_atomic(path: Path, payload: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_name(f".{path.name}.{uuid.uuid4().hex}.tmp")
    temporary.write_text(json.dumps(payload, ensure_ascii=False, indent=2, allow_nan=False), encoding="utf-8")
    os.replace(temporary, path)


def save_job(job: dict[str, Any]) -> None:
    with state_lock:
        state_store().save_job(job)


def visualization_state_path(identifier: str) -> Path:
    return VISUALIZATION_ROOT / identifier / "state.json"


def save_visualization_state(state: dict[str, Any]) -> None:
    with state_lock:
        state_store().save_visualization(state)


def read_visualization_state(identifier: str) -> dict[str, Any]:
    if not identifier or any(
        character not in "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-"
        for character in identifier
    ):
        raise HTTPException(404, detail={"code": "VISUALIZATION_NOT_FOUND", "message": "可视化任务不存在"})
    with state_lock:
        state = visualization_states.get(identifier)
        if state is not None:
            return state
        state = state_store().read_visualization(identifier)
        if state is None:
            raise HTTPException(
                404,
                detail={"code": "VISUALIZATION_NOT_FOUND", "message": "可视化任务不存在"},
            )
        visualization_states[identifier] = state
        return state


def update_visualization_state(identifier: str, **changes: Any) -> dict[str, Any]:
    with state_lock:
        state = read_visualization_state(identifier)
        state.update(changes)
        save_visualization_state(state)
        return state


def read_job(job_id: str) -> dict[str, Any]:
    if not job_id or any(character not in "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-" for character in job_id):
        raise HTTPException(404, detail={"code": "JOB_NOT_FOUND", "message": "任务不存在"})
    with state_lock:
        job = state_store().read_job(job_id)
    if job is None:
        raise HTTPException(404, detail={"code": "JOB_NOT_FOUND", "message": "任务不存在"})
    return job


def update_job(job_id: str, mutate: Callable[[dict[str, Any]], None]) -> dict[str, Any]:
    with state_lock:
        job = read_job(job_id)
        mutate(job)
        save_job(job)
        return job


def set_stage(job_id: str, status: str, percent: int, label: str) -> None:
    def mutate(job: dict[str, Any]) -> None:
        job["status"] = status
        job["progress"] = {"percent": percent, "stageLabel": label}
    update_job(job_id, mutate)


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def run_job(job_id: str, upload_path: Path) -> None:
    started_at = time.monotonic()
    logger.info(
        "job_started job_id=%s upload_name=%s upload_bytes=%d",
        job_id,
        upload_path.name,
        upload_path.stat().st_size if upload_path.exists() else 0,
    )
    try:
        job = read_job(job_id)
        set_stage(job_id, "validating", 15, "正在使用 ffprobe 解析视频")
        info = inspect_video(upload_path, CONFIG)

        def apply_info(current: dict[str, Any]) -> None:
            current["source"] = source_payload(current["source"]["originalName"], upload_path.stat().st_size, info)
            current["status"] = "queued"
            current["progress"] = {"percent": 28, "stageLabel": "视频校验完成，等待 GPU"}
        update_job(job_id, apply_info)

        def pipeline(config: ServiceConfig, task_root: Path, video: Path, scene: str) -> None:
            set_stage(job_id, "reconstructing", 45, "MegaSaM 正在重建相机运动")
            run_pipeline(config, task_root, video, scene)
            set_stage(job_id, "packaging", 90, "正在验证轨迹并打包数据集")

        archive, _ = build_dataset(upload_path, CONFIG, pipeline)
        with zipfile.ZipFile(archive) as dataset:
            manifest_bytes = dataset.read("manifest.json")
            manifest = json.loads(manifest_bytes)
            cartesian = json.loads(dataset.read("camera_cartesian_trajectory.json"))
            output_info = {item["name"]: item for item in manifest["outputs"]}
        dataset_hash = sha256(archive)
        artifacts = [
            {
                "kind": "dataset",
                "name": archive.name,
                "sizeBytes": archive.stat().st_size,
                "sha256": dataset_hash,
                "downloadUrl": f"/api/jobs/{job_id}/dataset",
            },
            {
                "kind": "trajectory",
                "name": "camera_cartesian_trajectory.json",
                "sizeBytes": output_info["camera_cartesian_trajectory.json"]["size_bytes"],
                "sha256": output_info["camera_cartesian_trajectory.json"]["sha256"],
                "downloadUrl": f"/api/jobs/{job_id}/artifacts/camera_cartesian_trajectory.json",
            },
            {
                "kind": "manifest",
                "name": "manifest.json",
                "sizeBytes": len(manifest_bytes),
                "sha256": hashlib.sha256(manifest_bytes).hexdigest(),
                "downloadUrl": f"/api/jobs/{job_id}/artifacts/manifest.json",
            },
        ]

        def complete(current: dict[str, Any]) -> None:
            current.update({
                "status": "succeeded",
                "completedAt": utc_now(),
                "progress": {"percent": 100, "stageLabel": "真实轨迹数据已就绪"},
                "robotExecutionReady": False,
                "frameId": cartesian["frame_id"],
                "lengthUnit": cartesian["units"]["length"],
                "outputCount": len(cartesian["points"]),
                "artifacts": artifacts,
                "archivePath": str(archive),
                "datasetJobId": str(manifest["job_id"]),
                "resultAvailable": True,
                "resultExpiresAt": (
                    datetime.now(timezone.utc) + timedelta(seconds=CONFIG.result_ttl_seconds)
                ).isoformat(),
            })
        update_job(job_id, complete)
        logger.info(
            "job_succeeded job_id=%s dataset_job_id=%s poses=%d duration_s=%.3f",
            job_id,
            manifest["job_id"],
            len(cartesian["points"]),
            time.monotonic() - started_at,
        )
    except ServiceError as error:
        logger.warning(
            "job_rejected job_id=%s code=PROCESSING_REJECTED duration_s=%.3f message=%s",
            job_id,
            time.monotonic() - started_at,
            error,
        )
        fail_job(job_id, "PROCESSING_REJECTED", str(error))
    except Exception:
        logger.exception(
            "job_failed job_id=%s code=RECONSTRUCTION_FAILED duration_s=%.3f",
            job_id,
            time.monotonic() - started_at,
        )
        fail_job(job_id, "RECONSTRUCTION_FAILED", "重建失败，请使用任务 ID 检查服务端日志")
    finally:
        upload_path.unlink(missing_ok=True)
        job_futures.pop(job_id, None)


def fail_job(job_id: str, code: str, message: str) -> None:
    def mutate(job: dict[str, Any]) -> None:
        job["status"] = "failed"
        job["completedAt"] = utc_now()
        job["progress"] = {"percent": job.get("progress", {}).get("percent", 0), "stageLabel": "任务失败"}
        job["error"] = {"code": code, "message": message}
    try:
        update_job(job_id, mutate)
    except HTTPException:
        pass


def trajectory_payload(trajectory: CameraTrajectory, job_id: str) -> dict[str, Any]:
    count = len(trajectory.positions)
    if count > CONFIG.max_frames:
        raise HTTPException(422, detail={"code": "TOO_MANY_POSES", "message": f"轨迹不能超过 {CONFIG.max_frames} 个位姿"})
    duration = float(trajectory.times_s[-1] - trajectory.times_s[0]) if count > 1 else 0.0
    fps = float((count - 1) / duration) if duration > 0 else 0.0
    return {
        "jobId": job_id,
        "frameId": trajectory.frame_id,
        "childFrameId": "camera",
        "lengthUnit": trajectory.length_unit,
        "fps": fps,
        "firstPoseNormalized": bool(
            max(abs(float(value)) for value in trajectory.positions[0]) < 1e-6
            and max(abs(float(actual) - expected) for actual, expected in zip(trajectory.quaternions_xyzw[0], (0, 0, 0, 1))) < 1e-6
        ),
        "robotExecutionReady": False,
        "points": [
            {
                "frameIndex": int(trajectory.frame_indexes[index]),
                "timeFromStartS": float(trajectory.times_s[index]),
                "positionXYZ": [float(value) for value in trajectory.positions[index]],
                "orientationXYZW": [float(value) for value in trajectory.quaternions_xyzw[index]],
            }
            for index in range(count)
        ],
    }


async def save_upload(upload: UploadFile, destination: Path, maximum: int, suffixes: set[str]) -> int:
    suffix = Path(upload.filename or "").suffix.lower()
    if suffix not in suffixes:
        raise HTTPException(422, detail={"code": "UNSUPPORTED_FILE", "message": "不支持的文件格式"})
    destination.parent.mkdir(parents=True, exist_ok=True)
    size = 0
    try:
        with destination.open("xb") as target:
            while chunk := await upload.read(1024 * 1024):
                size += len(chunk)
                if size > maximum:
                    raise HTTPException(413, detail={"code": "FILE_TOO_LARGE", "message": "上传文件超过大小限制"})
                target.write(chunk)
    except Exception:
        destination.unlink(missing_ok=True)
        raise
    finally:
        await upload.close()
    return size


app = FastAPI(title="CAM//TRACE API", version="1.0.0")


def recover_incomplete_jobs() -> int:
    JOB_ROOT.mkdir(parents=True, exist_ok=True)
    store = state_store()
    recovered = 0
    for job in store.list_jobs():
        if job.get("status") in {"succeeded", "failed"}:
            continue
        job.update({
            "status": "failed",
            "completedAt": utc_now(),
            "progress": {
                "percent": job.get("progress", {}).get("percent", 0),
                "stageLabel": "服务重启，任务已终止",
            },
            "error": {
                "code": "SERVICE_RESTARTED",
                "message": "服务重启导致任务中断，请重新提交视频",
            },
        })
        save_job(job)
        for upload in UPLOAD_ROOT.glob(f"{job['id']}.*"):
            upload.unlink(missing_ok=True)
        recovered += 1
    return recovered


def recover_visualization_states() -> int:
    VISUALIZATION_ROOT.mkdir(parents=True, exist_ok=True)
    store = state_store()
    recovered = 0
    for state in store.list_visualizations():
        identifier = str(state.get("id", ""))
        if state.get("status") in {"queued", "rendering"}:
            state.update({
                "status": "failed",
                "progressPercent": 100,
                "completedAt": utc_now(),
                "error": {
                    "code": "SERVICE_RESTARTED",
                    "message": "服务重启导致视频渲染中断，请重新生成",
                },
            })
            for source in UPLOAD_ROOT.glob(f"{identifier}.*"):
                source.unlink(missing_ok=True)
            recovered += 1
        elif state.get("status") == "succeeded":
            output = Path(state.get("outputPath", ""))
            if not output.is_file():
                state.update({
                    "status": "failed",
                    "progressPercent": 100,
                    "error": {
                        "code": "VIDEO_EXPIRED",
                        "message": "可视化视频文件已经过期或被清理",
                    },
                })
                recovered += 1
        visualization_states[identifier] = state
        save_visualization_state(state)
    return recovered


@app.on_event("startup")
def startup_recovery() -> None:
    state_store().migrate_legacy()
    recover_incomplete_jobs()
    recover_visualization_states()


@app.middleware("http")
async def basic_auth(request: Request, call_next: Callable[..., Any]) -> Response:
    username = os.environ.get("VTC_AUTH_USER")
    password = os.environ.get("VTC_AUTH_PASSWORD")
    if not username or not password or request.url.path == "/api/health":
        return await call_next(request)
    authorization = request.headers.get("Authorization", "")
    valid = False
    if authorization.startswith("Basic "):
        try:
            supplied = base64.b64decode(authorization[6:]).decode("utf-8")
            supplied_user, supplied_password = supplied.split(":", 1)
            valid = hmac.compare_digest(supplied_user, username) and hmac.compare_digest(supplied_password, password)
        except (ValueError, UnicodeDecodeError):
            pass
    if not valid:
        return Response(status_code=401, headers={"WWW-Authenticate": 'Basic realm="CAM TRACE"'})
    return await call_next(request)


@app.exception_handler(HTTPException)
async def http_error(_: Request, error: HTTPException) -> JSONResponse:
    detail = error.detail if isinstance(error.detail, dict) else {"code": "HTTP_ERROR", "message": str(error.detail)}
    return JSONResponse(detail, status_code=error.status_code, headers=error.headers)


@app.exception_handler(RequestValidationError)
async def validation_error(_: Request, error: RequestValidationError) -> JSONResponse:
    return JSONResponse(
        {"code": "INVALID_REQUEST", "message": "请求字段或类型不符合接口要求", "details": error.errors()},
        status_code=422,
    )


@app.exception_handler(Exception)
async def unexpected_error(request: Request, error: Exception) -> JSONResponse:
    logger.exception(
        "Unhandled API error for %s %s",
        request.method,
        request.url.path,
        exc_info=error,
    )
    return JSONResponse(
        {"code": "INTERNAL_ERROR", "message": "服务暂时不可用，请稍后重试"},
        status_code=500,
    )


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "camera-trace-api"}


@app.get("/api/jobs")
def list_jobs(
    status: str | None = Query(default=None, pattern="^(uploaded|validating|queued|reconstructing|packaging|succeeded|failed)$"),
    limit: int = Query(default=20, ge=1, le=100),
    cursor: str | None = None,
) -> dict[str, Any]:
    JOB_ROOT.mkdir(parents=True, exist_ok=True)
    records = state_store().list_jobs(status)
    if cursor:
        cursor_key = decode_cursor(cursor)
        records = [
            record for record in records
            if (record["createdAt"], record["id"]) < cursor_key
        ]
    page = records[:limit]
    response = {"items": [public_job(item) for item in page]}
    if len(records) > limit and page:
        response["nextCursor"] = encode_cursor(page[-1])
    return response


@app.post("/api/jobs", status_code=201)
async def create_job(video: UploadFile = File(...)) -> dict[str, Any]:
    job_id = f"vtc_{uuid.uuid4().hex[:12]}"
    suffix = Path(video.filename or "").suffix.lower()
    upload_path = UPLOAD_ROOT / f"{job_id}{suffix}"
    size = await save_upload(video, upload_path, CONFIG.max_upload_mb * 1024 * 1024, VIDEO_SUFFIXES)
    job = {
        "id": job_id,
        "status": "uploaded",
        "createdAt": utc_now(),
        "source": empty_source(Path(video.filename or "video").name, size),
        "progress": {"percent": 5, "stageLabel": "视频已安全上传"},
        "robotExecutionReady": False,
        "artifacts": [],
    }
    save_job(job)
    job_futures[job_id] = executor.submit(run_job, job_id, upload_path)
    return job


@app.get("/api/jobs/{job_id}")
def get_job(job_id: str) -> dict[str, Any]:
    return public_job(read_job(job_id))


@app.post("/api/jobs/{job_id}/cancel")
def cancel_job(job_id: str) -> dict[str, Any]:
    job = read_job(job_id)
    future = job_futures.get(job_id)
    if job["status"] in {"succeeded", "failed"} or future is None or not future.cancel():
        raise HTTPException(409, detail={"code": "JOB_NOT_CANCELLABLE", "message": "任务已经运行或结束，不能安全取消"})
    fail_job(job_id, "CANCELLED", "任务已由用户取消")
    return get_job(job_id)


def archive_for_job(job_id: str) -> tuple[dict[str, Any], Path]:
    job = read_job(job_id)
    if job.get("status") != "succeeded" or not job.get("archivePath"):
        raise HTTPException(409, detail={"code": "JOB_NOT_READY", "message": "任务结果尚未就绪"})
    archive = Path(job["archivePath"])
    if not archive.is_file():
        raise HTTPException(410, detail={"code": "RESULT_EXPIRED", "message": "任务结果已经过期"})
    return job, archive


@app.get("/api/jobs/{job_id}/dataset")
def download_dataset(job_id: str) -> FileResponse:
    _, archive = archive_for_job(job_id)
    return FileResponse(archive, media_type="application/zip", filename=archive.name)


@app.get("/api/jobs/{job_id}/artifacts/{name}")
def download_artifact(job_id: str, name: str) -> Response:
    if name not in {"camera_pose_stamped.jsonl", "camera_trajectory.csv", "camera_cartesian_trajectory.json", "manifest.json"}:
        raise HTTPException(404, detail={"code": "ARTIFACT_NOT_FOUND", "message": "输出文件不存在"})
    _, archive = archive_for_job(job_id)
    with zipfile.ZipFile(archive) as dataset:
        try:
            content = dataset.read(name)
        except KeyError as error:
            raise HTTPException(404, detail={"code": "ARTIFACT_NOT_FOUND", "message": "输出文件不存在"}) from error
    media = "application/json" if name.endswith(".json") else "text/plain; charset=utf-8"
    return Response(content, media_type=media, headers={"Content-Disposition": f'attachment; filename="{name}"'})


@app.get("/api/jobs/{job_id}/trajectory")
def get_trajectory(job_id: str) -> dict[str, Any]:
    _, archive = archive_for_job(job_id)
    try:
        return trajectory_payload(load_trajectory(archive), job_id)
    except (OSError, ValueError, zipfile.BadZipFile) as error:
        raise HTTPException(422, detail={"code": "INVALID_TRAJECTORY", "message": str(error)}) from error


@app.post("/api/trajectories/parse")
async def parse_trajectory(trajectory: UploadFile = File(...)) -> dict[str, Any]:
    identifier = f"upload_{uuid.uuid4().hex[:12]}"
    suffix = Path(trajectory.filename or "").suffix.lower()
    temporary = UPLOAD_ROOT / f"{identifier}{suffix}"
    await save_upload(trajectory, temporary, TRAJECTORY_MAX_BYTES, TRAJECTORY_SUFFIXES)
    try:
        return trajectory_payload(load_trajectory(temporary), identifier)
    except (OSError, ValueError, zipfile.BadZipFile) as error:
        raise HTTPException(422, detail={"code": "INVALID_TRAJECTORY", "message": str(error)}) from error
    finally:
        temporary.unlink(missing_ok=True)


def run_visualization(identifier: str, source: Path, fps: float, speed: float) -> None:
    started_at = time.monotonic()
    logger.info(
        "visualization_started visualization_id=%s fps=%s speed=%s",
        identifier,
        fps,
        speed,
    )
    try:
        update_visualization_state(identifier, status="rendering", progressPercent=25)
        trajectory = load_trajectory(source)
        output = VISUALIZATION_ROOT / identifier / "camera_trajectory_multiview.mp4"
        render_video(trajectory, output, fps=fps, speed=speed, dpi=90)
        update_visualization_state(
            identifier,
            status="succeeded",
            progressPercent=100,
            previewUrl=f"/api/visualizations/{identifier}/video",
            downloadUrl=f"/api/visualizations/{identifier}/video?download=1",
            outputPath=str(output),
            completedAt=utc_now(),
        )
        logger.info(
            "visualization_succeeded visualization_id=%s duration_s=%.3f",
            identifier,
            time.monotonic() - started_at,
        )
    except (OSError, ValueError, zipfile.BadZipFile) as error:
        update_visualization_state(
            identifier,
            status="failed",
            progressPercent=100,
            error={"code": "INVALID_TRAJECTORY", "message": str(error)},
            completedAt=utc_now(),
        )
        logger.warning(
            "visualization_rejected visualization_id=%s duration_s=%.3f message=%s",
            identifier,
            time.monotonic() - started_at,
            error,
        )
    except Exception:
        logger.exception(
            "visualization_failed visualization_id=%s duration_s=%.3f",
            identifier,
            time.monotonic() - started_at,
        )
        update_visualization_state(
            identifier,
            status="failed",
            progressPercent=100,
            error={"code": "RENDER_FAILED", "message": "视频渲染失败，请稍后重试"},
            completedAt=utc_now(),
        )
    finally:
        source.unlink(missing_ok=True)


@app.post("/api/visualizations", status_code=201)
async def create_visualization(
    trajectory: UploadFile = File(...), fps: float = Form(24), speed: float = Form(1),
) -> dict[str, Any]:
    if not 10 <= fps <= 60 or not 0.25 <= speed <= 4:
        raise HTTPException(422, detail={"code": "INVALID_RENDER_OPTIONS", "message": "FPS 或播放速度超出范围"})
    identifier = f"viz_{uuid.uuid4().hex[:12]}"
    suffix = Path(trajectory.filename or "").suffix.lower()
    source = UPLOAD_ROOT / f"{identifier}{suffix}"
    await save_upload(trajectory, source, TRAJECTORY_MAX_BYTES, TRAJECTORY_SUFFIXES)
    state = {
        "id": identifier,
        "status": "queued",
        "progressPercent": 0,
        "createdAt": utc_now(),
    }
    visualization_states[identifier] = state
    save_visualization_state(state)
    executor.submit(run_visualization, identifier, source, fps, speed)
    return state


@app.get("/api/visualizations/{identifier}")
def get_visualization(identifier: str) -> dict[str, Any]:
    state = read_visualization_state(identifier)
    return {key: value for key, value in state.items() if key != "outputPath"}


@app.get("/api/visualizations/{identifier}/video")
def visualization_video(identifier: str, download: int = 0) -> FileResponse:
    state = read_visualization_state(identifier)
    output = Path(state.get("outputPath", ""))
    if output is None or not output.is_file():
        raise HTTPException(404, detail={"code": "VIDEO_NOT_FOUND", "message": "可视化视频尚未就绪"})
    return FileResponse(output, media_type="video/mp4", filename=output.name if download else None)


frontend_dist = CONFIG.project_root / "frontend" / "dist"
if frontend_dist.is_dir():
    app.mount("/", StaticFiles(directory=frontend_dist, html=True), name="frontend")
