#!/usr/bin/env python3
"""Import legacy JSON task state into the runtime SQLite store."""
from __future__ import annotations

import argparse
from pathlib import Path

from state_store import StateStore


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--runtime-root", type=Path, required=True)
    args = parser.parse_args()
    api_root = args.runtime_root / "api"
    store = StateStore(api_root / "state.sqlite3", api_root / "jobs", api_root / "visualizations")
    jobs, visualizations = store.migrate_legacy()
    print(f"imported jobs={jobs} visualizations={visualizations} database={store.database}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
