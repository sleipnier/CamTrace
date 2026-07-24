#!/usr/bin/env bash
set -euo pipefail

HOME_ROOT="${VTC_HOME:-/hyperai/home}"
PROJECT_ROOT="${VTC_PROJECT_ROOT:-${HOME_ROOT}/videotocamera}"
MEGASAM_ROOT="${VTC_MEGASAM_ROOT:-${HOME_ROOT}/mega-sam}"
ENV_ROOT="${VTC_ENV_ROOT:-${HOME_ROOT}/envs/mega_sam}"
MEGASAM_COMMIT="a27b4e633c5cc0828a62ed943ef9f6505705fd3f"
DEPTH_SHA256="6c6a383e33e51c5fdfbf31e7ebcda943973a9e6a1cbef1564afe58d7f2e8fe63"

for command in curl git conda nvidia-smi nvcc; do
  command -v "${command}" >/dev/null || { printf 'Missing required command: %s\n' "${command}" >&2; exit 1; }
done

nvcc --version | grep -q 'release 11.8' || {
  printf 'MegaSaM requires a CUDA 11.8 toolkit image; current nvcc is incompatible.\n' >&2
  exit 1
}

if ! command -v ffmpeg >/dev/null || ! command -v ffprobe >/dev/null; then
  apt-get update
  apt-get install -y ffmpeg
fi

if [[ ! -d "${MEGASAM_ROOT}/.git" ]]; then
  git clone --recursive https://github.com/mega-sam/mega-sam.git "${MEGASAM_ROOT}"
fi
git -C "${MEGASAM_ROOT}" fetch origin "${MEGASAM_COMMIT}"
git -C "${MEGASAM_ROOT}" checkout --detach "${MEGASAM_COMMIT}"
git -C "${MEGASAM_ROOT}" submodule update --init --recursive
if ! git -C "${MEGASAM_ROOT}" diff --quiet --ignore-submodules=untracked HEAD -- || \
   ! git -C "${MEGASAM_ROOT}/base" diff --quiet HEAD --; then
  printf 'Tracked MegaSaM sources are modified; use a clean checkout.\n' >&2
  exit 1
fi

eval "$(conda shell.bash hook)"
if [[ ! -x "${ENV_ROOT}/bin/python" ]]; then
  conda env create --prefix "${ENV_ROOT}" --file "${MEGASAM_ROOT}/environment.yml"
fi
conda activate "${ENV_ROOT}"
conda install -y -c conda-forge ffmpeg

mkdir -p "${HOME_ROOT}/downloads" "${MEGASAM_ROOT}/Depth-Anything/checkpoints"
XFORMERS_ARCHIVE="${HOME_ROOT}/downloads/xformers-0.0.22.post7-py310_cu11.8.0_pyt2.0.1.tar.bz2"
if [[ ! -f "${XFORMERS_ARCHIVE}" ]]; then
  curl -fL -o "${XFORMERS_ARCHIVE}" \
    https://anaconda.org/xformers/xformers/0.0.22.post7/download/linux-64/xformers-0.0.22.post7-py310_cu11.8.0_pyt2.0.1.tar.bz2
fi
conda install -y "${XFORMERS_ARCHIVE}"

DEPTH_WEIGHT="${MEGASAM_ROOT}/Depth-Anything/checkpoints/depth_anything_vitl14.pth"
if [[ ! -f "${DEPTH_WEIGHT}" ]]; then
  curl -fL -o "${DEPTH_WEIGHT}.tmp" \
    https://huggingface.co/spaces/LiheYoung/Depth-Anything/resolve/main/checkpoints/depth_anything_vitl14.pth
  printf '%s  %s\n' "${DEPTH_SHA256}" "${DEPTH_WEIGHT}.tmp" | sha256sum -c -
  mv "${DEPTH_WEIGHT}.tmp" "${DEPTH_WEIGHT}"
fi
printf '%s  %s\n' "${DEPTH_SHA256}" "${DEPTH_WEIGHT}" | sha256sum -c -

python -m pip install -r "${PROJECT_ROOT}/requirements.txt"
(cd "${MEGASAM_ROOT}/base" && python setup.py install)

export HF_HOME="${HF_HOME:-${HOME_ROOT}/cache/huggingface}"
export PYTHONPATH="${MEGASAM_ROOT}/UniDepth${PYTHONPATH:+:${PYTHONPATH}}"
mkdir -p "${HF_HOME}"
python - <<'PY'
from unidepth.models import UniDepthV2
UniDepthV2.from_pretrained(
    "lpiccinelli/unidepth-v2-vitl14",
    revision="1d0d3c52f60b5164629d279bb9a7546458e6dcc4",
)
PY

python - <<'PY'
import torch
import sys
import torchvision
import xformers
import unidepth
import lietorch
import droid_backends
assert sys.version_info[:2] == (3, 10)
assert torch.__version__.startswith("2.0.1")
assert torch.version.cuda == "11.8"
assert torchvision.__version__.startswith("0.15.2")
assert torch.cuda.is_available()
print(torch.cuda.get_device_name(0), xformers.__version__)
PY

printf 'HyperAI MegaSaM environment is ready.\n'
