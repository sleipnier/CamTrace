#!/usr/bin/env bash
set -euo pipefail

HOME_ROOT="${VTC_HOME:-/hyperai/home}"
PROJECT_ROOT="${VTC_PROJECT_ROOT:-${HOME_ROOT}/videotocamera}"
MEGASAM_ROOT="${VTC_MEGASAM_ROOT:-${HOME_ROOT}/mega-sam}"
MEGASAM_COMMIT="a27b4e633c5cc0828a62ed943ef9f6505705fd3f"
DEPTH_SHA256="6c6a383e33e51c5fdfbf31e7ebcda943973a9e6a1cbef1564afe58d7f2e8fe63"

python - <<'PY'
import sys
import torch

assert sys.version_info[:2] == (3, 10), sys.version
assert torch.__version__.startswith("2.8.0"), torch.__version__
assert torch.version.cuda == "12.8", torch.version.cuda
assert torch.cuda.get_device_capability() == (12, 0)
assert "sm_120" in torch.cuda.get_arch_list()
PY
nvcc --version | grep -q 'release 12.8'

if [[ ! -d "${MEGASAM_ROOT}/.git" ]]; then
  git clone --recursive https://github.com/mega-sam/mega-sam.git "${MEGASAM_ROOT}"
fi
git -C "${MEGASAM_ROOT}" checkout --detach "${MEGASAM_COMMIT}"
git -C "${MEGASAM_ROOT}" submodule update --init --recursive

python - "${MEGASAM_ROOT}/base/setup.py" <<'PY'
import re
import sys
from pathlib import Path

path = Path(sys.argv[1])
source = path.read_text()
source = re.sub(r"\s*'-gencode=arch=compute_(70|75|80|86),code=sm_\1',", "", source)
source = source.replace(
    "'-O3',",
    "'-O3', '-gencode=arch=compute_120,code=sm_120', '-gencode=arch=compute_120,code=compute_120',",
)
source = source.replace(
    "'-O2',",
    "'-O2', '-gencode=arch=compute_120,code=sm_120', '-gencode=arch=compute_120,code=compute_120',",
)
path.write_text(source)
PY

sed -i 's/\.type()/\.scalar_type()/g' \
  "${MEGASAM_ROOT}/base/src/altcorr_kernel.cu" \
  "${MEGASAM_ROOT}/base/src/correlation_kernels.cu" \
  "${MEGASAM_ROOT}/base/thirdparty/lietorch/lietorch/src/lietorch_cpu.cpp" \
  "${MEGASAM_ROOT}/base/thirdparty/lietorch/lietorch/src/lietorch_gpu.cu"

pip install \
  numpy==1.26.3 opencv-python-headless==4.9.0.80 tqdm==4.67.1 \
  imageio==2.36.0 einops==0.8.0 scipy==1.14.1 matplotlib==3.9.2 \
  wandb==0.18.7 timm==1.0.7 ninja==1.11.1 huggingface-hub==0.36.0 \
  kornia==0.7.4 gradio==5.50.0
pip install torch-scatter -f https://data.pyg.org/whl/torch-2.8.0+cu128.html
pip install xformers==0.0.32.post2 --index-url https://download.pytorch.org/whl/cu128

rm -rf "${MEGASAM_ROOT}/base/build" \
  "${MEGASAM_ROOT}/base/droid_backends.egg-info" \
  "${MEGASAM_ROOT}/base/lietorch.egg-info"
(cd "${MEGASAM_ROOT}/base" && python setup.py install)

curl -fsSL \
  https://raw.githubusercontent.com/facebookresearch/xformers/v0.0.24/xformers/components/attention/nystrom.py \
  -o "${MEGASAM_ROOT}/UniDepth/unidepth/layers/nystrom_xformers_024.py"
sed -i \
  's/from xformers.components.attention import NystromAttention/from .nystrom_xformers_024 import NystromAttention/' \
  "${MEGASAM_ROOT}/UniDepth/unidepth/layers/nystrom_attention.py"

mkdir -p "${MEGASAM_ROOT}/Depth-Anything/checkpoints" "${HOME_ROOT}/cache/huggingface"
DEPTH_WEIGHT="${MEGASAM_ROOT}/Depth-Anything/checkpoints/depth_anything_vitl14.pth"
if [[ ! -f "${DEPTH_WEIGHT}" ]]; then
  curl -fL --retry 3 -o "${DEPTH_WEIGHT}.tmp" \
    https://huggingface.co/spaces/LiheYoung/Depth-Anything/resolve/main/checkpoints/depth_anything_vitl14.pth
  printf '%s  %s\n' "${DEPTH_SHA256}" "${DEPTH_WEIGHT}.tmp" | sha256sum -c -
  mv "${DEPTH_WEIGHT}.tmp" "${DEPTH_WEIGHT}"
fi
printf '%s  %s\n' "${DEPTH_SHA256}" "${DEPTH_WEIGHT}" | sha256sum -c -

export HF_HOME="${HOME_ROOT}/cache/huggingface"
export PYTHONPATH="${MEGASAM_ROOT}/UniDepth${PYTHONPATH:+:${PYTHONPATH}}"
python - <<'PY'
import torch
import droid_backends
from lietorch import SE3
from torch_scatter import scatter_sum
from unidepth.models import UniDepthV2
from unidepth.layers.nystrom_attention import NystromBlock

x = torch.tensor([1.0, 2.0], device="cuda")
index = torch.tensor([0, 0], device="cuda")
assert scatter_sum(x, index).item() == 3.0
assert torch.isfinite(SE3.Identity(1, device="cuda").log()).all()
block = NystromBlock(dim=32, num_heads=4).cuda().eval()
assert torch.isfinite(block(torch.randn(2, 256, 32, device="cuda"))).all()
UniDepthV2.from_pretrained(
    "lpiccinelli/unidepth-v2-vitl14",
    revision="1d0d3c52f60b5164629d279bb9a7546458e6dcc4",
)
print("RTX 5090 MegaSaM compatibility checks passed")
PY

python -m pip install -r "${PROJECT_ROOT}/requirements.txt"
