# 数据输出说明

Video to Camera 服务返回一个名为 `camera_dataset_<job_id>.zip` 的数据集压缩包。压缩包内包含逐帧相机位姿、表格轨迹、笛卡尔轨迹和任务清单：

```text
camera_dataset_<job_id>.zip
├── camera_pose_stamped.jsonl
├── camera_trajectory.csv
├── camera_cartesian_trajectory.json
└── manifest.json
```

四个文件均使用 UTF-8 编码。三个轨迹文件表示同一组逐帧位姿，只是组织形式不同；记录数应与源视频帧数一致。

## 通用约定

### 位姿含义

每个输出位姿都是齐次变换 `frame_id_T_child_frame_id`，表示相机坐标系 `camera` 在父坐标系 `frame_id` 中的位置和方向。它来自 MegaSaM 的 camera-to-world 变换 `cam_c2w`。

服务默认把第一帧归一化为原点：

```text
camera0_T_camera_i = inverse(world_T_camera0) * world_T_camera_i
```

因此默认值为：

- `frame_id`: `reconstruction_camera0`
- `child_frame_id`: `camera`
- 第一帧位置：`[0, 0, 0]`
- 第一帧姿态：`[0, 0, 0, 1]`
- 父坐标轴：第一帧相机的 OpenCV optical 坐标轴，即 x 向右、y 向下、z 向前
- 相机坐标轴：OpenCV optical 坐标轴，即 x 向右、y 向下、z 向前

CLI 使用 `--keep-first-pose` 时不做首帧归一化，此时 `frame_id` 为 `reconstruction_world_raw`，其世界坐标轴约定未定义。上传服务始终使用首帧归一化。

### 位置与姿态

- 位置采用 `x, y, z` 或数组 `[x, y, z]`。
- 姿态采用单位四元数，顺序为 `x, y, z, w`，不是 `w, x, y, z`。
- 导出器会保持相邻四元数符号连续，但 `q` 与 `-q` 仍表示同一个旋转。
- 未提供外部尺度标定时，位置单位为 `reconstruction_unit`，不能解释为米。
- CLI 使用 `--meters-per-unit` 完成外部尺度换算后，位置单位才会标为 `meter`。

### 时间

- `time_from_start_s` 的单位为秒，第一帧为 `0.0`。
- `timestamp_quality: source_frame_pts` 表示时间来自源视频逐帧 PTS。
- `timestamp_quality: synthetic_uniform_fps` 表示没有源视频 PTS，时间由 `frame / fps` 均匀生成。
- `header.stamp` 是媒体开始后的相对时间，不是 Unix 时间，也不是 ROS clock 时间。

## camera_pose_stamped.jsonl

JSON Lines 文件，每一行是一个完整 JSON 对象，对应一帧。该格式字段布局兼容 `geometry_msgs/PoseStamped`，但还包含尺度、时间质量和安全状态等元数据。

示例：

```json
{"schema":"camera_pose_stamped/v2","message_compatibility":"geometry_msgs/PoseStamped","frame_index":0,"time_from_start_s":0.0,"timestamp_quality":"source_frame_pts","stamp_basis":"media_time_from_start_not_ros_clock","length_unit":"reconstruction_unit","coordinate_domain":"camera_reconstruction","robot_execution_ready":false,"header":{"stamp":{"sec":0,"nanosec":0},"frame_id":"reconstruction_camera0"},"pose":{"position":{"x":0.0,"y":0.0,"z":0.0},"orientation":{"x":0.0,"y":0.0,"z":0.0,"w":1.0}}}
```

字段说明：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `schema` | string | 固定为 `camera_pose_stamped/v2`。 |
| `message_compatibility` | string | 固定为 `geometry_msgs/PoseStamped`，表示核心字段布局兼容该消息。 |
| `frame_index` | integer | 从 0 开始的视频帧序号。 |
| `time_from_start_s` | number | 从第一帧开始计算的媒体相对时间，单位秒。 |
| `timestamp_quality` | string | `source_frame_pts` 或 `synthetic_uniform_fps`。 |
| `stamp_basis` | string | 固定为 `media_time_from_start_not_ros_clock`。 |
| `length_unit` | string | `reconstruction_unit` 或经过标定后的 `meter`。 |
| `coordinate_domain` | string | 固定为 `camera_reconstruction`。 |
| `robot_execution_ready` | boolean | 当前固定为 `false`。 |
| `header.stamp.sec` | integer | 相对时间的整数秒部分。 |
| `header.stamp.nanosec` | integer | 相对时间的纳秒部分。 |
| `header.frame_id` | string | 位姿的父坐标系。 |
| `pose.position` | object | 相机位置，包含 `x`、`y`、`z`。 |
| `pose.orientation` | object | 相机单位四元数，包含 `x`、`y`、`z`、`w`。 |

按行读取示例：

```python
import json

with open("camera_pose_stamped.jsonl", encoding="utf-8") as source:
    poses = [json.loads(line) for line in source]

first_position = poses[0]["pose"]["position"]
```

## camera_trajectory.csv

CSV 文件适合使用 Excel、pandas、NumPy 或绘图工具读取。第一行为表头，每个后续行对应一帧：

```text
frame,time_from_start_s,timestamp_quality,frame_id,length_unit,coordinate_domain,robot_execution_ready,x,y,z,qx,qy,qz,qw
```

| 列 | 说明 |
| --- | --- |
| `frame` | 从 0 开始的视频帧序号。 |
| `time_from_start_s` | 媒体相对时间，单位秒。 |
| `timestamp_quality` | 时间戳来源。 |
| `frame_id` | 位姿的父坐标系。 |
| `length_unit` | 平移单位。 |
| `coordinate_domain` | 固定为 `camera_reconstruction`。 |
| `robot_execution_ready` | 固定为 `False`。 |
| `x, y, z` | 相机位置。 |
| `qx, qy, qz, qw` | 相机单位四元数。 |

pandas 读取示例：

```python
import pandas as pd

trajectory = pd.read_csv("camera_trajectory.csv")
positions = trajectory[["x", "y", "z"]].to_numpy()
quaternions_xyzw = trajectory[["qx", "qy", "qz", "qw"]].to_numpy()
```

## camera_cartesian_trajectory.json

该文件把整条轨迹保存在一个 JSON 对象中，适合需要同时读取轨迹元数据和全部点位的程序。

结构示例：

```json
{
  "type": "cartesian_trajectory",
  "schema_version": 1,
  "frame_id": "reconstruction_camera0",
  "child_frame_id": "camera",
  "transform": "frame_id_T_child_frame_id",
  "coordinate_domain": "camera_reconstruction",
  "robot_execution_ready": false,
  "parent_axis_convention": "camera0_opencv_optical_x_right_y_down_z_forward",
  "child_axis_convention": "opencv_optical_x_right_y_down_z_forward",
  "units": {
    "length": "reconstruction_unit",
    "orientation": "unit_quaternion_xyzw",
    "time": "second"
  },
  "source": {
    "format": "MegaSaM cam_c2w",
    "fps": 30.0,
    "time_basis": "source_frame_pts",
    "first_pose_normalized": true,
    "meters_per_reconstruction_unit": null,
    "metric_scale_calibrated": false
  },
  "points": [
    {
      "time_from_start_s": 0.0,
      "frame_index": 0,
      "position_xyz": [0.0, 0.0, 0.0],
      "orientation_xyzw": [0.0, 0.0, 0.0, 1.0]
    }
  ]
}
```

主要字段：

| 字段 | 说明 |
| --- | --- |
| `type` | 固定为 `cartesian_trajectory`。 |
| `schema_version` | 当前为 `1`。 |
| `frame_id` | 位姿的父坐标系。 |
| `child_frame_id` | 固定为 `camera`。 |
| `transform` | 固定为 `frame_id_T_child_frame_id`。 |
| `parent_axis_convention` | 父坐标系的轴约定。 |
| `child_axis_convention` | 相机坐标系的轴约定。 |
| `units` | 长度、姿态和时间的单位或编码。 |
| `source.fps` | 源视频平均帧率或 CLI 指定帧率。 |
| `source.time_basis` | 时间戳来源。 |
| `source.first_pose_normalized` | 是否将第一帧归一化为原点。 |
| `source.meters_per_reconstruction_unit` | 外部标定比例；未标定时为 `null`。 |
| `source.metric_scale_calibrated` | 是否已经完成尺度标定。 |
| `points` | 按帧顺序排列的位姿点。 |

该格式只定义离散位姿点，不定义点间插值、速度、加速度或运动约束。

## manifest.json

任务清单记录输入视频、处理状态和压缩包内三个轨迹文件的 SHA-256，可用于完整性检查和数据追踪。

主要字段：

| 字段 | 说明 |
| --- | --- |
| `schema_version` | manifest schema 版本，当前为 `1`。 |
| `job_id` | 服务为任务生成的 UUID。 |
| `status` | 成功数据集固定为 `succeeded`。 |
| `created_at` | 任务创建时间，UTC ISO 8601。 |
| `completed_at` | 任务完成时间，UTC ISO 8601。 |
| `source.original_name` | 经过安全化处理的源文件名。 |
| `source.size_bytes` | 源视频字节数。 |
| `source.sha256` | 源视频 SHA-256。 |
| `source.codec` | 视频编码名称，例如 `h264`。 |
| `source.duration_seconds` | 视频时长。 |
| `source.width`, `source.height` | 视频分辨率。 |
| `source.frame_count` | 解码得到的帧数，也是预期位姿数。 |
| `pipeline.name` | 处理管线名称。 |
| `pipeline.first_pose_normalized` | 上传服务固定为 `true`。 |
| `pipeline.robot_execution_ready` | 固定为 `false`。 |
| `outputs` | 三个轨迹文件的文件名、字节数和 SHA-256。 |

## 完整性检查

建议消费者至少检查：

1. ZIP 可以完整解压，没有 CRC 错误。
2. `manifest.json` 的 `status` 为 `succeeded`。
3. 三个轨迹文件均存在，且 SHA-256 与 `manifest.json` 一致。
4. 三个轨迹文件的记录数均等于 `source.frame_count`。
5. `frame_index` 从 0 连续递增。
6. 所有位置和四元数均为有限数值。
7. 四元数长度接近 1。

## 安全限制

所有输出都明确标记：

```json
"robot_execution_ready": false
```

这些数据是相机重建轨迹，不是可直接发送给机械臂的执行轨迹。投入机器人系统前，至少需要完成：

1. 重建坐标系到机器人世界坐标系的外参标定和轴向转换。
2. 单目重建尺度标定，确认长度单位为米。
3. 相机运动到末端执行器运动的手眼变换和初始位姿偏置。
4. 轨迹平滑、重采样以及速度、加速度、工作空间和奇异点约束。
5. 仿真、碰撞检查和低速验证。

仅修改 `frame_id`、单位字符串或 `robot_execution_ready` 标志，不会使轨迹自动具备机器人执行安全性。

## 三维可视化

项目附带 `visualize_camera_trajectory.py`，可以直接读取完整 ZIP 或任一轨迹文件：

```bash
python visualize_camera_trajectory.py camera_dataset_<job_id>.zip
```

保存为静态图片：

```bash
python visualize_camera_trajectory.py camera_dataset_<job_id>.zip --save trajectory.png --no-show
```

图中蓝线表示相机路径，绿点和红点分别表示起点和终点，灰色线框表示抽样相机视锥，橙线表示相机 optical z 轴方向。
