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
export HF_HOME="${HF_HOME:-${HOME_ROOT}/cache/huggingface}"
export VTC_PROJECT_ROOT="${PROJECT_ROOT}"
export VTC_MEGASAM_ROOT="${VTC_MEGASAM_ROOT:-${HOME_ROOT}/mega-sam}"
export VTC_RUNTIME_ROOT="${VTC_RUNTIME_ROOT:-${HOME_ROOT}/vtc-runtime}"

exec python "${PROJECT_ROOT}/app.py"
