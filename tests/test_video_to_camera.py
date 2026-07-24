import json
import os
import tempfile
import unittest
from pathlib import Path
from unittest import mock

import numpy as np

from video_to_camera import (
    export_trajectory,
    load_camera_poses,
    matrix_to_quaternion_xyzw,
    pose_records,
    video_timestamps,
)


class TrajectoryExportTest(unittest.TestCase):
    def test_rotation_matrix_to_xyzw(self):
        rotation_z_90 = np.array([[0.0, -1.0, 0.0], [1.0, 0.0, 0.0], [0.0, 0.0, 1.0]])
        quaternion = matrix_to_quaternion_xyzw(rotation_z_90)
        np.testing.assert_allclose(quaternion, [0.0, 0.0, np.sqrt(0.5), np.sqrt(0.5)])

    def test_rotation_matrix_to_xyzw_covers_180_degree_branches(self):
        rotations = [
            (np.diag([1.0, -1.0, -1.0]), np.array([1.0, 0.0, 0.0, 0.0])),
            (np.diag([-1.0, 1.0, -1.0]), np.array([0.0, 1.0, 0.0, 0.0])),
            (np.diag([-1.0, -1.0, 1.0]), np.array([0.0, 0.0, 1.0, 0.0])),
        ]
        for matrix, expected in rotations:
            actual = matrix_to_quaternion_xyzw(matrix)
            self.assertAlmostEqual(abs(float(np.dot(actual, expected))), 1.0)

    def test_rejects_non_finite_fps(self):
        poses = np.eye(4)[None, :, :]
        for fps in (0.0, -1.0, float("nan"), float("inf")):
            with self.subTest(fps=fps), self.assertRaisesRegex(ValueError, "FPS"):
                pose_records(poses, fps, "world")

    def test_normalizes_first_pose_and_exports_standard_fields(self):
        poses = np.repeat(np.eye(4)[None, :, :], 2, axis=0)
        poses[:, 0, 3] = [2.0, 2.25]
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            np.savez(root / "track.npz", cam_c2w=poses)

            normalized = load_camera_poses(root / "track.npz", normalize_first=True)
            np.testing.assert_allclose(normalized[0], np.eye(4), atol=1e-12)
            np.testing.assert_allclose(normalized[1, :3, 3], [0.25, 0.0, 0.0])

            export_trajectory(root / "track.npz", root / "out", fps=25.0)
            lines = (root / "out" / "camera_pose_stamped.jsonl").read_text().splitlines()
            second = json.loads(lines[1])
            self.assertEqual(second["header"]["frame_id"], "reconstruction_camera0")
            self.assertEqual(second["length_unit"], "reconstruction_unit")
            self.assertEqual(second["time_from_start_s"], 0.04)
            self.assertEqual(second["header"]["stamp"], {"sec": 0, "nanosec": 40000000})
            self.assertEqual(second["pose"]["orientation"], {"x": 0.0, "y": 0.0, "z": 0.0, "w": 1.0})
            self.assertEqual(second["stamp_basis"], "media_time_from_start_not_ros_clock")
            self.assertFalse(second["robot_execution_ready"])

    def test_normalizes_a_rotated_first_pose(self):
        first = np.eye(4)
        first[:3, :3] = np.array([[0.0, -1.0, 0.0], [1.0, 0.0, 0.0], [0.0, 0.0, 1.0]])
        first[:3, 3] = [3.0, 2.0, 1.0]
        relative = np.eye(4)
        relative[:3, 3] = [0.25, 0.0, 0.0]
        poses = np.stack([first, first @ relative])
        with tempfile.TemporaryDirectory() as temporary:
            path = Path(temporary) / "track.npz"
            np.savez(path, cam_c2w=poses)
            normalized = load_camera_poses(path, normalize_first=True)
            np.testing.assert_allclose(normalized[1], relative, atol=1e-12)

    def test_rejects_non_rigid_transform(self):
        pose = np.eye(4)[None, :, :]
        pose[0, 0, 0] = 2.0
        with tempfile.TemporaryDirectory() as temporary:
            path = Path(temporary) / "track.npz"
            np.savez(path, cam_c2w=pose)
            with self.assertRaisesRegex(ValueError, "non-orthonormal"):
                load_camera_poses(path, normalize_first=True)

    def test_applies_explicit_metric_scale(self):
        poses = np.repeat(np.eye(4)[None, :, :], 2, axis=0)
        poses[1, 0, 3] = 2.0
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            np.savez(root / "track.npz", cam_c2w=poses)
            export_trajectory(root / "track.npz", root / "out", fps=30.0, meters_per_unit=0.1)
            trajectory = json.loads((root / "out" / "camera_cartesian_trajectory.json").read_text())
            self.assertEqual(trajectory["units"]["length"], "meter")
            self.assertEqual(trajectory["points"][1]["position_xyz"], [0.2, 0.0, 0.0])
            self.assertFalse(trajectory["robot_execution_ready"])

    def test_raw_world_does_not_claim_camera0_axis_convention(self):
        poses = np.eye(4)[None, :, :]
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            np.savez(root / "track.npz", cam_c2w=poses)
            export_trajectory(root / "track.npz", root / "out", 30.0, normalize_first=False)
            trajectory = json.loads((root / "out" / "camera_cartesian_trajectory.json").read_text())
            self.assertEqual(trajectory["frame_id"], "reconstruction_world_raw")
            self.assertEqual(trajectory["parent_axis_convention"], "megasam_reconstruction_world_unspecified")

    def test_uses_source_pts_and_rejects_pose_count_mismatch(self):
        poses = np.repeat(np.eye(4)[None, :, :], 3, axis=0)
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            np.savez(root / "track.npz", cam_c2w=poses)
            timestamps = np.array([0.0, 0.04, 0.11])
            export_trajectory(root / "track.npz", root / "out", 30.0, timestamps=timestamps)
            records = [json.loads(line) for line in (root / "out" / "camera_pose_stamped.jsonl").read_text().splitlines()]
            self.assertEqual([record["time_from_start_s"] for record in records], timestamps.tolist())
            self.assertEqual(records[0]["timestamp_quality"], "source_frame_pts")
            with self.assertRaisesRegex(ValueError, "count mismatch"):
                export_trajectory(root / "track.npz", root / "other", 30.0, expected_pose_count=2)

    def test_rejects_non_finite_export_results(self):
        poses = np.repeat(np.eye(4)[None, :, :], 2, axis=0)
        poses[1, 0, 3] = 1e308
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            np.savez(root / "track.npz", cam_c2w=poses)
            with np.errstate(over="ignore"), self.assertRaisesRegex(ValueError, "Metric scale"):
                export_trajectory(root / "track.npz", root / "scaled", 30.0, meters_per_unit=2.0)
            with np.errstate(over="ignore"), self.assertRaisesRegex(ValueError, "Timestamps"):
                export_trajectory(root / "track.npz", root / "timed", np.nextafter(0.0, 1.0))

    def test_refuses_overwrite_and_symlink_targets(self):
        poses = np.eye(4)[None, :, :]
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            np.savez(root / "track.npz", cam_c2w=poses)
            export_trajectory(root / "track.npz", root / "out", 30.0)
            with self.assertRaisesRegex(FileExistsError, "overwrite"):
                export_trajectory(root / "track.npz", root / "out", 30.0)

            victim = root / "victim"
            victim.write_text("safe")
            csv_path = root / "out" / "camera_trajectory.csv"
            csv_path.unlink()
            try:
                os.symlink(victim, csv_path)
            except OSError as error:
                self.skipTest(f"Symbolic links are not available in this environment: {error}")
            with self.assertRaisesRegex(FileExistsError, "non-regular"):
                export_trajectory(root / "track.npz", root / "out", 30.0, force=True)
            self.assertEqual(victim.read_text(), "safe")

    def test_quaternion_sequence_has_continuous_sign(self):
        angles = np.deg2rad([170.0, 190.0, 350.0])
        poses = np.repeat(np.eye(4)[None, :, :], len(angles), axis=0)
        for pose, angle in zip(poses, angles):
            pose[:3, :3] = [[np.cos(angle), -np.sin(angle), 0.0], [np.sin(angle), np.cos(angle), 0.0], [0.0, 0.0, 1.0]]
        records = pose_records(poses, 30.0, "world")
        quaternions = np.array([[record["pose"]["orientation"][axis] for axis in "xyzw"] for record in records])
        self.assertTrue(np.all(np.sum(quaternions[:-1] * quaternions[1:], axis=1) >= 0))

    def test_rejects_reflection_bad_bottom_row_and_non_finite_pose(self):
        reflection = np.eye(4)
        reflection[0, 0] = -1.0
        bad_bottom = np.eye(4)
        bad_bottom[3, 0] = 1.0
        non_finite = np.eye(4)
        non_finite[0, 3] = np.nan
        invalid = [(reflection, "reflected"), (bad_bottom, "bottom"), (non_finite, "non-finite")]
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            for index, (pose, message) in enumerate(invalid):
                path = root / f"{index}.npz"
                np.savez(path, cam_c2w=pose[None, :, :])
                with self.subTest(message=message), self.assertRaisesRegex(ValueError, message):
                    load_camera_poses(path, True)

    @mock.patch("video_to_camera.subprocess.run")
    def test_video_timestamps_are_relative(self, run_mock):
        run_mock.return_value.stdout = json.dumps(
            {"frames": [{"best_effort_timestamp_time": value} for value in ("4.0", "4.04", "4.11")]}
        )
        np.testing.assert_allclose(video_timestamps(Path("video.mp4")), [0.0, 0.04, 0.11])
        self.assertIn("v:0", run_mock.call_args.args[0])


if __name__ == "__main__":
    unittest.main()
