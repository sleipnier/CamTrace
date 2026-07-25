# Video to Camera Motion

输入普通视频，重建逐帧相机运动，并导出统一的笛卡尔位姿数据。时间单位为秒、姿态为 Quaternion `x,y,z,w`。未经外部尺度标定时，长度明确标为 `reconstruction_unit`。


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

