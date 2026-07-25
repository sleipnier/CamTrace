import json
import tempfile
import unittest
from pathlib import Path

from state_store import StateStore


class StateStoreTest(unittest.TestCase):
    def test_imports_legacy_json_and_updates_sqlite(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            jobs = root / "jobs"
            visualizations = root / "visualizations"
            jobs.mkdir()
            visualizations.mkdir()
            (jobs / "vtc_old.json").write_text(json.dumps({
                "id": "vtc_old", "status": "queued", "createdAt": "2026-01-01T00:00:00+00:00"
            }), encoding="utf-8")
            store = StateStore(root / "state.sqlite3", jobs, visualizations)
            self.assertEqual(store.migrate_legacy(), (1, 0))
            self.assertEqual(store.read_job("vtc_old")["status"], "queued")
            store.save_job({
                "id": "vtc_old", "status": "failed", "createdAt": "2026-01-01T00:00:00+00:00"
            })
            self.assertEqual(store.read_job("vtc_old")["status"], "failed")
            self.assertEqual(len(store.list_jobs("failed")), 1)

    def test_visualization_state_round_trip(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            store = StateStore(root / "state.sqlite3", root / "jobs", root / "visualizations")
            state = {"id": "viz_1", "status": "queued", "createdAt": "2026-01-01T00:00:00+00:00"}
            store.save_visualization(state)
            self.assertEqual(store.read_visualization("viz_1"), state)


if __name__ == "__main__":
    unittest.main()
