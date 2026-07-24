#!/usr/bin/env bash
set -euo pipefail

HOME_ROOT="${VTC_HOME:-/hyperai/home}"
PROJECT_ROOT="${VTC_PROJECT_ROOT:-${HOME_ROOT}/videotocamera}"

if [[ -n "${VTC_ENV_ROOT:-}" ]]; then
  eval "$(conda shell.bash hook)"
  conda activate "${VTC_ENV_ROOT}"
fi
command -v ffmpeg >/dev/null
command -v ffprobe >/dev/null
[[ -f "${PROJECT_ROOT}/frontend/dist/index.html" ]] || {
  echo "Missing frontend build. Run: cd ${PROJECT_ROOT}/frontend && npm ci && npm run build" >&2
  exit 1
}
export HF_HOME="${HF_HOME:-${HOME_ROOT}/cache/huggingface}"
export VTC_PROJECT_ROOT="${PROJECT_ROOT}"
export VTC_MEGASAM_ROOT="${VTC_MEGASAM_ROOT:-${HOME_ROOT}/mega-sam}"
export VTC_RUNTIME_ROOT="${VTC_RUNTIME_ROOT:-${HOME_ROOT}/vtc-runtime}"

exec python -m uvicorn api:app \
  --app-dir "${PROJECT_ROOT}" \
  --host "${VTC_HOST:-0.0.0.0}" \
  --port "${VTC_PORT:-7860}" \
  --workers 1
