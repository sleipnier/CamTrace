#!/usr/bin/env python3
"""Render a camera trajectory dataset as a synchronized multi-view MP4."""

from __future__ import annotations

import argparse
import math
from pathlib import Path

import numpy as np

from visualize_camera_trajectory import CameraTrajectory, load_trajectory, quaternion_xyzw_to_matrix


VIEW_SPECS = (
    ("Perspective", 24, -58),
    ("XY projection", 90, -90),
    ("XZ projection", 0, -90),
    ("YZ projection", 0, 0),
)


def playback_indexes(times_s: np.ndarray, fps: float, speed: float) -> np.ndarray:
    """Map fixed-rate video frames to the nearest source trajectory records."""
    times = np.asarray(times_s, dtype=np.float64)
    if times.ndim != 1 or len(times) == 0 or not np.all(np.isfinite(times)):
        raise ValueError("Trajectory times must be a non-empty finite one-dimensional array")
    if np.any(np.diff(times) < 0):
        raise ValueError("Trajectory times must be non-decreasing")
    if not np.isfinite(fps) or fps <= 0:
        raise ValueError("Video FPS must be finite and greater than zero")
    if not np.isfinite(speed) or speed <= 0:
        raise ValueError("Playback speed must be finite and greater than zero")

    relative_times = times - times[0]
    duration = float(relative_times[-1])
    if duration <= 0:
        return np.array([len(times) - 1], dtype=np.int64)

    video_duration = duration / speed
    interval_count = math.ceil(video_duration * fps - 1e-9 * max(1.0, video_duration * fps))
    sample_times = np.arange(interval_count, dtype=np.float64) / fps * speed
    sample_times = np.append(sample_times, duration)
    right = np.searchsorted(relative_times, sample_times, side="left")
    right = np.clip(right, 0, len(times) - 1)
    left = np.maximum(right - 1, 0)
    use_left = np.abs(sample_times - relative_times[left]) <= np.abs(relative_times[right] - sample_times)
    indexes = np.where(use_left, left, right).astype(np.int64)
    indexes[-1] = len(times) - 1
    return indexes


def camera_geometry(
    position: np.ndarray,
    quaternion_xyzw: np.ndarray,
    size: float,
) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
    """Return world-space frustum corners, forward point, and XYZ endpoints."""
    if not np.isfinite(size) or size <= 0:
        raise ValueError("Camera size must be finite and greater than zero")
    origin = np.asarray(position, dtype=np.float64)
    if origin.shape != (3,) or not np.all(np.isfinite(origin)):
        raise ValueError("Camera position must contain three finite values")
    rotation = quaternion_xyzw_to_matrix(quaternion_xyzw)
    local_corners = size * np.array(
        [[-0.7, -0.5, 1.0], [0.7, -0.5, 1.0], [0.7, 0.5, 1.0], [-0.7, 0.5, 1.0]]
    )
    corners = origin + local_corners @ rotation.T
    forward = origin + rotation[:, 2] * size * 1.35
    axis_endpoints = origin + rotation.T * size * 0.9
    return corners, forward, axis_endpoints


def _frustum_polyline(origin: np.ndarray, corners: np.ndarray) -> np.ndarray:
    segments = [np.vstack((origin, corner)) for corner in corners]
    segments.append(np.vstack((corners, corners[0])))
    separator = np.full((1, 3), np.nan)
    return np.vstack([np.vstack((segment, separator)) for segment in segments])


def _set_scene(axis: object, positions: np.ndarray, camera_size: float) -> None:
    minimum = positions.min(axis=0)
    maximum = positions.max(axis=0)
    center = (minimum + maximum) / 2
    radius = max(float(np.max(maximum - minimum)) / 2 + camera_size * 1.7, camera_size * 2)
    axis.set_xlim(center[0] - radius, center[0] + radius)
    axis.set_ylim(center[1] - radius, center[1] + radius)
    axis.set_zlim(center[2] - radius, center[2] + radius)
    axis.set_box_aspect((1, 1, 1))


def render_video(
    trajectory: CameraTrajectory,
    output: str | Path,
    *,
    fps: float = 30.0,
    speed: float = 1.0,
    dpi: int = 120,
    title: str | None = None,
) -> Path:
    try:
        import matplotlib

        matplotlib.use("Agg")
        import matplotlib.pyplot as plt
        from matplotlib.animation import FFMpegWriter, FuncAnimation, writers
    except ImportError as error:
        raise RuntimeError("Matplotlib is required; install dependencies with: pip install -r requirements.txt") from error

    destination = Path(output)
    if destination.suffix.lower() != ".mp4":
        raise ValueError("Output must use the .mp4 extension")
    if dpi <= 0:
        raise ValueError("DPI must be greater than zero")
    if not writers.is_available("ffmpeg"):
        raise RuntimeError("ffmpeg is required to render MP4 video")

    positions = trajectory.positions
    span = float(np.max(np.ptp(positions, axis=0)))
    camera_size = max(span * 0.075, 0.03)
    indexes = playback_indexes(trajectory.times_s, fps, speed)

    display_title = title or "Camera trajectory replay"
    figure = plt.figure(figsize=(14, 8), facecolor="#08111f")
    figure.suptitle(
        display_title,
        color="#f8fafc",
        fontsize=16,
        fontweight="bold",
        y=0.975,
    )
    figure.text(
        0.5,
        0.015,
        "Camera-to-parent pose, OpenCV optical axes (+X right, +Y down, +Z forward) - not a robot command",
        ha="center",
        color="#94a3b8",
        fontsize=9,
    )

    scenes = []
    for plot_number, (view_name, elevation, azimuth) in enumerate(VIEW_SPECS, start=1):
        axis = figure.add_subplot(2, 2, plot_number, projection="3d", facecolor="#0f1b2d")
        axis.plot(
            positions[:, 0],
            positions[:, 1],
            positions[:, 2],
            color="#334155",
            linewidth=1.0,
            alpha=0.7,
        )
        progress_line, = axis.plot([], [], [], color="#38bdf8", linewidth=2.4)
        frustum_line, = axis.plot([], [], [], color="#f59e0b", linewidth=1.5)
        forward_line, = axis.plot([], [], [], color="#f8fafc", linewidth=2.0)
        current_point, = axis.plot([], [], [], marker="o", color="#f59e0b", markersize=5)
        coordinate_lines = [
            axis.plot([], [], [], color=color, linewidth=2.0)[0]
            for color in ("#ef4444", "#22c55e", "#3b82f6")
        ]
        axis.scatter(*positions[0], color="#22c55e", s=24, depthshade=False)
        axis.scatter(*positions[-1], color="#ef4444", s=24, depthshade=False)
        status = axis.text2D(0.03, 0.93, "", transform=axis.transAxes, color="#cbd5e1", fontsize=8)

        axis.set_title(view_name, color="#f8fafc", fontsize=11, pad=4)
        axis.set_xlabel(f"X ({trajectory.length_unit})", color="#94a3b8", fontsize=8)
        axis.set_ylabel(f"Y ({trajectory.length_unit})", color="#94a3b8", fontsize=8)
        axis.set_zlabel(f"Z ({trajectory.length_unit})", color="#94a3b8", fontsize=8)
        axis.tick_params(colors="#64748b", labelsize=7)
        axis.grid(True, color="#334155", alpha=0.35)
        for pane in (axis.xaxis.pane, axis.yaxis.pane, axis.zaxis.pane):
            pane.set_facecolor((0.06, 0.11, 0.18, 1.0))
            pane.set_edgecolor("#334155")
        axis.view_init(elev=elevation, azim=azimuth)
        _set_scene(axis, positions, camera_size)
        scenes.append((progress_line, frustum_line, forward_line, current_point, coordinate_lines, status))

    figure.subplots_adjust(left=0.02, right=0.98, bottom=0.07, top=0.92, wspace=0.02, hspace=0.16)

    def update(source_index: int) -> list[object]:
        origin = positions[source_index]
        corners, forward, axis_endpoints = camera_geometry(
            origin,
            trajectory.quaternions_xyzw[source_index],
            camera_size,
        )
        frustum = _frustum_polyline(origin, corners)
        updated = []
        for progress, frustum_line, forward_line, point, coordinate_lines, status in scenes:
            progress.set_data_3d(
                positions[: source_index + 1, 0],
                positions[: source_index + 1, 1],
                positions[: source_index + 1, 2],
            )
            frustum_line.set_data_3d(frustum[:, 0], frustum[:, 1], frustum[:, 2])
            forward_line.set_data_3d(
                [origin[0], forward[0]], [origin[1], forward[1]], [origin[2], forward[2]]
            )
            point.set_data_3d([origin[0]], [origin[1]], [origin[2]])
            for endpoint, coordinate_line in zip(axis_endpoints, coordinate_lines):
                coordinate_line.set_data_3d(
                    [origin[0], endpoint[0]], [origin[1], endpoint[1]], [origin[2], endpoint[2]]
                )
            status.set_text(
                f"frame {int(trajectory.frame_indexes[source_index])} / "
                f"{int(trajectory.frame_indexes[-1])}    t={trajectory.times_s[source_index]:.2f}s"
            )
            updated.extend((progress, frustum_line, forward_line, point, *coordinate_lines, status))
        return updated

    destination.parent.mkdir(parents=True, exist_ok=True)
    animation = FuncAnimation(figure, update, frames=indexes, interval=1000 / fps, blit=False, repeat=False)
    writer = FFMpegWriter(
        fps=fps,
        codec="libx264",
        bitrate=-1,
        metadata={"title": display_title, "artist": "Video to Camera"},
        extra_args=["-crf", "20", "-pix_fmt", "yuv420p"],
    )
    animation.save(destination, writer=writer, dpi=dpi)
    plt.close(figure)
    print(f"Rendered {len(indexes)} video frames to {destination}")
    return destination


def parser() -> argparse.ArgumentParser:
    command = argparse.ArgumentParser(description=__doc__)
    command.add_argument("input", type=Path, help="Dataset ZIP, extracted directory, JSON, JSONL, or CSV")
    command.add_argument("--output", type=Path, default=Path("camera_trajectory_multiview.mp4"))
    command.add_argument("--fps", type=float, default=30.0, help="Output video frame rate (default: 30)")
    command.add_argument("--speed", type=float, default=1.0, help="Playback speed multiplier (default: 1)")
    command.add_argument("--dpi", type=int, default=120, help="Rendering resolution scale (default: 120)")
    command.add_argument("--title", help="Custom video title")
    return command


def main() -> None:
    args = parser().parse_args()
    trajectory = load_trajectory(args.input)
    render_video(
        trajectory,
        args.output,
        fps=args.fps,
        speed=args.speed,
        dpi=args.dpi,
        title=args.title,
    )


if __name__ == "__main__":
    main()
