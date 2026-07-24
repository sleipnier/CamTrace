#!/usr/bin/env python3
"""Gradio upload UI for HyperAI deployment."""

from __future__ import annotations

import os
import shutil
import uuid
import zipfile
from pathlib import Path

import gradio as gr
import numpy as np

from render_camera_trajectory_video import render_video
from service import ServiceConfig, ServiceError, build_dataset, cleanup_results
from visualize_camera_trajectory import load_trajectory


CONFIG = ServiceConfig.from_env()
VISUALIZATION_SUFFIXES = {".zip", ".csv", ".json", ".jsonl"}
VISUALIZATION_MAX_BYTES = 25 * 1024 * 1024


def process_video(video_path: str | None) -> tuple[str, str | None]:
    if not video_path:
        return "Select one video before starting.", None
    try:
        archive, status = build_dataset(video_path, CONFIG)
        return status, str(archive)
    except ServiceError as error:
        return str(error), None
    except Exception:
        import logging

        logging.exception("Unexpected dataset service error")
        return "Unexpected service error. Check the container logs.", None


def render_visualization(
    dataset_path: str | None,
    fps: float,
    speed: float,
    target_x: float | None = None,
    target_y: float | None = None,
    target_z: float | None = None,
) -> tuple[str, str | None, str | None]:
    if not dataset_path:
        return "Select a trajectory dataset before rendering.", None, None

    source = Path(dataset_path)
    result_dir: Path | None = None
    try:
        if source.is_symlink() or not source.is_file():
            raise ServiceError("Visualization input must be a regular file")
        if source.suffix.lower() not in VISUALIZATION_SUFFIXES:
            raise ServiceError("Upload a dataset ZIP, CSV, JSON, or JSONL file")
        if source.stat().st_size > VISUALIZATION_MAX_BYTES:
            raise ServiceError("Visualization input must not exceed 25 MB")
        if source.suffix.lower() == ".zip":
            with zipfile.ZipFile(source) as archive:
                try:
                    member = archive.getinfo("camera_cartesian_trajectory.json")
                except KeyError as error:
                    raise ServiceError("Dataset ZIP is missing camera_cartesian_trajectory.json") from error
                if member.file_size > VISUALIZATION_MAX_BYTES:
                    raise ServiceError("Trajectory data inside the ZIP must not exceed 25 MB")

        trajectory = load_trajectory(source)
        if len(trajectory.positions) > CONFIG.max_frames:
            raise ServiceError(f"Trajectory must contain at most {CONFIG.max_frames} poses")
        target_values = (target_x, target_y, target_z)
        if any(value is not None for value in target_values) and not all(
            value is not None for value in target_values
        ):
            raise ServiceError("Enter all three target XYZ values, or leave all three empty")
        target_xyz = None if target_x is None else np.asarray(target_values, dtype=np.float64)
        if target_xyz is not None and not np.all(np.isfinite(target_xyz)):
            raise ServiceError("Target XYZ values must be finite")

        cleanup_results(CONFIG)
        result_dir = CONFIG.runtime_root / "results" / f"visualization-{uuid.uuid4().hex}"
        output = result_dir / "camera_trajectory_multiview.mp4"
        render_video(
            trajectory,
            output,
            fps=float(fps),
            speed=float(speed),
            dpi=90,
            target_xyz=target_xyz,
        )
        status = f"Rendered {len(trajectory.positions)} poses at {float(speed):g}x playback speed"
        return status, str(output), str(output)
    except ServiceError as error:
        return str(error), None, None
    except (OSError, TypeError, ValueError, RuntimeError, zipfile.BadZipFile) as error:
        if result_dir is not None:
            shutil.rmtree(result_dir, ignore_errors=True)
        return f"Visualization failed: {error}", None, None


def create_app() -> gr.Blocks:
    with gr.Blocks(title="Video to Camera Dataset") as demo:
        gr.Markdown(
            "# Video to Camera Dataset\n"
            "Reconstruct camera motion from video, or turn an existing trajectory dataset into a "
            "synchronized multi-view MP4."
        )
        with gr.Tab("Build dataset / 生成数据集"):
            gr.Markdown(
                "Upload an 8-1000 frame video. The GPU returns PoseStamped JSONL, CSV, "
                "Cartesian trajectory JSON, and a checksum manifest."
            )
            video = gr.File(label="Source video / 源视频", file_types=["video"], type="filepath")
            start = gr.Button("Build dataset / 生成数据集", variant="primary")
            status = gr.Textbox(label="Status / 状态", interactive=False)
            dataset = gr.File(label="Camera dataset ZIP / 相机数据集", interactive=False)
            start.click(process_video, inputs=video, outputs=[status, dataset])

        with gr.Tab("Visualize trajectory / 轨迹可视化"):
            gr.Markdown(
                "Upload a generated ZIP or `camera_trajectory.csv` to render Perspective, XY, XZ, "
                "and YZ views. This shows camera motion only, not robot links or executable commands."
            )
            gr.Markdown(
                "**Legend / 图例**  \n"
                "<span style='color:#22c55e'>●</span> Start / 起点　"
                "<span style='color:#ef4444'>●</span> End / 终点　"
                "<span style='color:#334155'>━</span> Full route / 完整路线　"
                "<span style='color:#38bdf8'>━</span> Traveled route / 已行进路线　"
                "<span style='color:#f59e0b'>●</span> Current camera / 当前镜头  \n"
                "<span style='color:#0891b2'>■</span> Asymmetric target / 不对称目标模型　"
                "White line / 白线: viewing direction / 镜头朝向。"
                "Short axes / 短轴: <span style='color:#ef4444'>X red</span>, "
                "<span style='color:#22c55e'>Y green</span>, "
                "<span style='color:#3b82f6'>Z blue</span>.  \n"
                "`Camera POV` projects a deterministic Python model. Its red nose is the FRONT; "
                "the pink side fin and offset green antenna reveal rotation during a 360-degree orbit."
            )
            trajectory_file = gr.File(
                label="Trajectory dataset / 轨迹数据",
                file_types=[".zip", ".csv", ".json", ".jsonl"],
                type="filepath",
            )
            with gr.Row():
                render_fps = gr.Slider(10, 60, value=24, step=1, label="Video FPS / 视频帧率")
                render_speed = gr.Slider(0.25, 4, value=1, step=0.25, label="Playback speed / 播放速度")
            gr.Markdown(
                "Optional target center / 可选目标中心：留空时按镜头光轴估算；已知坐标时填写完整 XYZ。"
            )
            with gr.Row():
                target_x = gr.Number(value=None, label="Target X")
                target_y = gr.Number(value=None, label="Target Y")
                target_z = gr.Number(value=None, label="Target Z")
            render = gr.Button("Render video / 生成可视化视频", variant="primary")
            render_status = gr.Textbox(label="Status / 状态", interactive=False)
            preview = gr.Video(label="Multi-view preview / 多视角预览", interactive=False)
            download = gr.File(label="Download MP4 / 下载视频", interactive=False)
            render.click(
                render_visualization,
                inputs=[trajectory_file, render_fps, render_speed, target_x, target_y, target_z],
                outputs=[render_status, preview, download],
            )
    return demo


def main() -> None:
    username = os.environ.get("VTC_AUTH_USER")
    password = os.environ.get("VTC_AUTH_PASSWORD")
    if not username or not password:
        raise SystemExit("VTC_AUTH_USER and VTC_AUTH_PASSWORD are required")
    CONFIG.runtime_root.mkdir(parents=True, exist_ok=True)
    cleanup_results(CONFIG)
    demo = create_app()
    demo.queue(
        default_concurrency_limit=1,
        max_size=int(os.environ.get("VTC_QUEUE_MAX_SIZE", "8")),
    ).launch(
        server_name=os.environ.get("VTC_HOST", "0.0.0.0"),
        server_port=int(os.environ.get("VTC_PORT", "7860")),
        share=False,
        auth=(username, password),
        allowed_paths=[str(CONFIG.runtime_root / "results")],
        blocked_paths=[str(CONFIG.megasam_root), str(CONFIG.runtime_root / "tasks")],
        max_file_size=f"{CONFIG.max_upload_mb}mb",
    )


if __name__ == "__main__":
    main()
