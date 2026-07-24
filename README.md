# CAM//TRACE — Video to Camera Motion

CAM//TRACE 从普通视频中重建逐帧相机运动，并在浏览器中交互式展示三维轨迹。前端、HTTP API 与 GPU 算法完全分层；页面展示的文件参数、任务状态、XYZ 和四元数均来自真实服务端与 MegaSaM 输出，不包含 Mock 数据。

## 系统结构

```text
frontend/ (React + TypeScript + Three.js)
        │ /api
        ▼
api.py (FastAPI)
        │
        ├── ffprobe：真实视频参数
        ├── service.py：任务隔离、校验、队列与打包
        ├── video_to_camera.py：MegaSaM 重建与轨迹导出
        └── render_camera_trajectory_video.py：多视角 MP4
```

完整接口和设备数据约定见 [API_AND_DEVICE_PROTOCOL.md](API_AND_DEVICE_PROTOCOL.md)，输出字段见 [OUTPUT_FORMAT.md](OUTPUT_FORMAT.md)。

## 环境要求

真实重建必须运行在 NVIDIA GPU Linux 主机：

- Python 3.10
- NVIDIA GPU
- MegaSaM 及其模型
- CUDA 11.8 + PyTorch 2.0.1（RTX 3090 官方环境）
- CUDA 12.8 + PyTorch 2.8（RTX 5090 适配环境）
- ffmpeg / ffprobe
- Node.js 20+ 与 npm（构建前端）

Windows 可用于开发和构建前端，但不能运行依赖 `fcntl`、CUDA 扩展和 MegaSaM 的真实 GPU 重建。

## 安装

### 1. Python API 依赖

```bash
python -m pip install -r requirements.txt
```

### 2. 前端依赖与构建

```bash
cd frontend
npm ci
npm run build
cd ..
```

生产构建输出到 `frontend/dist`，FastAPI 会自动托管这个目录。

### 3. MegaSaM / HyperAI

将仓库放在：

```text
/hyperai/home/videotocamera
```

RTX 3090：

```bash
bash /hyperai/home/videotocamera/hyperai_install.sh
```

RTX 5090 / Blackwell：

```bash
bash /hyperai/home/videotocamera/hyperai_install_blackwell.sh
```

安装脚本会准备 MegaSaM、Depth Anything、UniDepth 和 CUDA 扩展。前端仍需使用 Node.js 单独执行 `npm ci && npm run build`。

## 配置

参考 [hyperai.env.example](hyperai.env.example)：

```bash
export VTC_PROJECT_ROOT=/hyperai/home/videotocamera
export VTC_MEGASAM_ROOT=/hyperai/home/mega-sam
export VTC_RUNTIME_ROOT=/hyperai/home/vtc-runtime
export VTC_GPU=0
export VTC_HOST=0.0.0.0
export VTC_PORT=7860
export VTC_AUTH_USER=your-user
export VTC_AUTH_PASSWORD=your-secret
```

生产环境必须设置用户名和强密码。未配置认证时，API 只适合本机开发，不能暴露到公网。

主要限制：

| 配置 | 默认值 |
| --- | --- |
| `VTC_MAX_UPLOAD_MB` | 200 MB |
| `VTC_MAX_DURATION_SECONDS` | 60 秒 |
| `VTC_MIN_FRAMES` | 8 |
| `VTC_MAX_FRAMES` | 1000 |
| `VTC_MAX_WIDTH` / `VTC_MAX_HEIGHT` | 3840 / 2160 |
| `VTC_JOB_TIMEOUT_SECONDS` | 1800 秒 |
| `VTC_RESULT_TTL_SECONDS` | 3600 秒 |

## 启动方式

### 生产 / HyperAI 一体化启动

确认已经构建 `frontend/dist` 后：

```bash
bash /hyperai/home/videotocamera/hyperai_start.sh
```

默认访问：

```text
http://<server>:7860
```

健康检查：

```bash
curl http://127.0.0.1:7860/api/health
```

### 前后端分离开发

终端 1，启动真实 API：

```bash
python -m uvicorn api:app --host 127.0.0.1 --port 8000 --reload
```

终端 2，启动 Vite：

```bash
cd frontend
npm run dev
```

访问 `http://localhost:5173`。Vite 会把 `/api` 代理到 `http://localhost:8000`。

注意：真实视频重建仍要求终端 1 位于已经配置 MegaSaM 的 Linux GPU 环境中。前端不再提供离线 Mock 回退；API 不可用时会明确显示请求失败。

## 页面使用方式

1. 打开 CAM//TRACE 单页工作区。
2. 将视频拖入“上传一个视频”，或点击选择文件。
3. 点击“开始解析与重建”。
4. 右侧参数来自服务端 `ffprobe`；解析前字段显示 Loading。
5. 等待任务依次经过校验、GPU 排队、MegaSaM 重建、轨迹验证和打包。
6. 完成后，同一主体区域自动显示 Three.js 三维轨迹。
7. 拖动轨迹画布旋转，使用时间轴、播放和倍速控制逐帧检查。
8. 右侧读取当前算法帧的 XYZ 与 `x,y,z,w` 四元数。
9. 页面下方任务队列可重新打开历史任务。
10. 也可使用“导入已有轨迹”读取服务生成的 ZIP、CSV、JSON 或 JSONL。

服务返回的数据集包含：

```text
camera_pose_stamped.jsonl
camera_trajectory.csv
camera_cartesian_trajectory.json
manifest.json
```

## 命令行使用

不启动 Web 服务时，也可以直接运行算法：

```bash
python video_to_camera.py all dance.mp4 \
  --megasam-root /opt/mega-sam \
  --scene dance \
  --work-dir work \
  --output-dir output/dance
```

已有 MegaSaM NPZ 时只导出：

```bash
python video_to_camera.py export outputs/dance_droid.npz \
  --video dance.mp4 \
  --output-dir output/dance
```

提供外部尺度标定：

```bash
python video_to_camera.py export outputs/dance_droid.npz \
  --video dance.mp4 \
  --meters-per-unit 0.42 \
  --output-dir output/dance
```

离线查看轨迹：

```bash
python visualize_camera_trajectory.py camera_dataset_<job_id>.zip
```

生成多视角轨迹视频：

```bash
python render_camera_trajectory_video.py camera_dataset_<job_id>.zip \
  --output camera_trajectory_multiview.mp4
```

## 测试与构建验证

Python：

```bash
python -m unittest discover -s tests -v
python -m py_compile api.py service.py video_to_camera.py
```

前端：

```bash
cd frontend
npm run build
```

## 更新部署

拉取并重启：

```bash
bash /hyperai/home/videotocamera/hyperai_update.sh
```

脚本只接受 fast-forward 更新，存在未提交文件时拒绝覆盖；拉取后会检查 Python 语法、执行 `npm ci && npm run build`，全部成功后才停止旧服务并启动新版本。

## 设备安全

输出是单目相机重建轨迹，不是机械臂末端轨迹或可执行命令。未标定时长度单位为 `reconstruction_unit`，而不是米；时间是视频相对时间，而不是 ROS clock。投入设备前必须完成尺度标定、坐标变换、手眼标定、轨迹平滑、速度/加速度限制、碰撞检查和低速验证。

所有原始输出固定包含：

```json
{"robot_execution_ready": false}
```
