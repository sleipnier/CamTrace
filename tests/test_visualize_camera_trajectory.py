import csv
import json
import tempfile
import unittest
import zipfile
from pathlib import Path

import numpy as np

from visualize_camera_trajectory import load_trajectory, quaternion_xyzw_to_matrix


def cartesian_payload():
    return {
        "type": "cartesian_trajectory",
        "frame_id": "reconstruction_camera0",
        "units": {"length": "reconstruction_unit"},
        "points": [
            {
                "frame_index": 0,
                "time_from_start_s": 0.0,
                "position_xyz": [0.0, 0.0, 0.0],
                "orientation_xyzw": [0.0, 0.0, 0.0, 1.0],
            },
            {
                "frame_index": 1,
                "time_from_start_s": 0.04,
                "position_xyz": [1.0, 2.0, 3.0],
                "orientation_xyzw": [0.0, 0.0, np.sqrt(0.5), np.sqrt(0.5)],
            },
        ],
    }


class CameraTrajectoryVisualizationTest(unittest.TestCase):
    def test_loads_standard_dataset_zip(self):
        with tempfile.TemporaryDirectory() as temporary:
            path = Path(temporary) / "dataset.zip"
            with zipfile.ZipFile(path, "w") as archive:
                archive.writestr("camera_cartesian_trajectory.json", json.dumps(cartesian_payload()))
            trajectory = load_trajectory(path)
        self.assertEqual(trajectory.frame_id, "reconstruction_camera0")
        self.assertEqual(trajectory.length_unit, "reconstruction_unit")
        np.testing.assert_allclose(trajectory.positions[1], [1.0, 2.0, 3.0])
        np.testing.assert_allclose(np.linalg.norm(trajectory.quaternions_xyzw, axis=1), 1.0)

    def test_loads_jsonl_and_csv(self):
        record = {
            "frame_index": 0,
            "time_from_start_s": 0.0,
            "length_unit": "meter",
            "header": {"frame_id": "world"},
            "pose": {
                "position": {"x": 1, "y": 2, "z": 3},
                "orientation": {"x": 0, "y": 0, "z": 0, "w": 2},
            },
        }
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            jsonl = root / "poses.jsonl"
            jsonl.write_text(json.dumps(record) + "\n")
            jsonl_trajectory = load_trajectory(jsonl)

            csv_path = root / "poses.csv"
            with csv_path.open("w", newline="") as output:
                writer = csv.writer(output)
                writer.writerow(["frame", "time_from_start_s", "frame_id", "length_unit", "x", "y", "z", "qx", "qy", "qz", "qw"])
                writer.writerow([0, 0.0, "world", "meter", 1, 2, 3, 0, 0, 0, 1])
            csv_trajectory = load_trajectory(csv_path)

        self.assertEqual(jsonl_trajectory.length_unit, "meter")
        np.testing.assert_allclose(jsonl_trajectory.quaternions_xyzw[0], [0, 0, 0, 1])
        np.testing.assert_allclose(csv_trajectory.positions[0], [1, 2, 3])

    def test_converts_xyzw_quaternion_to_rotation(self):
        quaternion = np.array([0.0, 0.0, np.sqrt(0.5), np.sqrt(0.5)])
        rotation = quaternion_xyzw_to_matrix(quaternion)
        np.testing.assert_allclose(rotation @ [1.0, 0.0, 0.0], [0.0, 1.0, 0.0], atol=1e-12)

    def test_rejects_missing_zip_member_and_zero_quaternion(self):
        with tempfile.TemporaryDirectory() as temporary:
            path = Path(temporary) / "dataset.zip"
            with zipfile.ZipFile(path, "w") as archive:
                archive.writestr("manifest.json", "{}")
            with self.assertRaisesRegex(ValueError, "missing"):
                load_trajectory(path)
        with self.assertRaisesRegex(ValueError, "zero"):
            quaternion_xyzw_to_matrix(np.zeros(4))


if __name__ == "__main__":
    unittest.main()
