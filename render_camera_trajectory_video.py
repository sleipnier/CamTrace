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


def estimate_view_target(trajectory: CameraTrajectory) -> tuple[np.ndarray, bool]:
    """Estimate the common optical-axis intersection, with a finite fallback."""
    positions = trajectory.positions
    directions = np.asarray(
        [quaternion_xyzw_to_matrix(quaternion)[:, 2] for quaternion in trajectory.quaternions_xyzw]
    )
    projectors = np.eye(3) - directions[:, :, None] * directions[:, None, :]
    system = projectors.sum(axis=0)
    right_hand_side = np.einsum("nij,nj->i", projectors, positions)
    singular_values = np.linalg.eigvalsh(system)
    candidate = np.linalg.lstsq(system, right_hand_side, rcond=None)[0]

    offsets = candidate - positions
    distances = np.linalg.norm(offsets, axis=1)
    depths = np.einsum("ij,ij->i", directions, offsets)
    span = float(np.max(np.ptp(positions, axis=0)))
    scale = span if span > 0 else 1.0
    relative_epsilon = scale * 1e-9
    valid_distance = distances > relative_epsilon
    angular_errors = np.full(len(positions), np.inf)
    angular_errors[valid_distance] = np.arccos(
        np.clip(depths[valid_distance] / distances[valid_distance], -1.0, 1.0)
    )
    well_conditioned = singular_values[-1] > 0 and singular_values[0] / singular_values[-1] >= 1e-4
    reliable = bool(
        well_conditioned
        and np.all(depths > relative_epsilon)
        and np.median(angular_errors) <= np.deg2rad(25)
        and np.all(np.isfinite(candidate))
    )
    if reliable:
        return candidate, True

    average_direction = directions.mean(axis=0)
    norm = np.linalg.norm(average_direction)
    average_direction = average_direction / norm if norm > np.finfo(np.float64).eps else directions[0]
    fallback_depth = span * 2.0 if span > 0 else 1.0
    return np.median(positions, axis=0) + average_direction * fallback_depth, False


def target_in_camera(
    position: np.ndarray,
    quaternion_xyzw: np.ndarray,
    target: np.ndarray,
) -> np.ndarray:
    """Transform a parent-frame target into the OpenCV camera frame."""
    origin = np.asarray(position, dtype=np.float64)
    target_point = np.asarray(target, dtype=np.float64)
    if origin.shape != (3,) or target_point.shape != (3,):
        raise ValueError("Camera position and target must contain three values")
    if not np.all(np.isfinite(origin)) or not np.all(np.isfinite(target_point)):
        raise ValueError("Camera position and target must be finite")
    rotation = quaternion_xyzw_to_matrix(quaternion_xyzw)
    return rotation.T @ (target_point - origin)


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
        from matplotlib.lines import Line2D
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
    view_target, target_reliable = estimate_view_target(trajectory)

    display_title = title or "Camera trajectory replay"
    figure = plt.figure(figsize=(16, 9), facecolor="#08111f")
    figure.suptitle(
        display_title,
        color="#f8fafc",
        fontsize=16,
        fontweight="bold",
        y=0.985,
    )
    legend = figure.legend(
        handles=[
            Line2D([0], [0], color="#334155", linewidth=2, label="Full route"),
            Line2D([0], [0], color="#38bdf8", linewidth=2.4, label="Traveled route"),
            Line2D([0], [0], marker="o", color="none", markerfacecolor="#22c55e", label="Start"),
            Line2D([0], [0], marker="o", color="none", markerfacecolor="#ef4444", label="End"),
            Line2D([0], [0], marker="o", color="none", markerfacecolor="#f59e0b", label="Current camera"),
            Line2D([0], [0], color="#f8fafc", linewidth=2, label="Viewing direction"),
            Line2D([0], [0], marker="*", color="none", markerfacecolor="#d946ef", label="Target proxy"),
        ],
        loc="upper center",
        bbox_to_anchor=(0.5, 0.955),
        ncol=7,
        frameon=True,
        fontsize=8,
    )
    legend.get_frame().set_facecolor("#0f1b2d")
    legend.get_frame().set_edgecolor("#334155")
    for text in legend.get_texts():
        text.set_color("#cbd5e1")
    figure.text(
        0.5,
        0.015,
        "Target is inferred from optical axes, not object detection. X red, Y green, Z blue - not a robot command",
        ha="center",
        color="#94a3b8",
        fontsize=9,
    )

    scenes = []
    for plot_number, (view_name, elevation, azimuth) in enumerate(VIEW_SPECS, start=1):
        axis = figure.add_subplot(2, 3, plot_number, projection="3d", facecolor="#0f1b2d")
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
        target_line, = axis.plot([], [], [], color="#d946ef", linewidth=1.0, linestyle="--", alpha=0.8)
        current_point, = axis.plot([], [], [], marker="o", color="#f59e0b", markersize=5)
        coordinate_lines = [
            axis.plot([], [], [], color=color, linewidth=2.0)[0]
            for color in ("#ef4444", "#22c55e", "#3b82f6")
        ]
        axis.scatter(*positions[0], color="#22c55e", s=24, depthshade=False)
        axis.scatter(*positions[-1], color="#ef4444", s=24, depthshade=False)
        axis.scatter(*view_target, color="#d946ef", marker="*", s=60, depthshade=False)
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
        _set_scene(axis, np.vstack((positions, view_target)), camera_size)
        scenes.append(
            (progress_line, frustum_line, forward_line, target_line, current_point, coordinate_lines, status)
        )

    pov_axis = figure.add_subplot(2, 3, 5, facecolor="#0f1b2d")
    pov_axis.set_title("Camera POV - target proxy", color="#f8fafc", fontsize=11, pad=4)
    pov_axis.set_xlim(-1.25, 1.25)
    pov_axis.set_ylim(0.9, -0.9)
    pov_axis.set_aspect("equal")
    pov_axis.axvline(0, color="#475569", linewidth=0.8)
    pov_axis.axhline(0, color="#475569", linewidth=0.8)
    pov_axis.grid(True, color="#334155", alpha=0.3)
    pov_axis.tick_params(colors="#64748b", labelsize=7)
    pov_axis.set_xlabel("normalized image X", color="#94a3b8", fontsize=8)
    pov_axis.set_ylabel("normalized image Y (down)", color="#94a3b8", fontsize=8)
    pov_target, = pov_axis.plot([], [], marker="*", color="#d946ef", markersize=14)
    pov_status = pov_axis.text(
        0.03, 0.95, "", transform=pov_axis.transAxes, va="top", color="#cbd5e1", fontsize=9
    )

    info_axis = figure.add_subplot(2, 3, 6, facecolor="#0f1b2d")
    info_axis.axis("off")
    confidence = "optical-axis convergence" if target_reliable else "low-confidence forward fallback"
    info_axis.text(
        0.04,
        0.94,
        "Estimated photographed target",
        transform=info_axis.transAxes,
        va="top",
        color="#f8fafc",
        fontsize=13,
        fontweight="bold",
    )
    info_axis.text(
        0.04,
        0.82,
        f"X  {view_target[0]: .4f}\nY  {view_target[1]: .4f}\nZ  {view_target[2]: .4f}\n"
        f"unit  {trajectory.length_unit}\nquality  {confidence}\n\n"
        "The purple star is a geometric proxy inferred\n"
        "from camera optical axes. CSV data contains no\n"
        "pixels, object labels, depth map, or point cloud.",
        transform=info_axis.transAxes,
        va="top",
        color="#cbd5e1",
        fontsize=10,
        linespacing=1.55,
    )

    figure.subplots_adjust(left=0.035, right=0.985, bottom=0.07, top=0.89, wspace=0.13, hspace=0.18)

    def update(source_index: int) -> list[object]:
        origin = positions[source_index]
        corners, forward, axis_endpoints = camera_geometry(
            origin,
            trajectory.quaternions_xyzw[source_index],
            camera_size,
        )
        frustum = _frustum_polyline(origin, corners)
        updated = []
        for progress, frustum_line, forward_line, target_line, point, coordinate_lines, status in scenes:
            progress.set_data_3d(
                positions[: source_index + 1, 0],
                positions[: source_index + 1, 1],
                positions[: source_index + 1, 2],
            )
            frustum_line.set_data_3d(frustum[:, 0], frustum[:, 1], frustum[:, 2])
            forward_line.set_data_3d(
                [origin[0], forward[0]], [origin[1], forward[1]], [origin[2], forward[2]]
            )
            target_line.set_data_3d(
                [origin[0], view_target[0]],
                [origin[1], view_target[1]],
                [origin[2], view_target[2]],
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
            updated.extend(
                (progress, frustum_line, forward_line, target_line, point, *coordinate_lines, status)
            )

        target_camera = target_in_camera(
            origin,
            trajectory.quaternions_xyzw[source_index],
            view_target,
        )
        if target_camera[2] > 1e-9:
            normalized_x = target_camera[0] / target_camera[2]
            normalized_y = target_camera[1] / target_camera[2]
            pov_target.set_data([normalized_x], [normalized_y])
            visibility = "in front" if abs(normalized_x) <= 1.25 and abs(normalized_y) <= 0.9 else "outside virtual frame"
            pov_status.set_text(
                f"target: u={normalized_x:+.2f}, v={normalized_y:+.2f}\n"
                f"depth={target_camera[2]:.3f} {trajectory.length_unit} ({visibility})"
            )
        else:
            pov_target.set_data([], [])
            pov_status.set_text("target proxy is behind this camera")
        updated.extend((pov_target, pov_status))
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
