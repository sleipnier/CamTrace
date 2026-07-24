# Video to Camera Motion

输入普通视频，调用 MegaSaM 重建逐帧相机运动，并导出统一的笛卡尔位姿数据。时间单位为秒、姿态为 Quaternion `x,y,z,w`。未经外部尺度标定时，长度明确标为 `reconstruction_unit`，不会冒充物理米。

## 环境

完整重建应在 NVIDIA GPU Linux 主机上运行。MegaSaM 官方环境依赖 Python 3.10、CUDA 11.8、PyTorch 2.0.1、Depth Anything、UniDepth 和 CUDA 扩展。此工具不修改 MegaSaM，也不会在不支持 CUDA 的 macOS 上模拟运行。

本工具自身只需要：

```bash
python -m pip install -r requirements.txt
```

系统还需安装 `ffmpeg` 和 `ffprobe`。

## HyperAI CAM//TRACE Web 服务

Web 服务由 React、FastAPI 和后台 GPU 重建任务组成。FastAPI 默认在同一端口提供 /api 和已构建的 frontend/dist，不再依赖 Gradio 页面。

### 环境与安装

官方环境推荐 RTX 3090、CUDA 11.8 和 PyTorch 2.0.1，使用 hyperai_install.sh。RTX 5090 必须选择兼容 Blackwell 的 HyperAI PyTorch GPU 镜像，并使用经过实机验证的 hyperai_install_blackwell.sh 安装 CUDA 扩展；不能在 RTX 5090 上直接运行官方 CUDA 11.8 二进制。

HyperAI 中只有 /hyperai/home 会在容器停止后持久保留。项目、Python 用户包、模型、运行结果和缓存都应放在该目录下。

~~~bash
cd /hyperai/home/videotocamera  # 替换成项目实际目录

# RTX 3090
bash hyperai_install.sh

# RTX 5090
bash hyperai_install_blackwell.sh
~~~

系统还必须能够执行 ffmpeg、ffprobe 和 nvidia-smi。

### 构建并启动

首次启动或前端代码变更后构建：

~~~bash
cd /hyperai/home/videotocamera/frontend
npm install
npm run build
~~~

启动 API 与网页：

~~~bash
cd /hyperai/home/videotocamera

export VTC_PROJECT_ROOT="$PWD"
export VTC_HOME=/hyperai/home
export VTC_RUNTIME_ROOT=/hyperai/home/vtc-runtime
export VTC_MEGASAM_ROOT=/hyperai/home/mega-sam
export VTC_HOST=0.0.0.0
export VTC_PORT=7860

python api_server.py
~~~

如果项目直接位于 /hyperai/home，先进入 /hyperai/home，并仍然显式设置 VTC_PROJECT_ROOT="$PWD"，避免启动到旧的部署副本。

也可以使用：

~~~bash
VTC_PROJECT_ROOT="$PWD" VTC_HOME=/hyperai/home bash hyperai_start.sh
~~~

在 HyperAI 控制台映射容器端口 7860。健康检查：

~~~bash
curl http://127.0.0.1:7860/api/health
~~~

预期响应：

~~~json
{"status":"ok","service":"camera-trace-api"}
~~~

配置 VTC_AUTH_USER 和 VTC_AUTH_PASSWORD 后，除 /api/health 外均启用 HTTP Basic Auth。首页返回 401 通常表示服务已经运行，但请求没有携带用户名和密码。临时本地验证可在启动前执行：

~~~bash
unset VTC_AUTH_USER
unset VTC_AUTH_PASSWORD
~~~

生产映射地址不应匿名暴露。/favicon.ico 返回 404 只表示尚未配置网站图标，不影响 API 和重建功能。

### 上传限制与任务隔离

默认限制：

- 文件最大 200 MB。
- 视频最长 60 秒。
- 视频必须包含 8～1000 帧。
- 最大分辨率 3840×2160。
- 支持 MP4、MOV、MKV、AVI、WEBM 和 M4V。

每个上传任务使用独立 UUID、临时目录和输出目录。跨进程 .vtc-gpu.lock 保证同一 MegaSaM 根目录一次只执行一个 GPU 重建任务。成功后下载的 ZIP 包含：

~~~text
camera_pose_stamped.jsonl
camera_trajectory.csv
camera_cartesian_trajectory.json
manifest.json
~~~

manifest.json 记录输入和输出 SHA-256、视频属性、算法数据集 ID 与安全状态。大型中间文件会在任务结束后清理；最终 ZIP 按 VTC_RESULT_TTL_SECONDS 和总空间限制管理。任务记录可以继续存在，但 resultAvailable: false 表示 ZIP 已经过期或被清理。

### 任务进度说明

当前进度是阶段进度，不是模型内部的逐帧百分比：

| 百分比 | 状态 | 实际含义 |
| ---: | --- | --- |
| 5% | uploaded | 上传文件已安全保存 |
| 15% | validating | ffprobe 正在解析并校验视频 |
| 28% | queued | 视频校验完成，准备进入 GPU 队列 |
| 45% | reconstructing | 等待 GPU 文件锁，或正在执行抽帧、Depth Anything、UniDepth、MegaSaM |
| 90% | packaging | 校验轨迹并生成 ZIP 与 manifest |
| 100% | succeeded | 轨迹与下载产物就绪 |

因此任务在 45% 停留数分钟不一定是卡死。45% 覆盖 GPU 锁等待和整个重建子进程，期间目前没有更细的 API 进度回报。耗时与帧数、分辨率、首次模型加载、GPU 型号及队列长度有关；例如约 300 帧的视频在 RTX 5090 上可能需要数分钟。

VTC_JOB_TIMEOUT_SECONDS 默认是 1800 秒。GPU 锁等待和实际 GPU 子进程分别执行超时控制。不要仅因为 45% 数分钟未变化就重启服务；服务重启会把未完成任务标记为 failed / SERVICE_RESTARTED。

排查命令：

~~~bash
# 查看任务详情；未启用认证时删除 -u 参数
curl -u "$VTC_AUTH_USER:$VTC_AUTH_PASSWORD" http://127.0.0.1:7860/api/jobs/<job_id>

# 查看 GPU 与相关进程
nvidia-smi
ps -eo pid,ppid,etime,stat,cmd | grep -E 'video_to_camera|python'

# 查看失败任务保留的流水线日志
find /hyperai/home/vtc-runtime/errors -maxdepth 2 -type f -name '*.log'
~~~

成功任务的临时工作目录和 pipeline.log 会被清理；失败任务的日志复制到 vtc-runtime/errors。服务启动时，遗留的非终态任务会被标记为 SERVICE_RESTARTED，避免永久停留在处理中。

### 从 GitHub 更新 Web 页面

队友提交并合并修改后，在项目目录运行：

~~~bash
bash hyperai_update.sh
~~~

更新脚本只接受 fast-forward；存在未提交修改时会拒绝覆盖。更新后应重新构建前端、执行 Python 语法检查并重启 FastAPI。

## 一条命令处理视频

先按照 MegaSaM 官方 README 安装仓库和模型，再在它的 Conda 环境中执行：

```bash
python video_to_camera.py all dance.mp4 \
  --megasam-root /opt/mega-sam \
  --scene dance \
  --work-dir work \
  --output-dir output/dance
```

命令依次执行：

1. 从第一条视频流保留每一帧，并读取逐帧 PTS 和平均 FPS。
2. 调用 Depth Anything 生成相对深度。
3. 调用 UniDepth 生成度量深度。
4. 调用 MegaSaM 生成 `cam_c2w`。
5. 校验抽帧数与 `cam_c2w` 数量一致，将首帧归一化为原点并导出轨迹。

同一个 `--scene` 的帧、深度、重建或最终 NPZ 产物只要已经存在，命令就会拒绝继续，避免静默混入旧结果。MegaSaM 的 NPZ 最多导出 1000 帧，因此更长的视频必须先切段。

如果已经取得 `outputs/dance_droid.npz`，可以只做导出：

```bash
python video_to_camera.py export outputs/dance_droid.npz \
  --video dance.mp4 \
  --output-dir output/dance
```

如果通过已知距离标定得到 `1 reconstruction_unit = 0.42 m`，加入：

```bash
python video_to_camera.py export outputs/dance_droid.npz \
  --video dance.mp4 \
  --meters-per-unit 0.42 \
  --output-dir output/dance
```

也可以不用源视频而显式指定帧率：

```bash
python video_to_camera.py export outputs/dance_droid.npz --fps 30
```

显式 `--fps` 会生成均匀合成时间；提供 `--video` 时则使用源视频逐帧 PTS，并要求视频帧数和 NPZ 位姿数完全一致。三个目标文件默认不覆盖；确认目标是当前任务的旧导出后可显式加入 `--force`。

## 输出

完整的数据结构、字段定义、坐标约定和校验方式见 [`OUTPUT_FORMAT.md`](OUTPUT_FORMAT.md)。

使用 Matplotlib 直接查看下载数据集的三维相机路径：

```bash
python visualize_camera_trajectory.py camera_dataset_<job_id>.zip
```

蓝线是相机路径，绿点和红点分别是起点和终点，灰色线框是抽样相机视锥，橙线是镜头朝向。鼠标可以旋转和缩放视图。保存图片而不打开窗口：

```bash
python visualize_camera_trajectory.py camera_dataset_<job_id>.zip \
  --save camera_trajectory.png \
  --no-show
```

脚本也支持解压后的数据集目录，以及单独的 `camera_cartesian_trajectory.json`、`camera_pose_stamped.jsonl` 或 `camera_trajectory.csv`。通过 `--max-cameras 16` 调整显示的视锥数量，设为 `0` 则只显示轨迹。

生成同步的透视、XY、XZ 和 YZ 投影视角轨迹视频：

```bash
python render_camera_trajectory_video.py camera_dataset_<job_id>.zip \
  --output camera_trajectory_multiview.mp4
```

视频按数据集时间戳播放，用 `--speed 2` 可生成两倍速视频，`--fps 60` 可调整输出帧率。画面中的视锥和 XYZ 轴按 camera-to-parent 与 OpenCV optical 轴约定解释。`Camera POV` 面板投影一个完全由 Python 几何构造的固定不对称目标：红色鼻锥定义正面，粉色侧翼和偏心绿色天线用于区分侧面和背面，适合检查 360 度环绕运镜。目标中心默认取所有镜头 +Z 光轴的最小二乘交会点；也可通过 CLI `--target X Y Z` 或网页输入完整 XYZ。CSV 不包含真实图像、物体标签、深度或点云，因此模型不是物体检测或生成式视频结果。数据也不包含机械臂关节、连杆状态或相机到末端的手眼标定，不能当作机械臂末端轨迹或可执行命令。

CAM//TRACE Web 页面可以直接导入服务生成的 ZIP，或导入 `camera_trajectory.csv`、Cartesian JSON、PoseStamped JSONL，在 Three.js 中检查路径和相机朝向，并生成、在线预览及下载多视角 MP4。可视化输入限制为 25 MB 和最多 1000 个位姿。可视化任务状态会持久化；服务重启时，中断的渲染任务会标记为 `SERVICE_RESTARTED`，已完成记录对应的 MP4 丢失时会标记为 `VIDEO_EXPIRED`。

`camera_pose_stamped.jsonl` 每行是一帧：

```json
{"schema":"camera_pose_stamped/v2","message_compatibility":"geometry_msgs/PoseStamped","frame_index":0,"time_from_start_s":0.0,"timestamp_quality":"source_frame_pts","stamp_basis":"media_time_from_start_not_ros_clock","length_unit":"reconstruction_unit","coordinate_domain":"camera_reconstruction","robot_execution_ready":false,"header":{"stamp":{"sec":0,"nanosec":0},"frame_id":"reconstruction_camera0"},"pose":{"position":{"x":0.0,"y":0.0,"z":0.0},"orientation":{"x":0.0,"y":0.0,"z":0.0,"w":1.0}}}
```

`camera_trajectory.csv` 适合数据处理和绘图：

```text
frame,time_from_start_s,timestamp_quality,frame_id,length_unit,coordinate_domain,robot_execution_ready,x,y,z,qx,qy,qz,qw
```

`camera_cartesian_trajectory.json` 是带时间戳的离散笛卡尔位姿序列，不定义插值、速度或加速度：

```json
{
  "type": "cartesian_trajectory",
  "frame_id": "reconstruction_camera0",
  "coordinate_domain": "camera_reconstruction",
  "robot_execution_ready": false,
  "units": {
    "length": "reconstruction_unit",
    "orientation": "unit_quaternion_xyzw",
    "time": "second"
  },
  "points": []
}
```

## 坐标与机械臂

默认导出计算 `inverse(reconstruction_world_T_camera0) * reconstruction_world_T_camera_i`，因此父坐标系明确命名为 `reconstruction_camera0`；使用 `--keep-first-pose` 时才保留原始 `reconstruction_world_raw`。两者都不是机械臂 `world` 中可直接执行的末端轨迹，CLI 不允许只靠重命名把它伪装成机器人坐标系。投入机械臂前必须完成以下处理：

1. 标定 `robot_world_T_reconstruction_world`，解决相机坐标轴与机器人坐标轴的方向差异。
2. 根据实测距离校正单目重建尺度，不能把 MegaSaM 的尺度当作测量真值。
3. 计算工具初始位姿偏置，把相机姿态变化映射到末端姿态，而不是把相机绝对姿态直接覆盖到工具。
4. 重采样并平滑轨迹，限制速度、加速度、工作空间和奇异点。
5. 先在仿真和低速模式检查碰撞，再向 `move_to_pose` 或机器人轨迹控制器发送目标。

`--video` 模式使用 `best_effort_timestamp_time`，并拒绝缺失、非有限或非递增 PTS。只有显式 `--fps` 模式使用 `frame / fps`，其时间质量会标为 `synthetic_uniform_fps`，不能视为执行级时钟。

JSONL 的 `header.stamp` 是为了兼容 `geometry_msgs/PoseStamped` 字段布局而表达的媒体相对时间，不是 ROS clock 时间点；未标定时平移也不是 ROS 默认假定的米。转换为 ROS 消息前必须先完成时间映射和尺度标定。

导出会先在同一父目录完整生成 staging 文件，再发布三个目标，但文件系统无法将三个独立文件作为一个事务原子替换。不要在其他不可信进程可修改的共享输出目录中运行；消费者应在生产者退出成功后再读取整组文件。

MegaSaM 的便捷 NPZ 最多包含 1000 帧。本工具当前有意只读取明确的 `cam_c2w`，不会猜测 `poses.npy` 的 SE(3) 约定；长视频应先切段。
