# CAM//TRACE 接口与设备数据传输协议

本文档是前端、FastAPI 服务、MegaSaM GPU 算法以及下游设备之间的接口契约。接口实现位于 `api.py`，前端类型位于 `frontend/src/api/types.ts`。

## 1. 系统边界

```text
Browser (React)
  │ HTTPS / JSON / multipart
  ▼
FastAPI (`api.py`)
  │ 本地文件 + Python subprocess
  ▼
MegaSaM / Depth Anything / UniDepth (NVIDIA GPU)
  │ NPZ `cam_c2w`
  ▼
Exporter (`video_to_camera.py`)
  │ ZIP / JSON / JSONL / CSV
  ▼
Browser / offline consumer / calibrated robot adapter
```

当前系统**不会直接向机器人、相机、PLC 或运动控制器发送命令**。设备侧输出只是相机重建轨迹，所有记录固定为 `robot_execution_ready: false`。

## 2. 通用 HTTP 约定

- API 前缀：`/api`
- 编码：JSON 和文本统一 UTF-8
- 时间：UTC ISO 8601；轨迹时间为视频开始后的相对秒
- 上传：`multipart/form-data`
- 下载：ZIP、JSON、JSONL、CSV 或 MP4 二进制
- 认证：配置 `VTC_AUTH_USER` 与 `VTC_AUTH_PASSWORD` 后使用 HTTP Basic Auth
- 同源生产部署：FastAPI 同时托管 `frontend/dist`

统一错误结构：

```json
{
  "code": "INVALID_TRAJECTORY",
  "message": "可安全展示给用户的错误说明"
}
```

## 3. 前端 ↔ 服务端接口

### 3.1 健康检查

```http
GET /api/health
```

无需认证。响应：

```json
{"status":"ok","service":"camera-trace-api"}
```

### 3.2 创建视频重建任务

```http
POST /api/jobs
Content-Type: multipart/form-data

video=<video binary>
```

限制：200 MB、60 秒、8～1000 帧、最大 3840×2160；格式为 MP4、MOV、MKV、AVI、WEBM 或 M4V。

响应 `201`：

```json
{
  "id": "vtc_0123456789ab",
  "status": "uploaded",
  "createdAt": "2026-07-24T08:00:00+00:00",
  "source": {
    "originalName": "input.mp4",
    "sizeBytes": 10485760,
    "codec": "pending",
    "durationSeconds": 0,
    "width": 0,
    "height": 0,
    "frameCount": 0,
    "fps": 0
  },
  "progress": {"percent":5,"stageLabel":"视频已安全上传"},
  "robotExecutionReady": false,
  "artifacts": []
}
```

### 3.3 查询任务列表

```http
GET /api/jobs?status=<optional>&limit=20&cursor=<optional>
```

响应：`{"items": JobDetail[], "nextCursor": "..."}`。结果按创建时间和任务 ID 倒序；存在下一页时返回不透明的 `nextCursor`，客户端必须原样回传，不应解析或自行构造。

### 3.4 查询任务详情

```http
GET /api/jobs/{job_id}
```

状态枚举：

~~~text
uploaded → validating → queued → reconstructing → packaging → succeeded
                                                           └→ failed
~~~

进度字段是阶段性提示，不表示算法内部逐帧完成比例：

| percent | status | stageLabel 含义 |
| ---: | --- | --- |
| 5 | uploaded | 视频已保存 |
| 15 | validating | ffprobe 解析与业务校验 |
| 28 | queued | 校验完成，准备进入 GPU 队列 |
| 45 | reconstructing | 等待 .vtc-gpu.lock，或执行抽帧、Depth Anything、UniDepth、MegaSaM |
| 90 | packaging | 输出校验、哈希和 ZIP 打包 |
| 100 | succeeded | 结果就绪 |

45% 覆盖 GPU 文件锁等待和完整重建子进程。当前子进程不会持续向 API 上报内部百分比，因此数分钟保持 45% 属于正常现象，不能单凭百分比不变判断任务卡死。GPU 锁等待和 GPU 子进程分别受 VTC_JOB_TIMEOUT_SECONDS 控制，默认各为 1800 秒。

视频参数只在 `ffprobe` 成功后返回真实值。成功后增加 `datasetJobId`、`resultAvailable` 和 `resultExpiresAt`。其中 `resultAvailable` 由服务端根据 ZIP 是否仍实际存在动态计算；任务记录可以保留，但结果文件可能按 TTL 清理。

成功后增加：

```json
{
  "frameId": "reconstruction_camera0",
  "lengthUnit": "reconstruction_unit",
  "outputCount": 258,
  "datasetJobId": "algorithm_dataset_uuid",
  "resultAvailable": true,
  "resultExpiresAt": "2026-07-24T09:00:00+00:00",
  "robotExecutionReady": false,
  "artifacts": [
    {
      "kind": "dataset",
      "name": "camera_dataset_<algorithm_job_id>.zip",
      "sizeBytes": 123456,
      "sha256": "...",
      "downloadUrl": "/api/jobs/{job_id}/dataset"
    }
  ]
}
```

### 3.5 取消排队任务

```http
POST /api/jobs/{job_id}/cancel
```

仅在线程任务尚未开始时可取消。GPU 子进程已经运行后，为避免产生不完整设备状态，返回 `409 JOB_NOT_CANCELLABLE`。

### 3.6 下载完整数据集

```http
GET /api/jobs/{job_id}/dataset
```

响应为 `application/zip`，包含：

```text
camera_pose_stamped.jsonl
camera_trajectory.csv
camera_cartesian_trajectory.json
manifest.json
```

### 3.7 下载单个产物

```http
GET /api/jobs/{job_id}/artifacts/{name}
```

`name` 只允许上述四个固定文件名，禁止任意路径访问。

### 3.8 获取浏览器轨迹

```http
GET /api/jobs/{job_id}/trajectory
```

服务端从真实 ZIP 中读取并校验 `camera_cartesian_trajectory.json`，转换为：

```json
{
  "jobId": "vtc_0123456789ab",
  "frameId": "reconstruction_camera0",
  "childFrameId": "camera",
  "lengthUnit": "reconstruction_unit",
  "fps": 30.0,
  "firstPoseNormalized": true,
  "robotExecutionReady": false,
  "points": [
    {
      "frameIndex": 0,
      "timeFromStartS": 0.0,
      "positionXYZ": [0.0,0.0,0.0],
      "orientationXYZW": [0.0,0.0,0.0,1.0]
    }
  ]
}
```

Three.js 只负责绘制这些服务端位姿，不生成、不平滑也不修改轨迹。

### 3.9 解析已有轨迹

```http
POST /api/trajectories/parse
Content-Type: multipart/form-data

trajectory=<ZIP|CSV|JSON|JSONL binary>
```

限制为 25 MB 和最多 1000 个位姿。响应与 3.8 相同。所有数值必须有限，时间非递减，四元数非零。

### 3.10 创建多视角 MP4

```http
POST /api/visualizations
Content-Type: multipart/form-data

trajectory=<binary>
fps=24
speed=1
```

`fps` 为 10～60，`speed` 为 0.25～4。响应：

```json
{"id":"viz_0123456789ab","status":"queued","progressPercent":0}
```

### 3.11 查询及下载 MP4

```http
GET /api/visualizations/{id}
GET /api/visualizations/{id}/video
GET /api/visualizations/{id}/video?download=1
```

状态：`queued | rendering | succeeded | failed`。状态会持久化到运行目录；服务重启时，已完成任务仍可查询，正在排队或渲染的任务会转为 `failed / SERVICE_RESTARTED`。

## 4. 服务端 ↔ GPU 算法协议

服务端不通过网络 RPC 调用 GPU，而是在同一 Linux 主机通过隔离子进程执行：

```bash
python -I video_to_camera.py all <video> \
  --megasam-root <root> \
  --scene job_<uuid> \
  --work-dir <task>/work \
  --output-dir <task>/output \
  --gpu <index>
```

传输介质与责任：

| 阶段 | 输入 | 输出 | 校验 |
| --- | --- | --- | --- |
| ffprobe | 原视频文件 | codec、尺寸、时长、帧数、FPS | 服务端业务限制 |
| Depth Anything | 解码视频帧 | 相对深度 | 算法进程退出码 |
| UniDepth | 解码视频帧 | 度量深度估计 | 算法进程退出码 |
| MegaSaM | 帧与深度 | NPZ `cam_c2w` | 位姿数必须等于帧数 |
| Exporter | `cam_c2w` + 视频 PTS | JSONL、CSV、Cartesian JSON | 有限数、索引连续、首帧归一化 |
| Packager | 三个轨迹文件 | ZIP + manifest | CRC、SHA-256、记录数 |

跨进程 .vtc-gpu.lock 使用 fcntl.flock，保证同一 MegaSaM 根目录一次只有一个 GPU 重建任务。API 在调用 run_pipeline() 前把任务更新为 45%，而文件锁在 run_pipeline() 内获取，所以 45% 既可能表示等待锁，也可能表示 GPU 算法正在运行。

标准输出和错误写入任务 pipeline.log，不作为结构化数据协议。成功任务结束后临时工作目录会被清理；失败任务的日志复制到 <runtime>/errors/<algorithm_job_id>.log。服务重启时，遗留的非终态任务会转为 failed / SERVICE_RESTARTED。

## 5. 服务端 ↔ 下游设备协议

### 5.1 当前提供的设备数据格式

- `camera_pose_stamped.jsonl`：兼容 ROS `geometry_msgs/PoseStamped` 字段布局
- `camera_trajectory.csv`：表格/数值处理
- `camera_cartesian_trajectory.json`：完整离散笛卡尔轨迹
- `manifest.json`：来源、状态、哈希和安全元数据

坐标约定：

- 变换：`frame_id_T_child_frame_id`
- 默认父坐标系：`reconstruction_camera0`
- 子坐标系：`camera`
- 相机轴：OpenCV optical，X 右、Y 下、Z 前
- 姿态：单位四元数 `x,y,z,w`
- 时间：视频开始后的相对秒，不是 Unix 或 ROS clock
- 未标定长度：`reconstruction_unit`，不能按米解释

### 5.2 禁止直接执行

当前没有 ROS topic、WebSocket、Modbus、CAN、EtherCAT、机械臂 SDK 或 `move_to_pose` 接口。任何设备适配器在发送运动命令前必须完成：

1. `robot_world_T_reconstruction_world` 外参和轴向转换。
2. 单目重建尺度标定，将 `reconstruction_unit` 转成米。
3. 相机到末端执行器的手眼变换和初始位姿偏置。
4. 重采样、平滑、速度/加速度/工作空间/奇异点限制。
5. 仿真、碰撞检查与低速验证。
6. 只有设备侧独立安全检查通过后，才允许生成新的执行级协议；不得修改原始文件的 `robot_execution_ready` 来绕过检查。

## 6. HTTP 状态码

| 状态码 | 含义 |
| --- | --- |
| 200/201 | 成功 |
| 401 | Basic Auth 失败 |
| 404 | 任务或产物不存在 |
| 409 | 状态未就绪或不可取消 |
| 410 | 结果已过期清理 |
| 413 | 上传超过大小限制 |
| 422 | 视频/轨迹/参数校验失败 |
| 500 | 未预期服务错误 |
