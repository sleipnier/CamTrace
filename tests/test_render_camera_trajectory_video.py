import unittest

import numpy as np

from render_camera_trajectory_video import camera_geometry, playback_indexes


class CameraTrajectoryVideoTest(unittest.TestCase):
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


if __name__ == "__main__":
    unittest.main()
