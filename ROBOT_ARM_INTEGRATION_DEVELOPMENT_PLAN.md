# CAM//TRACE 与 Linux 机械臂程序接入开发计划

> 文档状态：初稿，等待机械臂与 Linux 网关信息确认  
> 编写日期：2026-07-25  
> 适用项目：CAM//TRACE React 前端、FastAPI 后端及下游 Linux 机械臂控制程序

## 1. 目标

在保留现有“视频 → 相机重建轨迹”能力的基础上，增加一条可审计、可验证、可停止的机械臂执行链路：

```text
视频上传与轨迹重建
  -> 尺度、坐标系、手眼标定转换
  -> 运动规划与安全检查
  -> 生成不可变的执行包
  -> Linux Robot Gateway 下载并二次校验
  -> 操作员确认
  -> Linux 本地通过 ROS2 或厂商 SDK 控制机械臂
  -> 状态和实际位置回传网页
```

本计划不把现有相机轨迹直接视为机械臂命令。原始输出继续保持：

```json
{"robot_execution_ready": false}
```

只有经过标定、规划和安全检查后，系统才创建新的 `robot_trajectory/v1` 执行包。不得修改原始轨迹的安全标志来绕过转换流程。

## 2. 已有能力与缺口

### 2.1 已有能力

- React 前端能够上传视频、轮询任务、导入轨迹并显示位置和姿态。
- FastAPI 能够生成、校验和下载 ZIP、JSON、JSONL、CSV 轨迹。
- `camera_pose_stamped.jsonl` 的字段布局兼容 ROS `geometry_msgs/PoseStamped`。
- 输出包含逐点相对时间、位置和 XYZW 四元数。
- 服务端已有任务持久化、统一错误处理、认证和产物 SHA-256 信息。

### 2.2 当前缺口

- 没有真实尺度到米的转换保证。
- 没有重建世界坐标系到机械臂基座坐标系的标定。
- 没有相机到机械臂末端的手眼标定管理。
- 没有 IK、关节限位、速度/加速度、奇异点和碰撞检查。
- 没有机械臂执行任务、设备状态、操作员确认和停止状态机。
- 没有与 Linux 程序通信的协议和身份认证。
- 没有实际位置、关节状态和故障回传。
- 没有机械臂侧网络中断、进程退出和控制器故障的安全策略。

## 3. 系统边界与推荐架构

```text
┌────────────────────────────────────────────────────────────┐
│ CAM//TRACE 控制面                                           │
│                                                            │
│ React                                                       │
│   ├─ 轨迹检查                                               │
│   ├─ 选择机械臂和标定版本                                   │
│   ├─ 发起规划                                               │
│   ├─ PREPARE / ARM / START / PAUSE / STOP                  │
│   └─ 显示实际状态                                           │
│             │                                              │
│ FastAPI     ▼                                              │
│   ├─ 标定档案                                               │
│   ├─ 轨迹转换与规划                                         │
│   ├─ 执行包和执行状态                                       │
│   ├─ 审计日志                                               │
│   └─ HTTPS + WSS 网关通道                                   │
└───────────────────────────┬────────────────────────────────┘
                            │ TLS；完整轨迹一次性传输
                            ▼
┌────────────────────────────────────────────────────────────┐
│ Linux Robot Gateway 执行面                                  │
│                                                            │
│   ├─ 主动连接服务端                                         │
│   ├─ 下载、哈希校验和缓存执行包                             │
│   ├─ 本地安全校验                                           │
│   ├─ 固定周期插补/跟随                                      │
│   ├─ ROS2 / MoveIt / 厂商 SDK                              │
│   ├─ 看门狗、受控停止和故障处理                             │
│   └─ 回传状态、关节和 TCP 位姿                              │
└───────────────────────────┬────────────────────────────────┘
                            ▼
                    机械臂控制器与硬件急停
```

### 3.1 核心设计原则

1. 浏览器永远不直接连接机械臂或发送原始位姿。
2. FastAPI 不通过公网网络逐点实时控制机械臂。
3. Linux 网关必须先完整获得并校验执行包，再允许进入 `STAGED`。
4. 轨迹准备与真实启动分为两个阶段，上传或规划成功不自动运动。
5. `STOP` 不能只依赖网页；机器人现场必须有独立硬件急停和本地停止能力。
6. 所有改变运动状态的命令必须可审计、可幂等，并具有过期时间。
7. 第一版先支持单台机械臂、单执行任务，稳定后再扩展多设备并发。

## 4. 通信方案

### 4.1 推荐方案：Linux 主动建立出站连接

适用于 FastAPI 位于云端、HyperAI 或其他远端服务器，而机械臂位于实验室内网的情况。

- HTTPS REST：下载执行包、读取配置、上报大体积结果。
- WSS：网关在线心跳、命令通知、状态变化和轻量遥测。
- Linux 网关主动建立连接，不对公网开放机械臂主机端口。
- 每个网关使用独立 `gateway_id` 和密钥或客户端证书。

WebSocket 只发送“有新任务”“准备”“开始”“停止”和状态事件。真实轨迹点从执行包一次性下载，运动时钟由 Linux 本地单调时钟驱动。

### 4.2 备选方案：局域网内 FastAPI 主动调用 Linux REST

仅在两台主机长期位于同一可信局域网、有固定地址且能够安全配置 TLS 时采用。Linux 程序提供：

```http
POST /v1/trajectories/prepare
POST /v1/executions/{execution_id}/arm
POST /v1/executions/{execution_id}/start
POST /v1/executions/{execution_id}/pause
POST /v1/executions/{execution_id}/stop
GET  /v1/executions/{execution_id}
GET  /v1/health
```

为了避免两套协议长期分叉，建议即使采用该模式，也复用本文的消息字段、执行包格式和状态机。

## 5. 坐标、尺度与标定

### 5.1 当前轨迹含义

当前重建轨迹表示：

```text
reconstruction_world_T_camera(t)
```

其默认父坐标系是 `reconstruction_camera0`，相机轴采用 OpenCV optical：X 向右、Y 向下、Z 向前。长度在未标定时是 `reconstruction_unit`。

### 5.2 机械臂期望位姿

机械臂执行需要：

```text
robot_base_T_tool(t)
```

一般转换关系为：

```text
robot_base_T_tool(t)
  = robot_base_T_reconstruction_world
  × reconstruction_world_T_camera(t)
  × camera_T_tool
```

其中：

- `robot_base_T_reconstruction_world` 包含尺度、轴向、旋转和平移对齐。
- 手眼标定通常得到 `tool_T_camera`，使用时需要计算其逆矩阵 `camera_T_tool`。
- 如果视频相机没有固定安装在末端，不能直接使用上述公式，必须单独定义动作映射方法。

### 5.3 标定档案

后端应将标定作为版本化、不可静默覆盖的数据保存：

```json
{
  "calibrationId": "cal_01J...",
  "robotId": "arm_01",
  "toolId": "camera_tool_01",
  "metersPerReconstructionUnit": 0.42,
  "robotBaseTReconstructionWorld": [
    [1, 0, 0, 0.4],
    [0, 1, 0, 0.0],
    [0, 0, 1, 0.3],
    [0, 0, 0, 1]
  ],
  "toolTCamera": [
    [1, 0, 0, 0.0],
    [0, 1, 0, 0.0],
    [0, 0, 1, 0.1],
    [0, 0, 0, 1]
  ],
  "createdAt": "2026-07-25T00:00:00Z",
  "status": "validated"
}
```

每个执行包必须记录具体的 `calibrationId`，标定被更新后，历史执行包不得自动套用新标定。

## 6. 执行包协议

建议新增执行级格式 `robot_trajectory/v1`：

```json
{
  "schema": "robot_trajectory/v1",
  "executionPackageId": "rtp_01J...",
  "sourceJobId": "vtc_...",
  "sourceTrajectorySha256": "...",
  "robotId": "arm_01",
  "toolId": "camera_tool_01",
  "calibrationId": "cal_01J...",
  "createdAt": "2026-07-25T00:00:00Z",
  "expiresAt": "2026-07-26T00:00:00Z",
  "coordinateFrame": "robot_base",
  "trajectoryType": "cartesian",
  "units": {
    "length": "meter",
    "angle": "radian",
    "time": "second"
  },
  "limits": {
    "maxLinearVelocityMps": 0.05,
    "maxAngularVelocityRadps": 0.3,
    "maxLinearAccelerationMps2": 0.1,
    "maxJointVelocityScale": 0.1
  },
  "points": [
    {
      "index": 0,
      "timeFromStartS": 0.0,
      "positionXYZ": [0.42, -0.18, 0.35],
      "orientationXYZW": [0.0, 0.0, 0.0, 1.0]
    }
  ],
  "validation": {
    "finiteValues": true,
    "monotonicTime": true,
    "workspacePassed": true,
    "ikPassed": true,
    "jointLimitsPassed": true,
    "velocityLimitsPassed": true,
    "collisionCheckPassed": true
  },
  "packageSha256": "..."
}
```

执行包建议使用规范化 JSON 或 ZIP 封装。哈希应针对确定的原始字节计算，不能对解析后的对象重新序列化再计算。

后续如果规划器能够生成稳定的关节轨迹，可增加：

```json
{
  "trajectoryType": "joint",
  "jointNames": ["joint_1", "joint_2"],
  "points": [
    {
      "timeFromStartS": 0.0,
      "positionsRad": [0.0, 0.0],
      "velocitiesRadps": [0.0, 0.0]
    }
  ]
}
```

生产执行优先使用经过验证的关节轨迹；笛卡尔轨迹是否由 Linux 网关在线转换，应根据机械臂 SDK 能力决定。

## 7. 执行状态机

```text
DRAFT
  -> VALIDATING
  -> VALIDATED
  -> DISPATCHING
  -> STAGED
  -> ARMED
  -> EXECUTING
  -> PAUSED
  -> SUCCEEDED

任意允许阶段 -> ABORTED
校验或设备故障 -> FAULT
```

状态含义：

| 状态 | 含义 |
| --- | --- |
| `DRAFT` | 已选择源轨迹、机械臂和标定，尚未规划 |
| `VALIDATING` | 正在转换、重采样、IK 或碰撞检查 |
| `VALIDATED` | 服务端检查通过，执行包已经冻结 |
| `DISPATCHING` | Linux 网关正在下载执行包 |
| `STAGED` | Linux 已完成哈希与本地检查，未允许运动 |
| `ARMED` | 操作员确认，机械臂伺服和初始状态满足条件 |
| `EXECUTING` | Linux 本地正在执行 |
| `PAUSED` | 受控减速后暂停，可继续或停止 |
| `SUCCEEDED` | 轨迹执行完成并收到设备确认 |
| `ABORTED` | 用户或安全逻辑终止任务 |
| `FAULT` | 网关、控制器、规划或跟随误差发生故障 |

### 7.1 命令字段

所有状态变更命令至少包含：

```json
{
  "schema": "robot_command/v1",
  "commandId": "cmd_01J...",
  "executionId": "exec_01J...",
  "robotId": "arm_01",
  "type": "START",
  "sequence": 18,
  "issuedAt": "2026-07-25T00:00:00Z",
  "expiresAt": "2026-07-25T00:00:10Z",
  "requestedBy": "user_id"
}
```

Linux 网关必须按 `commandId` 幂等处理，重复收到同一 `START` 不得重复启动。

## 8. FastAPI 接口规划

### 8.1 机械臂与网关

```http
GET  /api/robots
GET  /api/robots/{robot_id}
GET  /api/robots/{robot_id}/state
POST /api/robot-gateways/{gateway_id}/credentials/rotate
WS   /api/robot-gateways/{gateway_id}/channel
```

### 8.2 标定档案

```http
GET  /api/calibrations?robotId=arm_01
POST /api/calibrations
GET  /api/calibrations/{calibration_id}
POST /api/calibrations/{calibration_id}/validate
POST /api/calibrations/{calibration_id}/archive
```

标定不建议提供普通 `PUT` 覆盖；需要修改时创建新版本。

### 8.3 规划与执行包

```http
POST /api/robot-trajectories
GET  /api/robot-trajectories/{package_id}
GET  /api/robot-trajectories/{package_id}/download
POST /api/robot-trajectories/{package_id}/validate
```

创建请求示例：

```json
{
  "sourceJobId": "vtc_...",
  "robotId": "arm_01",
  "toolId": "camera_tool_01",
  "calibrationId": "cal_...",
  "motionProfileId": "slow_validation",
  "placement": {
    "mode": "calibrated_world"
  }
}
```

### 8.4 执行任务

```http
POST /api/executions
GET  /api/executions
GET  /api/executions/{execution_id}
POST /api/executions/{execution_id}/prepare
POST /api/executions/{execution_id}/arm
POST /api/executions/{execution_id}/start
POST /api/executions/{execution_id}/pause
POST /api/executions/{execution_id}/resume
POST /api/executions/{execution_id}/stop
GET  /api/executions/{execution_id}/events
GET  /api/executions/{execution_id}/telemetry
```

后端必须拒绝：

- 未 `VALIDATED` 的执行包进入 `prepare`。
- 未 `STAGED` 的任务进入 `arm`。
- 未 `ARMED` 的任务进入 `start`。
- 已过期执行包进入任何运动阶段。
- 目标机械臂与执行包 `robotId` 不一致。
- 网关离线、急停有效、伺服未就绪或初始位姿偏差超限时启动。

## 9. Linux Robot Gateway 协议

### 9.1 注册和在线心跳

网关连接后首先发送：

```json
{
  "type": "HELLO",
  "gatewayId": "gateway_lab_01",
  "robotId": "arm_01",
  "softwareVersion": "0.1.0",
  "protocolVersions": ["robot_gateway/v1"],
  "capabilities": {
    "ros2": true,
    "moveit": true,
    "cartesianTrajectory": true,
    "jointTrajectory": true
  }
}
```

周期心跳至少包含：

- 网关在线状态和进程启动时间。
- 控制器连接状态。
- 急停、保护停止和伺服状态。
- 当前执行 ID 和执行状态。
- 最近一次错误代码。
- 本地单调时钟信息。

### 9.2 PREPARE 流程

1. FastAPI 通过 WSS 发送 `PREPARE` 通知和一次性下载 URL。
2. Linux 下载完整执行包。
3. 校验 TLS、文件大小、SHA-256、schema、机器人 ID、标定 ID和有效期。
4. 检查数值有限、时间递增、四元数归一化、点数和频率范围。
5. 使用本地机器人模型再次执行 IK、关节限位和碰撞检查。
6. 检查起始位姿与当前机械臂位姿差值。
7. 通过后回传 `STAGED`；失败则回传 `FAULT` 和结构化错误。

### 9.3 START 与执行

1. Linux 验证 `commandId` 未执行过且命令未过期。
2. 验证任务仍为 `ARMED`、急停释放、伺服开启、控制器处于远程模式。
3. 使用本地单调时钟启动，不使用 WebSocket 消息到达时间作为每个点的时钟。
4. 按机械臂控制器要求插补和发送命令。
5. 监控实际值与期望值的跟随误差。
6. 周期性回传低频遥测；例如 5～20 Hz，而本地控制循环可为 100 Hz 或更高。
7. 完成后停止发送运动目标并回传最终状态。

### 9.4 网络中断策略

必须根据机械臂控制方式明确选择：

- 流式伺服：心跳或控制连接丢失时，Linux 立即触发受控减速停止。
- 控制器已缓存完整轨迹：可配置为安全停止，默认不允许在云端失联后继续运行。
- WSS 断开不应导致反复重发 `START`；重连后先同步任务状态。
- Web 后端重启后，以 Linux 和机械臂实际状态为事实来源进行对账，不能直接把任务重置为空闲。

## 10. 安全检查清单

### 10.1 服务端规划检查

- 所有位置、姿态和时间为有限数。
- 时间严格或非严格递增策略明确，禁止负时间。
- 四元数归一化并处理相邻四元数符号连续性。
- 尺度已转换为米，禁止 `reconstruction_unit` 进入执行包。
- 轨迹重采样、平滑，并限制速度、加速度和 jerk。
- 每个位姿存在可用 IK 解。
- IK 解在关节位置、速度和加速度限制内。
- 轨迹不进入禁区或超出工作空间。
- 已完成自碰撞和环境碰撞检查。
- 奇异点距离或条件数满足阈值。
- 起始位姿与机械臂当前位置差值不超过阈值。

### 10.2 Linux 网关检查

- 执行包哈希、机器人 ID、工具 ID和有效期一致。
- 控制器型号、软件版本和关节顺序一致。
- 现场安全状态正常。
- 机械臂没有其他活动任务。
- 本地复算的限制和碰撞检查通过。
- 实际 TCP、关节和工具负载与规划条件一致。
- 轨迹跟随误差超过阈值时停止。
- 网关进程或控制线程异常时触发安全停止。

## 11. 前端功能规划

建议在现有单页工作区增加“机器人执行”区域，但默认折叠，并在未满足条件时明确禁用。

### 11.1 规划区域

- 选择目标机械臂、工具和标定版本。
- 显示原轨迹单位与 `robotExecutionReady` 状态。
- 选择慢速验证等运动配置。
- 发起转换和规划。
- 展示 IK、碰撞、速度和工作空间检查结果。
- 在 Three.js 中叠加机械臂基座坐标系、工具轨迹和禁区。

### 11.2 执行区域

- 显示网关、控制器、急停、伺服和远程模式状态。
- 独立的“准备轨迹”和“允许执行”操作。
- `START` 前二次确认，显示机械臂、轨迹、速度上限和标定版本。
- `PAUSE` 和醒目的 `STOP` 按钮。
- 显示期望位姿、实际位姿、执行进度和最大跟随误差。
- 显示完整事件时间线和结构化故障原因。

前端停止按钮是操作命令，不替代机械臂现场硬件急停。

## 12. 后端建议目录结构

在不干扰当前视频重建逻辑的前提下，可逐步增加：

```text
robot_control/
  __init__.py
  models.py               # Pydantic DTO、状态枚举
  repository.py           # 机器人、标定、执行包和执行任务持久化
  transforms.py           # SE(3)、尺度和轴向转换
  trajectory_planner.py   # 重采样、平滑、限制和规划器接口
  validators.py           # 执行包与安全校验
  package.py              # 规范化序列化、ZIP 和 SHA-256
  gateway_manager.py      # WSS 会话、命令和心跳
  execution_service.py    # 状态机和幂等命令
  audit.py                # 追加式审计事件
  router.py               # /api/robots、calibrations、executions

tests/
  test_robot_transforms.py
  test_robot_package.py
  test_robot_state_machine.py
  test_robot_gateway_protocol.py
  test_robot_api_contract.py
  fixtures/
    fake_robot_trajectory.json
```

Linux 程序建议至少拆分为：

```text
robot_gateway/
  protocol/               # WSS/REST 消息和 schema
  package_store/          # 原子下载、哈希校验、缓存
  safety/                 # 本地安全检查和看门狗
  planner_adapter/        # MoveIt 或厂商规划器
  driver/                 # ROS2 或厂商 SDK 适配器
  execution/              # 本地状态机和控制循环
  telemetry/              # 状态采样与回传
  config/                 # robot_id、证书和阈值
```

## 13. 分阶段开发计划

### 阶段 0：协议冻结与模拟器，预计 3～5 个工作日

目标：在不连接真实机械臂的情况下冻结双方契约。

服务端：

- 确认机械臂、网络、SDK 和标定输入。
- 确定 `robot_gateway/v1`、`robot_command/v1` 和 `robot_trajectory/v1`。
- 增加机器人、网关、执行任务和事件的数据模型。
- 实现执行状态机和幂等命令单元测试。
- 提供 OpenAPI 示例和 JSON Schema。

Linux 侧：

- 实现模拟网关，主动连接、心跳和重连。
- 实现执行包下载、校验和本地缓存。
- 模拟 `PREPARE/ARM/START/PAUSE/STOP`。
- 根据时间戳播放轨迹但不驱动硬件。

验收：

- 双方使用同一批协议样例通过测试。
- 重复 `START` 不会创建第二次执行。
- 断线重连能够恢复真实任务状态。
- 错误哈希、错误机器人 ID和过期命令都会被拒绝。

### 阶段 1：标定与轨迹转换，预计 5～10 个工作日

目标：生成单位为米、坐标为机器人基座的执行候选轨迹。

- 实现尺度、齐次变换、四元数和轴向转换。
- 建立版本化标定档案。
- 增加标定导入、校验和选择接口。
- 实现时间重采样、平滑、速度和加速度计算。
- 为变换链、单位和边界值增加自动测试。
- 前端展示转换后的轨迹与标定信息。

验收：

- 已知合成轨迹经过转换后与预期矩阵结果一致。
- 执行包中不出现 `reconstruction_unit`。
- 不合法或未验证标定不能创建执行包。
- 相同源轨迹与标定生成可复现的结果和哈希。

### 阶段 2：仿真规划与安全检查，预计 5～10 个工作日

目标：在机械臂数字模型中验证执行可行性。

- 接入 ROS2/MoveIt、厂商模拟器或离线 SDK。
- 配置机械臂 URDF、关节限制、工具和碰撞环境。
- 执行 IK、连续解选择、奇异点和碰撞检查。
- 生成关节轨迹或确认由网关执行笛卡尔轨迹。
- 前端展示每类检查结果和失败点。
- 保存规划器版本、机器人模型版本和环境版本。

验收：

- 可行轨迹完整通过仿真并回放。
- 不可达、碰撞、超速和奇异点轨迹被明确拒绝。
- 服务端与 Linux 对同一执行包给出一致的关键校验结论。

### 阶段 3：真实机械臂低速联调，预计 3～7 个工作日

目标：在受控环境中完成第一条真实轨迹。

- Linux 网关接入真实 ROS2 驱动或厂商 SDK。
- 实现初始位姿检查、伺服状态检查和本地看门狗。
- 将速度限制在额定速度的 5%～10%。
- 先执行单点、两点、短直线，再执行短视频轨迹。
- 回传实际关节、TCP 位姿和跟随误差。
- 验证暂停、停止、断网、网关退出和控制器故障场景。

验收：

- 每次运动均需要 `STAGED -> ARMED -> START`。
- 急停、网页停止、网关断线和跟随误差超限均能安全停止。
- 期望轨迹和实际轨迹可下载并对比。
- 不允许未验证标定或过期执行包启动。

### 阶段 4：产品化与多任务可靠性，预计 5～10 个工作日

- 操作员、审核员和管理员权限分离。
- 使用客户端证书或短期令牌替代长期共享密钥。
- 增加审计日志导出和命令签名。
- 增加网关升级、版本兼容和密钥轮换机制。
- 增加任务队列、互斥锁和多机械臂隔离。
- 增加指标、告警、日志关联 ID和长期运行测试。
- 建立标定过期、工具变更和机器人维护后的强制重新验证策略。

## 14. 测试计划

### 14.1 自动化测试

- 矩阵和四元数变换的已知答案测试。
- 单位转换、四元数符号连续性和插值测试。
- 速度、加速度、jerk 和工作空间边界测试。
- 状态机所有合法和非法迁移测试。
- 重复命令、乱序命令、过期命令和重放攻击测试。
- 执行包字节哈希、损坏 ZIP 和 schema 兼容测试。
- 网关断线、重连和服务端重启后的状态对账测试。
- API 401、403、404、409、410、422 和 500 契约测试。

### 14.2 仿真测试

- 单点保持、直线、圆弧和姿态旋转。
- 不可达目标、关节限位、奇异点和碰撞轨迹。
- 初始位姿不一致。
- 暂停、恢复、停止和执行中网关断线。
- 机器人状态变化：急停、保护停止、伺服关闭、远程模式取消。

### 14.3 实机测试

- 空载或安全测试工具，低速、小范围。
- 现场人员持有硬件急停。
- 每次只放开一种新能力。
- 保存期望值、实际值、视频和事件日志。
- 明确每次测试的机器人、工具、负载、标定和软件版本。

## 15. 部署与安全

- FastAPI 与网关只使用 TLS，不传输明文令牌。
- 每个网关使用独立身份，不共用账号。
- 网关凭据仅允许访问绑定的 `robotId`。
- 执行包下载 URL短期有效且只能使用有限次数。
- `START/RESUME/STOP` 写入追加式审计日志。
- 服务端保存操作者、时间、IP、命令 ID和执行包哈希。
- Linux 网关使用 systemd 管理，限制权限并配置自动重启。
- 网关配置和凭据不得写入 Git。
- 机器人控制网与普通办公网尽量隔离。
- 硬件急停、安全 PLC、围栏和安全扫描器独立于 Web 系统。

## 16. 需要项目负责人补充的信息

以下信息不阻塞阶段 0 的模拟网关开发，但会决定阶段 1～3 的具体实现。请尽量按表格回复。

### 16.1 机械臂与控制器

| 编号 | 需要确认的信息 | 示例 |
| --- | --- | --- |
| R1 | 机械臂品牌和准确型号 | UR5e、Franka Panda、AUBO i5、节卡等 |
| R2 | 控制器型号和固件版本 | 厂商控制柜/控制器版本 |
| R3 | 自由度、关节名称和关节顺序 | 6 轴；joint1～joint6 |
| R4 | 当前可用的控制接口 | ROS2、MoveIt、TCP SDK、Python/C++ SDK |
| R5 | 支持的运动模式 | 关节轨迹、笛卡尔轨迹、Servo、MoveJ/MoveL |
| R6 | 控制周期或轨迹点频率要求 | 125 Hz、100 Hz、控制器内部插补 |
| R7 | 是否能读取实际关节、TCP 和安全状态 | 接口名称或消息类型 |
| R8 | 是否有模拟器、URDF 和碰撞模型 | MoveIt config、厂商模拟器 |

### 16.2 Linux 程序

| 编号 | 需要确认的信息 |
| --- | --- |
| L1 | Linux 发行版、版本和 CPU 架构 |
| L2 | 同事程序使用 Python、C++、Rust 或其他语言 |
| L3 | 是否使用 ROS/ROS2；如使用，请提供发行版和 topic/action/service |
| L4 | 当前程序已经提供的接口、启动命令和配置方式 |
| L5 | 谁负责插补、IK、限速和碰撞检查：同事程序、MoveIt 还是机械臂控制器 |
| L6 | 程序能否作为 systemd 常驻服务运行 |
| L7 | 是否允许新增 HTTPS/WSS 客户端依赖 |
| L8 | 是否已有日志、任务 ID和故障码格式 |

### 16.3 相机与安装方式

| 编号 | 需要确认的信息 |
| --- | --- |
| C1 | 视频相机是否固定安装在机械臂末端 |
| C2 | 如果固定安装，相机光心到 TCP 的大致位置和方向 |
| C3 | 相机内参和畸变参数是否已知 |
| C4 | 是否已经做过 hand-eye 标定；标定输出采用什么方向 |
| C5 | 视频是现场机械臂相机拍摄，还是任意手持/外部相机拍摄 |
| C6 | 轨迹需要复现相机光心运动，还是复现某个工具 TCP 运动 |

### 16.4 网络与部署

| 编号 | 需要确认的信息 |
| --- | --- |
| N1 | FastAPI 最终部署在 HyperAI 云端、现场服务器还是 Linux 机械臂主机 |
| N2 | Linux 主机能否主动访问 FastAPI 的 HTTPS/WSS 地址 |
| N3 | 两台主机是否在同一局域网；是否有固定 IP、DNS、NAT 或防火墙限制 |
| N4 | 是否允许机械臂主机开放入站端口 |
| N5 | 是否有内部 CA、TLS 证书或 VPN |
| N6 | 网络中断后要求立即停止，还是允许控制器完成已缓存轨迹 |

### 16.5 运动与安全要求

| 编号 | 需要确认的信息 |
| --- | --- |
| S1 | 最大线速度、角速度、关节速度、加速度和 jerk |
| S2 | 允许的机械臂工作空间和明确禁区 |
| S3 | 工具、负载质量、质心和 TCP 定义 |
| S4 | 是否存在围栏、安全 PLC、扫描器或外部急停 |
| S5 | 允许的最大起始位姿偏差和轨迹跟随误差 |
| S6 | 实机第一阶段希望执行的位置范围和速度比例 |
| S7 | 谁拥有最终 `ARM/START` 权限，是否需要双人确认 |
| S8 | 暂停后是否允许继续，还是必须重新规划和准备 |

### 16.6 轨迹语义

| 编号 | 需要确认的信息 |
| --- | --- |
| T1 | 是否要求完全复现视频时间，还是只复现几何路径 |
| T2 | 是否允许轨迹平滑和改变总时长 |
| T3 | 是否必须经过原始每个点，还是允许拟合样条曲线 |
| T4 | 视频轨迹的物理尺度如何获得：标尺、已知物体、外部定位或人工输入 |
| T5 | 重建世界坐标如何放置到机械臂基座坐标中 |
| T6 | 目标是输出笛卡尔轨迹还是最终关节轨迹 |

## 17. 第一轮联调建议交付物

双方在开始真实机械臂开发前，建议互换以下材料：

CAM//TRACE 侧提供：

- `robot_trajectory/v1` JSON Schema。
- 一个合法轨迹、一个哈希损坏轨迹、一个超限轨迹。
- 网关 WSS 消息示例和 OpenAPI 文档。
- 模拟服务地址与测试凭据。
- 状态机和错误码表。

Linux 侧提供：

- 网关基本信息和能力 `HELLO` 示例。
- 当前机械臂接口的最小调用示例。
- 实际状态和故障码示例。
- 模拟模式启动方式。
- 一条不驱动硬件的完整协议日志。

## 18. 建议的近期任务拆分

在补充信息尚未齐全时，可以立即开始：

1. 冻结三份 v1 schema 和错误码。
2. 在 FastAPI 中实现机器人、网关、执行任务的内存/文件持久化原型。
3. 实现不连接硬件的 Python 模拟网关。
4. 打通 WSS 心跳、执行包下载和状态回传。
5. 实现状态机和重复命令测试。
6. 使用现有 `camera_cartesian_trajectory.json` 生成“仅供模拟”的执行包。
7. 前端增加只读设备状态和模拟执行时间线。
8. 等机械臂、SDK、标定和网络信息确认后，再选择 MoveIt 或厂商 SDK 路线。

## 19. 完成定义

只有同时满足下列条件，才能认为真实机械臂接入完成：

- 原始相机轨迹与执行级机械臂轨迹严格分离。
- 所有执行包使用米、弧度、秒和明确的机器人基座坐标系。
- 标定、机器人模型、工具和运动限制均有版本记录。
- 服务端与 Linux 侧都完成独立校验。
- 操作员必须经过准备和允许步骤才能启动。
- 重复、乱序或过期命令不会造成运动。
- 断网、网关退出、急停、保护停止和跟随误差超限均经过实测。
- 期望轨迹、实际轨迹、命令和状态变化可以追溯。
- 现场硬件安全系统不依赖 Web 服务正常运行。

