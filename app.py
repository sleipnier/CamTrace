#!/usr/bin/env python3
"""Gradio upload UI for HyperAI deployment."""

from __future__ import annotations

import os

import gradio as gr

from service import ServiceConfig, ServiceError, build_dataset, cleanup_results


CONFIG = ServiceConfig.from_env()


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


def create_app() -> gr.Blocks:
    with gr.Blocks(title="Video to Camera Dataset") as demo:
        gr.Markdown(
            "# Video to Camera Dataset\n"
            "Upload an 8-1000 frame video. The GPU reconstructs camera motion and returns "
            "PoseStamped JSONL, CSV, Cartesian trajectory JSON, and a checksum manifest."
        )
        video = gr.File(label="Source video", file_types=["video"], type="filepath")
        start = gr.Button("Build dataset", variant="primary")
        status = gr.Textbox(label="Status", interactive=False)
        dataset = gr.File(label="Camera dataset ZIP", interactive=False)
        start.click(process_video, inputs=video, outputs=[status, dataset])
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
