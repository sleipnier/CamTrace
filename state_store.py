"""Small SQLite-backed state store with one-time JSON compatibility migration.

The API keeps large uploads and result archives on disk; this module stores only
the task metadata and visualization state.  JSON files from older deployments
remain readable and are imported lazily into SQLite.
"""

from __future__ import annotations

import json
import sqlite3
from pathlib import Path
from typing import Any, Iterable


class StateStore:
    def __init__(self, database: Path, legacy_jobs: Path, legacy_visualizations: Path) -> None:
        self.database = database
        self.legacy_jobs = legacy_jobs
        self.legacy_visualizations = legacy_visualizations
        self.database.parent.mkdir(parents=True, exist_ok=True)
        with self.connect() as connection:
            connection.executescript(
                """
                PRAGMA journal_mode=WAL;
                CREATE TABLE IF NOT EXISTS jobs (
                    id TEXT PRIMARY KEY,
                    created_at TEXT NOT NULL,
                    status TEXT NOT NULL,
                    payload TEXT NOT NULL
                );
                CREATE INDEX IF NOT EXISTS idx_jobs_created ON jobs(created_at DESC, id DESC);
                CREATE INDEX IF NOT EXISTS idx_jobs_status_created ON jobs(status, created_at DESC, id DESC);
                CREATE TABLE IF NOT EXISTS visualizations (
                    id TEXT PRIMARY KEY,
                    created_at TEXT NOT NULL,
                    status TEXT NOT NULL,
                    payload TEXT NOT NULL
                );
                """
            )

    def connect(self) -> sqlite3.Connection:
        connection = sqlite3.connect(self.database, timeout=30)
        connection.row_factory = sqlite3.Row
        connection.execute("PRAGMA foreign_keys=ON")
        return connection

    @staticmethod
    def _created(payload: dict[str, Any]) -> str:
        return str(payload.get("createdAt", ""))

    def save_job(self, payload: dict[str, Any]) -> None:
        self._save("jobs", payload)

    def save_visualization(self, payload: dict[str, Any]) -> None:
        self._save("visualizations", payload)

    def _save(self, table: str, payload: dict[str, Any]) -> None:
        identifier = str(payload["id"])
        encoded = json.dumps(payload, ensure_ascii=False, allow_nan=False)
        with self.connect() as connection:
            connection.execute(
                f"""INSERT INTO {table}(id, created_at, status, payload) VALUES (?, ?, ?, ?)
                    ON CONFLICT(id) DO UPDATE SET created_at=excluded.created_at,
                    status=excluded.status, payload=excluded.payload""",
                (identifier, self._created(payload), str(payload.get("status", "")), encoded),
            )

    def read_job(self, identifier: str) -> dict[str, Any] | None:
        return self._read("jobs", identifier) or self._read_legacy_job(identifier)

    def read_visualization(self, identifier: str) -> dict[str, Any] | None:
        return self._read("visualizations", identifier) or self._read_legacy_visualization(identifier)

    def _read(self, table: str, identifier: str) -> dict[str, Any] | None:
        with self.connect() as connection:
            row = connection.execute(f"SELECT payload FROM {table} WHERE id = ?", (identifier,)).fetchone()
        return json.loads(row["payload"]) if row else None

    def list_jobs(self, status: str | None = None) -> list[dict[str, Any]]:
        self.migrate_legacy()
        query = "SELECT payload FROM jobs"
        parameters: tuple[Any, ...] = ()
        if status is not None:
            query += " WHERE status = ?"
            parameters = (status,)
        query += " ORDER BY created_at DESC, id DESC"
        with self.connect() as connection:
            rows = connection.execute(query, parameters).fetchall()
        return [json.loads(row["payload"]) for row in rows]

    def list_visualizations(self) -> list[dict[str, Any]]:
        self.migrate_legacy()
        with self.connect() as connection:
            rows = connection.execute("SELECT payload FROM visualizations ORDER BY created_at DESC, id DESC").fetchall()
        return [json.loads(row["payload"]) for row in rows]

    def migrate_legacy(self) -> tuple[int, int]:
        jobs = 0
        visualizations = 0
        for path in self.legacy_jobs.glob("*.json"):
            try:
                payload = json.loads(path.read_text(encoding="utf-8"))
                if self._read("jobs", str(payload["id"])) is None:
                    self.save_job(payload)
                    jobs += 1
            except (OSError, KeyError, TypeError, json.JSONDecodeError):
                continue
        for path in self.legacy_visualizations.glob("*/state.json"):
            try:
                payload = json.loads(path.read_text(encoding="utf-8"))
                if self._read("visualizations", str(payload["id"])) is None:
                    self.save_visualization(payload)
                    visualizations += 1
            except (OSError, KeyError, TypeError, json.JSONDecodeError):
                continue
        return jobs, visualizations

    def _read_legacy_job(self, identifier: str) -> dict[str, Any] | None:
        path = self.legacy_jobs / f"{identifier}.json"
        try:
            payload = json.loads(path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError):
            return None
        self.save_job(payload)
        return payload

    def _read_legacy_visualization(self, identifier: str) -> dict[str, Any] | None:
        path = self.legacy_visualizations / identifier / "state.json"
        try:
            payload = json.loads(path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError):
            return None
        self.save_visualization(payload)
        return payload

