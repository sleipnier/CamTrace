#!/usr/bin/env bash
set -euo pipefail

HOME_ROOT="${VTC_HOME:-/hyperai/home}"
PROJECT_ROOT="${VTC_PROJECT_ROOT:-${HOME_ROOT}/videotocamera}"
ENV_ROOT="${VTC_ENV_ROOT:-${HOME_ROOT}/envs/mega_sam}"

if [[ -x "${ENV_ROOT}/bin/python" ]]; then
  eval "$(conda shell.bash hook)"
  conda activate "${ENV_ROOT}"
else
  # HyperAI deletes system-level pip installs when a compute container stops.
  export PYTHONUSERBASE="${VTC_PYTHONUSERBASE:-${HOME_ROOT}/.pylibs}"
fi
command -v ffmpeg >/dev/null
command -v ffprobe >/dev/null
export HF_HOME="${HF_HOME:-${HOME_ROOT}/cache/huggingface}"
export VTC_PROJECT_ROOT="${PROJECT_ROOT}"
export VTC_MEGASAM_ROOT="${VTC_MEGASAM_ROOT:-${HOME_ROOT}/mega-sam}"
export VTC_RUNTIME_ROOT="${VTC_RUNTIME_ROOT:-${HOME_ROOT}/vtc-runtime}"

# Build React frontend if node is available and dist is missing
if command -v node >/dev/null 2>&1 && [[ ! -d "${PROJECT_ROOT}/frontend/dist" ]]; then
  echo "Building React frontend..."
  (cd "${PROJECT_ROOT}/frontend" && npm install --ignore-scripts && npm run build)
fi

exec python "${PROJECT_ROOT}/api_server.py"
