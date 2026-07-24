import tempfile
import unittest
from pathlib import Path
from unittest import mock

import numpy as np

import app
from service import ServiceConfig
from visualize_camera_trajectory import CameraTrajectory


class WebVisualizationTest(unittest.TestCase):
    def config(self, root: Path) -> ServiceConfig:
        return ServiceConfig(
            project_root=root / "project",
            megasam_root=root / "mega-sam",
            runtime_root=root / "runtime",
        )

    @mock.patch("app.render_video")
    @mock.patch("app.load_trajectory")
    def test_renders_csv_into_managed_results(self, load_mock, render_mock):
        load_mock.return_value = CameraTrajectory(
            positions=np.zeros((2, 3)),
            quaternions_xyzw=np.array([[0.0, 0.0, 0.0, 1.0]] * 2),
            frame_indexes=np.array([0, 1]),
            times_s=np.array([0.0, 0.1]),
            frame_id="reconstruction_camera0",
            length_unit="reconstruction_unit",
        )

        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            source = root / "camera_trajectory.csv"
            source.write_text("trajectory")

            def fake_render(trajectory, output, **options):
                output.parent.mkdir(parents=True)
                output.write_bytes(b"mp4")

            render_mock.side_effect = fake_render
            with mock.patch.object(app, "CONFIG", self.config(root)):
                status, preview, download = app.render_visualization(str(source), 24, 2)

            self.assertIn("2 poses", status)
            self.assertEqual(preview, download)
            self.assertTrue(Path(preview).is_file())
            self.assertEqual(Path(preview).name, "camera_trajectory_multiview.mp4")
            self.assertEqual(Path(preview).parent.parent, root / "runtime" / "results")
            render_mock.assert_called_once()

    @mock.patch("app.render_video")
    @mock.patch("app.load_trajectory")
    def test_rejects_unsupported_visualization_input(self, load_mock, render_mock):
        with tempfile.TemporaryDirectory() as temporary:
            source = Path(temporary) / "trajectory.txt"
            source.write_text("not a supported dataset")
            status, preview, download = app.render_visualization(str(source), 24, 1)

        self.assertIn("ZIP, CSV, JSON, or JSONL", status)
        self.assertIsNone(preview)
        self.assertIsNone(download)
        load_mock.assert_not_called()
        render_mock.assert_not_called()


if __name__ == "__main__":
    unittest.main()
