import json
import tempfile
import unittest
import zipfile
from pathlib import Path
from unittest import mock

from service import OUTPUT_NAMES, ServiceConfig, ServiceError, build_dataset, inspect_video


class DatasetServiceTest(unittest.TestCase):
    def config(self, root: Path, **changes) -> ServiceConfig:
        values = {
            "project_root": root / "project",
            "megasam_root": root / "mega-sam",
            "runtime_root": root / "runtime",
            "max_upload_mb": 1,
        }
        values.update(changes)
        return ServiceConfig(**values)

    def write_outputs(self, output: Path, count: int) -> None:
        output.mkdir()
        with (output / OUTPUT_NAMES[0]).open("w") as target:
            for index in range(count):
                target.write(
                    json.dumps(
                        {
                            "schema": "camera_pose_stamped/v2",
                            "frame_index": index,
                            "robot_execution_ready": False,
                            "pose": {
                                "position": {"x": float(index), "y": 0.0, "z": 0.0},
                                "orientation": {"x": 0.0, "y": 0.0, "z": 0.0, "w": 1.0},
                            },
                        }
                    )
                    + "\n"
                )
        with (output / OUTPUT_NAMES[1]).open("w") as target:
            target.write("frame,time_from_start_s\n")
            for index in range(count):
                target.write(f"{index},{index / 30}\n")
        (output / OUTPUT_NAMES[2]).write_text(
            json.dumps(
                {
                    "type": "cartesian_trajectory",
                    "robot_execution_ready": False,
                    "points": [{"frame_index": index} for index in range(count)],
                }
            )
        )

    @mock.patch("service.inspect_video")
    def test_builds_verified_dataset_archive(self, inspect_mock):
        inspect_mock.return_value = {
            "codec": "h264",
            "duration_seconds": 1.0,
            "width": 640,
            "height": 480,
            "frame_count": 30,
        }
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            upload = root / "unsafe name.mp4"
            upload.write_bytes(b"video")

            def fake_pipeline(config, task_root, video, scene):
                self.assertTrue(scene.startswith("job_"))
                self.assertNotIn("unsafe", scene)
                self.write_outputs(task_root / "output", 30)

            archive, status = build_dataset(upload, self.config(root), fake_pipeline)
            self.assertIn("30 poses", status)
            with zipfile.ZipFile(archive) as dataset:
                self.assertEqual(set(dataset.namelist()), {*OUTPUT_NAMES, "manifest.json"})
                manifest = json.loads(dataset.read("manifest.json"))
            self.assertEqual(manifest["source"]["original_name"], "unsafe_name.mp4")
            self.assertEqual(manifest["source"]["frame_count"], 30)
            self.assertFalse(manifest["pipeline"]["robot_execution_ready"])
            self.assertEqual(list((root / "runtime" / "tasks").iterdir()), [])

    def test_rejects_unsupported_and_oversized_uploads(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            text = root / "input.txt"
            text.write_text("not video")
            with self.assertRaisesRegex(ServiceError, "Unsupported"):
                build_dataset(text, self.config(root), mock.Mock())

            video = root / "large.mp4"
            video.write_bytes(b"x" * 1025)
            with self.assertRaisesRegex(ServiceError, "size limit"):
                build_dataset(video, self.config(root, max_upload_mb=0), mock.Mock())

    @mock.patch("service.subprocess.run")
    def test_inspect_video_enforces_frame_limit(self, run_mock):
        run_mock.return_value.stdout = json.dumps(
            {
                "streams": [
                    {
                        "codec_name": "h264",
                        "width": 1920,
                        "height": 1080,
                        "nb_read_frames": "1001",
                        "avg_frame_rate": "30/1",
                    }
                ],
                "format": {"duration": "10"},
            }
        )
        with tempfile.TemporaryDirectory() as temporary:
            config = self.config(Path(temporary))
            with self.assertRaisesRegex(ServiceError, "between 8 and 1000"):
                inspect_video(Path("video.mp4"), config)

    @mock.patch("service.inspect_video")
    def test_incomplete_outputs_are_not_published(self, inspect_mock):
        inspect_mock.return_value = {
            "codec": "h264",
            "duration_seconds": 1.0,
            "width": 640,
            "height": 480,
            "frame_count": 30,
        }
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            upload = root / "video.mp4"
            upload.write_bytes(b"video")

            def incomplete_pipeline(config, task_root, video, scene):
                output = task_root / "output"
                output.mkdir()
                (output / OUTPUT_NAMES[0]).write_text("partial")

            with self.assertRaisesRegex(ServiceError, "schema validation"):
                build_dataset(upload, self.config(root), incomplete_pipeline)
            results = root / "runtime" / "results"
            self.assertFalse(any(results.rglob("*.zip")))


if __name__ == "__main__":
    unittest.main()
