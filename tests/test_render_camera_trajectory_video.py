import unittest

import numpy as np

from render_camera_trajectory_video import (
    asymmetric_target_mesh,
    camera_geometry,
    estimate_view_target,
    playback_indexes,
    points_in_camera,
    target_in_camera,
)
from video_to_camera import matrix_to_quaternion_xyzw
from visualize_camera_trajectory import CameraTrajectory


class CameraTrajectoryVideoTest(unittest.TestCase):
    def trajectory(self, positions, quaternions):
        count = len(positions)
        return CameraTrajectory(
            positions=np.asarray(positions, dtype=np.float64),
            quaternions_xyzw=np.asarray(quaternions, dtype=np.float64),
            frame_indexes=np.arange(count),
            times_s=np.arange(count, dtype=np.float64),
            frame_id="reconstruction_camera0",
            length_unit="reconstruction_unit",
        )

    def test_samples_source_timestamps_at_fixed_video_rate(self):
        indexes = playback_indexes(np.array([5.0, 5.1, 5.4]), fps=10.0, speed=1.0)
        np.testing.assert_array_equal(indexes, [0, 1, 1, 2, 2])

    def test_playback_speed_changes_video_frame_count(self):
        times = np.array([0.0, 0.5, 1.0])
        self.assertEqual(len(playback_indexes(times, fps=10.0, speed=1.0)), 11)
        self.assertEqual(len(playback_indexes(times, fps=10.0, speed=2.0)), 6)

    def test_camera_geometry_uses_opencv_forward_axis(self):
        corners, forward, axes = camera_geometry(
            np.array([1.0, 2.0, 3.0]),
            np.array([0.0, 0.0, 0.0, 1.0]),
            2.0,
        )
        np.testing.assert_allclose(corners[:, 2], 5.0)
        np.testing.assert_allclose(forward, [1.0, 2.0, 5.7])
        np.testing.assert_allclose(axes, [[2.8, 2.0, 3.0], [1.0, 3.8, 3.0], [1.0, 2.0, 4.8]])

        _, rotated_forward, rotated_axes = camera_geometry(
            np.zeros(3),
            np.array([0.0, 0.0, np.sqrt(0.5), np.sqrt(0.5)]),
            1.0,
        )
        np.testing.assert_allclose(rotated_forward, [0.0, 0.0, 1.35], atol=1e-12)
        np.testing.assert_allclose(rotated_axes[0], [0.0, 0.9, 0.0], atol=1e-12)

    def test_rejects_invalid_video_timing(self):
        with self.assertRaisesRegex(ValueError, "FPS"):
            playback_indexes(np.array([0.0]), fps=0.0, speed=1.0)
        with self.assertRaisesRegex(ValueError, "speed"):
            playback_indexes(np.array([0.0]), fps=30.0, speed=0.0)

    def test_estimates_exact_common_view_target(self):
        directions = np.array([[1.0, 0.0, 1.0], [-1.0, 0.0, 1.0]]) / np.sqrt(2)
        quaternions = []
        for direction in directions:
            angle = np.arctan2(direction[0], direction[2])
            quaternions.append([0.0, np.sin(angle / 2), 0.0, np.cos(angle / 2)])
        trajectory = self.trajectory([[-1.0, 0.0, 0.0], [1.0, 0.0, 0.0]], quaternions)

        target, reliable = estimate_view_target(trajectory)
        np.testing.assert_allclose(target, [0.0, 0.0, 1.0], atol=1e-12)
        self.assertTrue(reliable)

        scaled = self.trajectory(trajectory.positions * 1e-8, quaternions)
        scaled_target, scaled_reliable = estimate_view_target(scaled)
        np.testing.assert_allclose(scaled_target, np.array([0.0, 0.0, 1.0]) * 1e-8, atol=1e-18)
        self.assertTrue(scaled_reliable)

    def test_parallel_view_rays_use_finite_fallback(self):
        trajectory = self.trajectory(
            [[0.0, 0.0, 0.0], [1.0, 0.0, 0.0]],
            [[0.0, 0.0, 0.0, 1.0], [0.0, 0.0, 0.0, 1.0]],
        )
        target, reliable = estimate_view_target(trajectory)
        self.assertFalse(reliable)
        self.assertTrue(np.all(np.isfinite(target)))
        self.assertGreater(target[2], 0)

    def test_projects_parent_target_into_rotated_camera(self):
        identity_target = target_in_camera(
            np.array([1.0, 2.0, 3.0]),
            np.array([0.0, 0.0, 0.0, 1.0]),
            np.array([2.0, 4.0, 7.0]),
        )
        np.testing.assert_allclose(identity_target, [1.0, 2.0, 4.0])

        angle = np.pi / 2
        rotated_target = target_in_camera(
            np.zeros(3),
            np.array([0.0, np.sin(angle / 2), 0.0, np.cos(angle / 2)]),
            np.array([1.0, 0.0, 0.0]),
        )
        np.testing.assert_allclose(rotated_target, [0.0, 0.0, 1.0], atol=1e-12)

    def test_asymmetric_target_has_distinct_front_side_and_top(self):
        mesh = asymmetric_target_mesh(np.array([1.0, 2.0, 3.0]), 2.0)
        points = np.vstack(mesh.faces)
        self.assertEqual(len(mesh.faces), 29)
        self.assertEqual(len(mesh.colors), len(mesh.faces))
        self.assertGreater(mesh.front_tip[0], points[:, 0].mean())
        np.testing.assert_allclose(mesh.front_tip[1:], [2.0, 3.0])
        self.assertGreater(points[:, 1].max() - 2.0, 2.0 - points[:, 1].min())
        self.assertGreater(points[:, 2].max() - 3.0, 3.0 - points[:, 2].min())

    def test_target_remains_visible_through_360_degree_orbit(self):
        target = np.zeros(3)
        model = asymmetric_target_mesh(target, 0.5)
        normalized_front_x = []
        silhouette_widths = []
        silhouette_heights = []
        model_points = np.vstack(model.faces)
        for angle in np.linspace(0, 2 * np.pi, 8, endpoint=False):
            camera = np.array([3 * np.cos(angle), 3 * np.sin(angle), 0.0])
            forward = -camera / np.linalg.norm(camera)
            down = np.array([0.0, 0.0, -1.0])
            right = np.cross(down, forward)
            rotation = np.column_stack((right, down, forward))
            quaternion = matrix_to_quaternion_xyzw(rotation)

            center_camera = target_in_camera(camera, quaternion, target)
            np.testing.assert_allclose(center_camera, [0.0, 0.0, 3.0], atol=1e-12)
            front_camera = points_in_camera(camera, quaternion, model.front_tip[None, :])[0]
            self.assertGreater(front_camera[2], 0)
            normalized_front_x.append(front_camera[0] / front_camera[2])
            projected_points = points_in_camera(camera, quaternion, model_points)
            self.assertTrue(np.all(projected_points[:, 2] > 0))
            projected_xy = projected_points[:, :2] / projected_points[:, 2, None]
            self.assertTrue(np.all(np.isfinite(projected_xy)))
            silhouette_widths.append(np.ptp(projected_xy[:, 0]))
            silhouette_heights.append(np.ptp(projected_xy[:, 1]))

        self.assertGreater(np.ptp(normalized_front_x), 0.1)
        self.assertGreater(np.ptp(silhouette_widths), 0.01)
        self.assertGreater(np.ptp(silhouette_heights), 0.005)


if __name__ == "__main__":
    unittest.main()
