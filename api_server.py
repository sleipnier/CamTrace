#!/usr/bin/env python3
"""Production entry point for the CAM//TRACE FastAPI application."""

from __future__ import annotations

import os

import uvicorn


if __name__ == "__main__":
    uvicorn.run(
        "api:app",
        host=os.environ.get("VTC_HOST", "0.0.0.0"),
        port=int(os.environ.get("VTC_PORT", "7860")),
        reload=False,
    )
