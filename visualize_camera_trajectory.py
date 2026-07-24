#!/usr/bin/env python3
"""Visualize a Video to Camera dataset as a 3D camera trajectory."""

from __future__ import annotations

import argparse
import csv
import json
import zipfile
from dataclasses import dataclass
from pathlib import Path

import numpy as np


@dataclass(frozen=True)
class CameraTrajectory:
    positions: np.ndarray
    quaternions_xyzw: np.ndarray
    frame_indexes: np.ndarray
    times_s: np.ndarray
    frame_id: str
    length_unit: str


def _trajectory_from_cartesian(payload: dict[str, object]) -> CameraTrajectory:
    if payload.get("type") != "cartesian_trajectory":
        raise ValueError("JSON is not a cartesian_trajectory dataset")
    points = payload.get("points")
    if not isinstance(points, list) or not points:
        raise ValueError("Cartesian trajectory has no points")
    units = payload.get("units")
    length_unit = units.get("length", "unknown") if isinstance(units, dict) else "unknown"
    return _validated_trajectory(
        positions=[point["position_xyz"] for point in points],
        quaternions=[point["orientation_xyzw"] for point in points],
        frame_indexes=[point["frame_index"] for point in points],
        times=[point["time_from_start_s"] for point in points],
        frame_id=str(payload.get("frame_id", "unknown")),
        length_unit=str(length_unit),
    )


def _trajectory_from_jsonl(text: str) -> CameraTrajectory:
    records = [json.loads(line) for line in text.splitlines() if line.strip()]
    if not records:
        raise ValueError("PoseStamped JSONL has no records")
    first = records[0]
    return _validated_trajectory(
        positions=[[record["pose"]["position"][axis] for axis in "xyz"] for record in records],
        quaternions=[[record["pose"]["orientation"][axis] for axis in "xyzw"] for record in records],
        frame_indexes=[record["frame_index"] for record in records],
        times=[record["time_from_start_s"] for record in records],
        frame_id=str(first["header"]["frame_id"]),
        length_unit=str(first.get("length_unit", "unknown")),
    )


def _trajectory_from_csv(text: str) -> CameraTrajectory:
    rows = list(csv.DictReader(text.splitlines()))
    if not rows:
        raise ValueError("Trajectory CSV has no records")
    return _validated_trajectory(
        positions=[[row[axis] for axis in "xyz"] for row in rows],
        quaternions=[[row[f"q{axis}"] for axis in "xyzw"] for row in rows],
        frame_indexes=[row["frame"] for row in rows],
        times=[row["time_from_start_s"] for row in rows],
        frame_id=rows[0].get("frame_id", "unknown"),
        length_unit=rows[0].get("length_unit", "unknown"),
    )


def _validated_trajectory(
    *,
    positions: object,
    quaternions: object,
    frame_indexes: object,
    times: object,
    frame_id: str,
    length_unit: str,
) -> CameraTrajectory:
    try:
        positions_array = np.asarray(positions, dtype=np.float64)
        quaternions_array = np.asarray(quaternions, dtype=np.float64)
        frame_array = np.asarray(frame_indexes, dtype=np.int64)
        time_array = np.asarray(times, dtype=np.float64)
    except (TypeError, ValueError) as error:
        raise ValueError("Trajectory contains non-numeric values") from error
    count = len(positions_array)
    if positions_array.shape != (count, 3) or quaternions_array.shape != (count, 4):
        raise ValueError("Expected positions shaped (N, 3) and quaternions shaped (N, 4)")
    if frame_array.shape != (count,) or time_array.shape != (count,) or count == 0:
        raise ValueError("Trajectory fields have inconsistent record counts")
    if not np.all(np.isfinite(positions_array)) or not np.all(np.isfinite(quaternions_array)):
        raise ValueError("Trajectory contains non-finite poses")
    if not np.all(np.isfinite(time_array)) or np.any(np.diff(time_array) < 0):
        raise ValueError("Trajectory timestamps must be finite and non-decreasing")
    norms = np.linalg.norm(quaternions_array, axis=1)
    if np.any(norms < 1e-12):
        raise ValueError("Trajectory contains a zero quaternion")
    quaternions_array = quaternions_array / norms[:, None]
    return CameraTrajectory(
        positions=positions_array,
        quaternions_xyzw=quaternions_array,
        frame_indexes=frame_array,
        times_s=time_array,
        frame_id=frame_id,
        length_unit=length_unit,
    )


def load_trajectory(path: str | Path) -> CameraTrajectory:
    source = Path(path)
    if source.is_dir():
        source = source / "camera_cartesian_trajectory.json"
    if not source.exists():
        raise FileNotFoundError(source)
    if source.suffix.lower() == ".zip":
        with zipfile.ZipFile(source) as archive:
            try:
                payload = json.loads(archive.read("camera_cartesian_trajectory.json"))
            except KeyError as error:
                raise ValueError("Dataset ZIP is missing camera_cartesian_trajectory.json") from error
        return _trajectory_from_cartesian(payload)
    if source.name.endswith(".jsonl"):
        return _trajectory_from_jsonl(source.read_text(encoding="utf-8"))
    if source.suffix.lower() == ".csv":
        return _trajectory_from_csv(source.read_text(encoding="utf-8"))
    if source.suffix.lower() == ".json":
        return _trajectory_from_cartesian(json.loads(source.read_text(encoding="utf-8")))
    raise ValueError("Input must be a dataset ZIP, directory, Cartesian JSON, PoseStamped JSONL, or CSV")


def quaternion_xyzw_to_matrix(quaternion: np.ndarray) -> np.ndarray:
    q = np.asarray(quaternion, dtype=np.float64)
    if q.shape != (4,) or not np.all(np.isfinite(q)):
        raise ValueError("Quaternion must contain four finite XYZW values")
    norm = np.linalg.norm(q)
    if norm < 1e-12:
        raise ValueError("Quaternion must not be zero")
    x, y, z, w = q / norm
    return np.array(
        [
            [1 - 2 * (y * y + z * z), 2 * (x * y - z * w), 2 * (x * z + y * w)],
            [2 * (x * y + z * w), 1 - 2 * (x * x + z * z), 2 * (y * z - x * w)],
            [2 * (x * z - y * w), 2 * (y * z + x * w), 1 - 2 * (x * x + y * y)],
        ]
    )


def _camera_indexes(count: int, maximum: int) -> np.ndarray:
    if maximum <= 0:
        return np.empty(0, dtype=np.int64)
    return np.unique(np.linspace(0, count - 1, min(count, maximum), dtype=np.int64))


def _set_equal_axes(axis: object, points: np.ndarray) -> None:
    minimum = points.min(axis=0)
    maximum = points.max(axis=0)
    center = (minimum + maximum) / 2
    radius = max(float(np.max(maximum - minimum)) / 2, 1e-3)
    axis.set_xlim(center[0] - radius, center[0] + radius)
    axis.set_ylim(center[1] - radius, center[1] + radius)
    axis.set_zlim(center[2] - radius, center[2] + radius)
    axis.set_box_aspect((1, 1, 1))


def plot_trajectory(
    trajectory: CameraTrajectory,
    *,
    max_cameras: int = 8,
    title: str | None = None,
    save: str | Path | None = None,
    show: bool = True,
) -> None:
    try:
        import matplotlib.pyplot as plt
    except ImportError as error:
        raise RuntimeError("Matplotlib is required; install dependencies with: pip install -r requirements.txt") from error

    positions = trajectory.positions
    span = float(np.max(np.ptp(positions, axis=0)))
    camera_size = max(span * 0.06, 0.03)
    figure = plt.figure(figsize=(9, 7))
    axis = figure.add_subplot(111, projection="3d")
    axis.plot(positions[:, 0], positions[:, 1], positions[:, 2], color="#1665d8", linewidth=2, label="Camera path")
    axis.scatter(*positions[0], color="#159447", s=55, label="Start", depthshade=False)
    axis.scatter(*positions[-1], color="#d83a35", s=55, label="End", depthshade=False)

    local_corners = camera_size * np.array(
        [[-0.7, -0.5, 1.0], [0.7, -0.5, 1.0], [0.7, 0.5, 1.0], [-0.7, 0.5, 1.0]]
    )
    all_points = [positions]
    camera_indexes = _camera_indexes(len(positions), max_cameras)
    for camera_number, index in enumerate(camera_indexes):
        origin = positions[index]
        rotation = quaternion_xyzw_to_matrix(trajectory.quaternions_xyzw[index])
        corners = origin + local_corners @ rotation.T
        all_points.append(corners)
        for corner in corners:
            axis.plot(*np.vstack([origin, corner]).T, color="#666666", linewidth=0.7, alpha=0.75)
        loop = np.vstack([corners, corners[0]])
        axis.plot(loop[:, 0], loop[:, 1], loop[:, 2], color="#666666", linewidth=0.8, alpha=0.75)
        forward = origin + rotation[:, 2] * camera_size * 1.35
        axis.plot(
            *np.vstack([origin, forward]).T,
            color="#e89319",
            linewidth=1.2,
            label="Viewing direction" if camera_number == 0 else None,
        )

    unit = trajectory.length_unit
    axis.set_xlabel(f"X ({unit})")
    axis.set_ylabel(f"Y ({unit})")
    axis.set_zlabel(f"Z ({unit})")
    axis.set_title(title or f"Camera trajectory - {trajectory.frame_id} ({len(positions)} frames)")
    axis.legend(loc="upper right")
    axis.grid(True, alpha=0.3)
    axis.view_init(elev=24, azim=-58)
    _set_equal_axes(axis, np.vstack(all_points))
    figure.tight_layout()
    if save is not None:
        figure.savefig(Path(save), dpi=180, bbox_inches="tight")
        print(f"Saved visualization to {save}")
    if show:
        plt.show()
    else:
        plt.close(figure)


def parser() -> argparse.ArgumentParser:
    command = argparse.ArgumentParser(description=__doc__)
    command.add_argument("input", type=Path, help="Dataset ZIP, extracted directory, JSON, JSONL, or CSV")
    command.add_argument("--save", type=Path, help="Save the visualization as PNG, PDF, SVG, etc.")
    command.add_argument("--no-show", action="store_true", help="Do not open an interactive window")
    command.add_argument("--max-cameras", type=int, default=8, help="Maximum number of camera frustums (default: 8)")
    command.add_argument("--title", help="Custom plot title")
    return command


def main() -> None:
    args = parser().parse_args()
    if args.max_cameras < 0:
        raise SystemExit("--max-cameras must be zero or greater")
    if args.no_show and args.save is None:
        raise SystemExit("--no-show requires --save")
    trajectory = load_trajectory(args.input)
    plot_trajectory(
        trajectory,
        max_cameras=args.max_cameras,
        title=args.title,
        save=args.save,
        show=not args.no_show,
    )


if __name__ == "__main__":
    main()
