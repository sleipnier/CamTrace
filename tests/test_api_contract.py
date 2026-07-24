import tempfile
import unittest
from pathlib import Path
from unittest import mock

from fastapi.testclient import TestClient

import api


class ApiContractTest(unittest.TestCase):
    def setUp(self) -> None:
        self.temporary = tempfile.TemporaryDirectory()
        self.auth_patch = mock.patch.dict(
            "os.environ",
            {"VTC_AUTH_USER": "", "VTC_AUTH_PASSWORD": ""},
        )
        self.auth_patch.start()
        self.job_root_patch = mock.patch.object(api, "JOB_ROOT", Path(self.temporary.name) / "jobs")
        self.upload_root_patch = mock.patch.object(api, "UPLOAD_ROOT", Path(self.temporary.name) / "uploads")
        self.visualization_root_patch = mock.patch.object(
            api,
            "VISUALIZATION_ROOT",
            Path(self.temporary.name) / "visualizations",
        )
        self.job_root_patch.start()
        self.upload_root_patch.start()
        self.visualization_root_patch.start()
        api.visualization_states.clear()
        self.client = TestClient(api.app)

    def tearDown(self) -> None:
        self.client.close()
        api.visualization_states.clear()
        self.visualization_root_patch.stop()
        self.upload_root_patch.stop()
        self.job_root_patch.stop()
        self.auth_patch.stop()
        self.temporary.cleanup()

    def test_health_is_public_and_reports_service(self) -> None:
        response = self.client.get("/api/health")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "ok", "service": "camera-trace-api"})

    def test_job_list_enforces_limit_range(self) -> None:
        response = self.client.get("/api/jobs", params={"limit": 101})
        self.assertEqual(response.status_code, 422)
        self.assertEqual(response.json()["code"], "INVALID_REQUEST")

    def test_job_list_rejects_unknown_status(self) -> None:
        response = self.client.get("/api/jobs", params={"status": "cancelled"})
        self.assertEqual(response.status_code, 422)
        self.assertEqual(response.json()["code"], "INVALID_REQUEST")

    def make_job(self, job_id: str, created_at: str, status: str = "succeeded") -> dict:
        return {
            "id": job_id,
            "status": status,
            "createdAt": created_at,
            "source": api.empty_source(f"{job_id}.mp4", 10),
            "progress": {"percent": 100 if status == "succeeded" else 30, "stageLabel": status},
            "robotExecutionReady": False,
            "artifacts": [],
        }

    def test_job_list_cursor_paginates_without_overlap(self) -> None:
        for index in range(3):
            api.save_job(self.make_job(f"vtc_{index}", f"2026-07-24T00:00:0{index}+00:00"))

        first = self.client.get("/api/jobs", params={"limit": 2})
        self.assertEqual(first.status_code, 200)
        first_payload = first.json()
        self.assertEqual([item["id"] for item in first_payload["items"]], ["vtc_2", "vtc_1"])
        self.assertIn("nextCursor", first_payload)

        second = self.client.get(
            "/api/jobs",
            params={"limit": 2, "cursor": first_payload["nextCursor"]},
        )
        self.assertEqual(second.status_code, 200)
        self.assertEqual([item["id"] for item in second.json()["items"]], ["vtc_0"])
        self.assertNotIn("nextCursor", second.json())

    def test_job_list_rejects_broken_cursor(self) -> None:
        response = self.client.get("/api/jobs", params={"cursor": "not-a-cursor"})
        self.assertEqual(response.status_code, 422)
        self.assertEqual(response.json()["code"], "INVALID_CURSOR")

    def test_recovery_marks_incomplete_jobs_failed_and_removes_upload(self) -> None:
        job = self.make_job("vtc_restart", "2026-07-24T00:00:00+00:00", "reconstructing")
        api.save_job(job)
        api.UPLOAD_ROOT.mkdir(parents=True)
        upload = api.UPLOAD_ROOT / "vtc_restart.mp4"
        upload.write_bytes(b"video")

        self.assertEqual(api.recover_incomplete_jobs(), 1)

        recovered = api.read_job("vtc_restart")
        self.assertEqual(recovered["status"], "failed")
        self.assertEqual(recovered["error"]["code"], "SERVICE_RESTARTED")
        self.assertFalse(upload.exists())

    def test_succeeded_job_reports_result_availability(self) -> None:
        archive = Path(self.temporary.name) / "result.zip"
        archive.write_bytes(b"zip")
        job = self.make_job("vtc_result", "2026-07-24T00:00:00+00:00")
        job["archivePath"] = str(archive)
        api.save_job(job)

        available = self.client.get("/api/jobs/vtc_result")
        self.assertTrue(available.json()["resultAvailable"])
        archive.unlink()
        expired = self.client.get("/api/jobs/vtc_result")
        self.assertFalse(expired.json()["resultAvailable"])

    def test_visualization_state_reloads_from_disk(self) -> None:
        state = {
            "id": "viz_saved",
            "status": "failed",
            "progressPercent": 100,
            "error": {"code": "TEST", "message": "saved"},
        }
        api.visualization_states[state["id"]] = state
        api.save_visualization_state(state)
        api.visualization_states.clear()

        reloaded = api.read_visualization_state("viz_saved")

        self.assertEqual(reloaded["error"]["message"], "saved")
        self.assertIn("viz_saved", api.visualization_states)

    def test_visualization_recovery_marks_rendering_job_failed(self) -> None:
        identifier = "viz_restart"
        state = {"id": identifier, "status": "rendering", "progressPercent": 25}
        api.visualization_states[identifier] = state
        api.save_visualization_state(state)
        api.UPLOAD_ROOT.mkdir(parents=True, exist_ok=True)
        source = api.UPLOAD_ROOT / f"{identifier}.json"
        source.write_text("{}")
        api.visualization_states.clear()

        self.assertEqual(api.recover_visualization_states(), 1)

        recovered = api.read_visualization_state(identifier)
        self.assertEqual(recovered["status"], "failed")
        self.assertEqual(recovered["error"]["code"], "SERVICE_RESTARTED")
        self.assertFalse(source.exists())

    def test_invalid_visualization_reports_error_and_cleans_source(self) -> None:
        identifier = "viz_invalid"
        source = Path(self.temporary.name) / "invalid.json"
        source.write_text("{}")
        api.visualization_states[identifier] = {
            "id": identifier,
            "status": "queued",
            "progressPercent": 0,
        }

        api.run_visualization(identifier, source, 24, 1)

        state = api.visualization_states.pop(identifier)
        self.assertEqual(state["status"], "failed")
        self.assertEqual(state["error"]["code"], "INVALID_TRAJECTORY")
        self.assertFalse(source.exists())


if __name__ == "__main__":
    unittest.main()
