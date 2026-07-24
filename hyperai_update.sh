#!/usr/bin/env bash
set -euo pipefail

HOME_ROOT="${VTC_HOME:-/hyperai/home}"
PROJECT_ROOT="${VTC_PROJECT_ROOT:-${HOME_ROOT}/videotocamera}"
BRANCH="${VTC_UPDATE_BRANCH:-main}"
PID_FILE="${VTC_PID_FILE:-${HOME_ROOT}/app.pid}"
LOG_FILE="${VTC_LOG_FILE:-${HOME_ROOT}/app.log}"

cd "${PROJECT_ROOT}"

if [[ ! -d .git ]]; then
  echo "Not a Git checkout: ${PROJECT_ROOT}" >&2
  exit 1
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Refusing to overwrite uncommitted changes in ${PROJECT_ROOT}." >&2
  exit 1
fi

git fetch origin "${BRANCH}"
git merge --ff-only "origin/${BRANCH}"

# Keep the current service alive when a pull contains invalid Python.
python -m py_compile app.py service.py video_to_camera.py

if [[ -f "${PID_FILE}" ]]; then
  old_pid="$(<"${PID_FILE}")"
  if [[ "${old_pid}" =~ ^[0-9]+$ ]] && kill -0 "${old_pid}" 2>/dev/null; then
    kill "${old_pid}"
    for _ in {1..30}; do
      kill -0 "${old_pid}" 2>/dev/null || break
      sleep 0.2
    done
  fi
fi

nohup bash "${PROJECT_ROOT}/hyperai_start.sh" >"${LOG_FILE}" 2>&1 &
new_pid=$!
printf '%s\n' "${new_pid}" >"${PID_FILE}"
sleep 3

if ! kill -0 "${new_pid}" 2>/dev/null; then
  echo "Web service failed to start. Check ${LOG_FILE}." >&2
  exit 1
fi

echo "Updated ${PROJECT_ROOT} to $(git rev-parse --short HEAD)."
echo "Web service restarted with PID ${new_pid}."
