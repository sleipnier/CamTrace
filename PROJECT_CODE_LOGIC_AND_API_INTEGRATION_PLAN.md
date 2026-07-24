# CAM//TRACE 项目代码逻辑梳理与前后端接口对接计划

> 梳理日期：2026-07-24  
> 梳理范围：根目录 FastAPI 服务、React 前端、视频重建服务与轨迹导出/可视化链路。`mega-sam/` 为外部算法仓库，`videotocamera/` 与 `videotocamera.pre-git-20260724/` 更像部署/历史副本，不作为当前前后端主实现逐文件展开。

## 1. 项目目标与边界

本项目把普通视频转换为逐帧相机运动轨迹，主要流程是：

```text
用户上传视频
  -> FastAPI 保存上传文件并创建任务
  -> ffprobe 校验视频参数
  -> GPU 队列串行进入 MegaSaM 重建
  -> video_to_camera.py 导出 JSONL / CSV / Cartesian JSON
  -> service.py 校验并打包 ZIP + manifest
  -> 前端轮询任务状态
  -> Three.js 展示三维轨迹，或下载数据集
```

系统输出是相机重建轨迹，不是机器人可直接执行的轨迹。后端与前端均固定表达 `robotExecutionReady: false`；未完成尺度、外参、手眼标定及运动安全约束前，不能直接发送给机械臂。

## 2. 目录与职责

| 路径 | 职责 |
| --- | --- |
| `frontend/src/App.tsx` | 单页路由入口，所有未知路由回到首页 |
| `frontend/src/pages/DashboardPage.tsx` | 上传、任务轮询、任务列表、轨迹导入、轨迹播放的主页面 |
| `frontend/src/api/http.ts` | 统一 `fetch`、API 根路径与错误转换 |
| `frontend/src/api/httpAdapter.ts` | 将后端 HTTP 路由封装为 jobs/trajectory/visualizations API |
| `frontend/src/api/types.ts` | 前端接口 DTO 与状态枚举 |
| `frontend/src/components/TrajectoryCanvas.tsx` | Three.js 轨迹、起点、当前点、网格及拖拽旋转 |
| `api.py` | FastAPI 路由、任务状态持久化、后台线程、下载与静态前端托管 |
| `service.py` | 视频检查、GPU 进程调用、输出校验、ZIP 打包、结果清理 |
| `video_to_camera.py` | 抽帧、MegaSaM 调用协调、位姿导出核心 CLI |
| `visualize_camera_trajectory.py` | 读取 ZIP/CSV/JSON/JSONL 并统一成轨迹模型 |
| `render_camera_trajectory_video.py` | 把轨迹渲染为多视角 MP4 |
| `API_AND_DEVICE_PROTOCOL.md` | 当前接口和设备数据协议 |
| `OUTPUT_FORMAT.md` | 轨迹输出字段、坐标和单位约定 |
| `hyperai_start.sh` | 生产启动脚本，但当前入口需要修复，见风险清单 |

## 3. 后端代码逻辑

### 3.1 配置和运行目录

`ServiceConfig.from_env()` 从 `VTC_*` 环境变量读取项目目录、MegaSaM 目录、运行目录、GPU 编号、上传限制、视频限制、超时和结果保留策略。FastAPI 在运行目录下使用：

```text
<runtime>/api/jobs/             任务 JSON 状态
<runtime>/api/uploads/          临时上传文件
<runtime>/api/visualizations/   MP4 可视化结果
<runtime>/tasks/                单次算法临时工作区
<runtime>/results/              最终数据集 ZIP
<runtime>/errors/               失败任务 pipeline.log
```

任务状态 JSON 持久化到磁盘，使用临时文件加 `os.replace` 原子替换；进程内再用 `RLock` 保护读写。重建 Future 和可视化状态仅保存在内存中，因此服务重启后无法恢复取消句柄和可视化任务状态。

### 3.2 视频任务状态机

```text
uploaded(5%)
  -> validating(15%)
  -> queued(28%)
  -> reconstructing(45%)
  -> packaging(90%)
  -> succeeded(100%)
  -> 任意异常：failed
```

具体处理如下：

1. `POST /api/jobs` 按扩展名和上传体积保存视频，创建任务 JSON。
2. `ThreadPoolExecutor` 异步执行 `run_job()`。
3. `inspect_video()` 通过 `ffprobe` 读取编码、时长、分辨率、帧数和 FPS，并执行业务限制校验。
4. `build_dataset()` 再复制并检查源文件，创建隔离任务目录。
5. `run_pipeline()` 获取 MegaSaM 根目录下的 `.vtc-gpu.lock`；同一 GPU 同时只运行一个重建任务。
6. 子进程执行 `video_to_camera.py all ...`，标准输出和错误进入 `pipeline.log`。
7. `_validate_outputs()` 检查三种轨迹文件的记录数、索引、有限数、schema、首帧归一化和安全标志。
8. `_package_dataset()` 生成包含三种轨迹文件和 `manifest.json` 的 ZIP，并执行 ZIP CRC 检查。
9. `api.py` 再从 ZIP 读取 manifest 和 Cartesian JSON，补齐任务详情及下载产物。
10. 成功或失败后删除临时上传及任务工作区；结果按 TTL 和总空间上限清理。

### 3.3 轨迹读取与浏览器 DTO

`GET /api/jobs/{id}/trajectory` 和 `POST /api/trajectories/parse` 都通过 `load_trajectory()` 读取 ZIP、CSV、JSON 或 JSONL，并由 `trajectory_payload()` 转为前端统一结构：

```ts
{
  jobId,
  frameId,
  childFrameId: "camera",
  lengthUnit,
  fps,
  firstPoseNormalized,
  robotExecutionReady: false,
  points: [{ frameIndex, timeFromStartS, positionXYZ, orientationXYZW }]
}
```

FPS 是根据首尾时间和点数反推的平均 FPS。轨迹最多为配置中的 `max_frames`，上传文件最大 25 MB。

### 3.4 MP4 可视化任务

`POST /api/visualizations` 接收轨迹文件、FPS 和播放速度，后台执行 `render_video()`；前端可轮询任务详情并在成功后访问预览或下载 URL。该能力已封装在前端 API 层，但当前页面没有使用。

### 3.5 认证与错误格式

- 设置 `VTC_AUTH_USER` 和 `VTC_AUTH_PASSWORD` 后，除健康检查外均启用 HTTP Basic Auth。
- HTTP 和请求校验错误通常返回 `{ code, message, details? }`。
- 未捕获的服务异常仍可能使用 FastAPI 默认 500 响应，不一定满足统一错误结构。

## 4. 前端代码逻辑

### 4.1 页面状态

`DashboardPage` 以三个变量决定工作区阶段：

```text
无 activeJobId、无 localTrajectory -> upload
有 activeJobId                  -> processing
任务 succeeded 或有本地轨迹     -> result
```

主要数据请求：

- 健康检查：15 秒轮询一次。
- 任务列表：5 秒轮询一次，默认最近 8 条。
- 活跃任务：约 1.2 秒轮询一次。
- 活跃任务成功后：请求浏览器轨迹 DTO。
- 导入本地轨迹：上传到后端解析，不在浏览器直接解析。

### 4.2 上传与任务展示

前端先做文件大小和扩展名/MIME 初筛，后端再做可信校验。创建成功后写入 React Query 缓存、设置活跃任务 ID，并持续显示任务进度与 ffprobe 参数。

任务列表用于选择已有任务。成功任务应加载轨迹；运行中任务显示进度；失败任务显示后端错误消息。

### 4.3 三维轨迹展示

`TrajectoryCanvas` 根据 `positionXYZ` 生成绿色折线、绿色起点和橙色当前点。播放定时器按照 `trajectory.fps / speed` 逐点前进，滑块可直接选择帧。当前实现只利用位置绘制路径，四元数仅在侧栏显示，没有用于绘制相机朝向或视锥。

## 5. 当前接口覆盖情况

| 后端接口 | API 层 | 页面实际使用 | 当前结论 |
| --- | --- | --- | --- |
| `GET /api/health` | 直接调用 | 是 | 已对接 |
| `GET /api/jobs` | `jobsApi.list` | 是 | 已对接；游标尚未实现 |
| `POST /api/jobs` | `jobsApi.create` | 是 | 已对接 |
| `GET /api/jobs/{id}` | `jobsApi.get` | 是 | 已对接 |
| `POST /api/jobs/{id}/cancel` | `jobsApi.cancel` | 否 | 仅封装，页面缺按钮和冲突提示 |
| `GET /api/jobs/{id}/dataset` | 无专用方法 | 否 | 页面缺完整数据集下载 |
| `GET /api/jobs/{id}/artifacts/{name}` | 无专用方法 | 否 | 页面缺单文件下载 |
| `GET /api/jobs/{id}/trajectory` | `trajectoryApi.getByJob` | 是 | 已对接 |
| `POST /api/trajectories/parse` | `trajectoryApi.parseLocal` | 是 | 已对接 |
| `POST /api/visualizations` | `visualizationsApi.create` | 否 | 仅封装，页面缺渲染入口 |
| `GET /api/visualizations/{id}` | `visualizationsApi.get` | 否 | 仅封装，页面缺轮询和结果展示 |
| `GET /api/visualizations/{id}/video` | 仅由 URL 返回 | 否 | 页面缺预览/下载 |

## 6. 已发现的联调问题与风险

### P0：阻塞启动或造成明显错误

1. **生产启动入口不存在**：`hyperai_start.sh` 最后执行 `${PROJECT_ROOT}/api_server.py`，当前主目录未发现该文件；实际 FastAPI `app` 定义在 `api.py`。需要新增明确的 Uvicorn 入口或修改脚本，例如执行 `python -m uvicorn api:app --host ... --port ...`。
2. **开发端口说明不一致**：`frontend/README.md` 写后端默认 `8000`，`frontend/vite.config.ts` 实际代理到 `http://localhost:7860`，环境示例也是 `7860`。必须统一，否则本地开发会直接得到代理连接失败。
3. **切换队列任务可能显示错误轨迹**：导入本地轨迹后，点击任务队列中的任务没有清空 `localTrajectory`；`localTrajectory ?? trajectoryQuery.data` 会一直优先展示旧的本地轨迹。选择任何服务端任务时都应清空本地轨迹及播放状态。

### P1：影响核心用户闭环

1. **成功后没有下载入口**：后端已提供 ZIP 和单文件下载，但页面没有展示 `artifacts`。
2. **任务取消没有 UI**：API 层已封装，但运行/排队阶段没有取消按钮，且需要正确展示 `409 JOB_NOT_CANCELLABLE`。
3. **MP4 可视化未接入**：后端和 API adapter 已完成，页面没有文件选择、参数设置、状态轮询、预览和下载。
4. **错误反馈不完整**：创建任务、导入轨迹、任务列表、任务详情、轨迹加载失败时，大多没有页面级错误提示；用户可能只看到按钮恢复或空白区域。
5. **失败任务仍持续轮询**：活跃任务轮询只在 `succeeded` 停止，`failed` 会继续每 1.2 秒请求。
6. **任务切换有空白窗口**：点击队列任务后，在详情未返回前阶段已变为 processing，但主区域依赖 `job` 才渲染，可能短暂空白，应增加加载态。

### P2：契约、可靠性和维护性

1. `JobStatus` 不含独立的 `cancelled`；当前取消被表达为 `failed + error.code=CANCELLED`。需要正式确认是保持现状还是扩展状态枚举。
2. `cursor` 被前端类型和协议保留，但后端直接忽略，也不返回 `nextCursor`；数据增多后只能看到固定数量的最新任务。
3. 后端 `list_jobs()` 实际返回完整任务对象，前端声明为 `JobSummary[]`。结构兼容但契约语义不够准确，应明确列表是否包含 artifacts/error 等详情字段。
4. `manifest` 产物的 `sizeBytes` 和 `sha256` 不是对 ZIP 中原始 `manifest.json` 字节直接计算，存在下载后校验不一致风险。应对 `dataset.read("manifest.json")` 的原始 bytes 计算。
5. 可视化状态只在内存中；服务重启后查询会返回不存在，即使 MP4 文件仍在磁盘。
6. 任务 JSON 会长期保留，而 ZIP 可能过期；列表仍显示 succeeded，直到下载时才得到 410。前端需要“结果已过期”状态或后端在列表/详情中暴露可用性。
7. Basic Auth 的使用方式依赖浏览器挑战/同源部署；若改为独立跨域 API，需要明确凭据传递、CORS 和 HTTPS 策略。
8. Three.js 相机位置固定为 `(5.2, 4.2, 6.5)`，没有按轨迹包围盒自适应；尺度大或方向特殊的轨迹可能不可见。
9. Three.js 未使用姿态四元数，当前只能验证路径，不能直观看镜头朝向。
10. API 缺少独立的契约/路由测试；现有测试主要覆盖算法服务、输出与渲染工具。

## 7. 前后端接口对接实施计划

### 阶段 0：冻结接口契约和启动方式（P0）

目标：确保所有开发者使用同一服务入口、端口、状态和错误约定。

后端任务：

- 明确启动入口：增加 `api_server.py` 或直接统一为 Uvicorn CLI。
- 统一默认端口为 `7860`，同步 `frontend/README.md`、脚本和环境示例。
- 明确取消状态策略；建议短期保持 `failed + CANCELLED`，避免扩大状态迁移面，前端按错误码显示“已取消”。
- 修正 manifest 原始字节的大小和哈希计算。
- 为所有 500 错误增加统一 `{code,message}` 响应，并确保服务端日志保留详细堆栈、响应不泄漏内部路径。

前端任务：

- 配置只保留一个 API 根路径来源：生产 `/api`，开发由 Vite 代理到 `7860`。
- 为 `ApiError` 增加 `details`（如确有表单字段展示需求），并统一错误展示组件。

验收标准：

- 一条文档化命令可启动 API，`GET /api/health` 返回 200。
- `npm run dev` 下所有 `/api` 请求正确到达同一后端端口。
- 后端常见 4xx/5xx 都返回统一错误结构。

### 阶段 1：打通视频重建核心闭环（P0/P1）

目标：上传、校验、排队、重建、成功/失败、查看轨迹和下载形成完整闭环。

前端任务：

- 切换队列任务时清空 `localTrajectory`、`activeIndex`、`playing` 和旧错误。
- 活跃任务轮询在 `succeeded` 与 `failed` 都停止。
- 增加任务详情和轨迹加载态，避免空白工作区。
- 对创建、列表、详情、轨迹请求分别显示错误与重试按钮。
- 成功任务展示 `artifacts`，下载 URL 使用服务端返回值，不在组件内重复拼接。
- 下载前处理 409、410 和 401，尤其将 410 显示为“结果已过期，请重新运行”。
- 对取消 API 增加按钮；只有 uploaded/validating/queued 阶段展示或启用，409 时提示任务已进入不可安全取消阶段。

后端任务：

- 校验任务详情不会泄漏 `archivePath`。
- 明确任务列表的 DTO：建议返回精简 summary，并在详情接口返回 artifacts/error。
- 对 `status` 查询参数做枚举校验，对 `limit` 使用 FastAPI 范围约束。

验收场景：

1. 合法视频：上传后状态完整流转，成功后轨迹点数等于 `outputCount`，ZIP 可下载。
2. 超限/损坏视频：页面展示后端业务错误，不进入 GPU 重建。
3. 算法失败：轮询停止，页面展示任务 ID 和安全错误消息。
4. 本地轨迹导入后再选择历史任务：展示被选择任务的轨迹，不显示旧导入数据。
5. 结果过期：页面明确提示 410，不表现为普通网络错误。

### 阶段 2：接入已有轨迹与 MP4 可视化（P1）

目标：完整使用后端已经实现的轨迹解析和视频渲染能力。

前端任务：

- 本地轨迹上传显示格式、25 MB、1000 位姿限制及解析错误。
- 增加“生成多视角视频”区域，允许设置 FPS（10～60）和速度（0.25～4）。
- 创建后每 1～2 秒轮询可视化任务；成功或失败后停止。
- 成功后用 `previewUrl` 提供 `<video controls>`，用 `downloadUrl` 下载 MP4。
- 页面离开或切换数据源时停止旧轮询，避免多个任务状态串线。

后端任务：

- 给可视化失败状态增加 `{error:{code,message}}`，不能只返回 `failed`。
- 将可视化状态落盘或明确标注为不可恢复的临时任务。
- 为视频下载设置合适的缓存和 `Content-Disposition` 行为。

验收标准：ZIP、CSV、JSON、JSONL 均可解析；合法参数能生成并预览/下载 MP4；非法参数和渲染失败有明确提示。

### 阶段 3：轨迹展示准确性与易用性（P2）

目标：让浏览器可用于可靠检查轨迹，而不只是显示一条折线。

- 根据轨迹包围盒计算相机位置、近远裁剪面和网格尺度。
- 对零点、单点、极小尺度和极大尺度轨迹做保护。
- 使用 `orientationXYZW` 绘制当前相机视锥/坐标轴，明确 OpenCV optical 轴方向。
- 优先按每点时间戳播放，而不是只用平均 FPS；非均匀 PTS 视频才能保持正确节奏。
- 显示 `frameId`、`childFrameId`、长度单位、首帧是否归一化和安全标志。

### 阶段 4：分页、恢复与可观测性（P2）

- 实现稳定游标分页，并返回 `nextCursor`。
- 服务启动时扫描运行中任务，将不可恢复任务标记为 `failed/SERVICE_RESTARTED`，避免永久停留在处理中。
- 记录 API job ID 与算法 dataset job ID 的映射，日志检索统一使用 API job ID。
- 增加结果可用状态或过期时间字段，如 `resultExpiresAt`、`resultAvailable`。
- 对任务耗时、队列等待、失败代码和结果清理增加结构化日志/指标。

## 8. 建议的接口契约补充

建议在不破坏现有字段的前提下逐步补充：

```ts
interface JobDetail {
  // 现有字段...
  resultAvailable?: boolean
  resultExpiresAt?: string
}

interface VisualizationJob {
  // 现有字段...
  error?: { code: string; message: string }
}

interface ApiErrorBody {
  code: string
  message: string
  details?: unknown
}
```

列表建议返回真正的 `JobSummary[]`；下载链接和可视化链接继续由后端返回相对 URL，以便部署在反向代理子路径下时由统一 URL 解析函数处理。

## 9. 测试计划

### 后端

- 路由契约测试：状态码、字段、错误格式、上传字段名。
- 上传边界：扩展名、0 字节、200 MB 边界、损坏视频、时长/分辨率/帧数边界。
- 状态机：成功、ServiceError、未知异常、可取消、不可取消、服务重启恢复。
- 下载安全：固定文件白名单、路径穿越、未就绪、过期、manifest 哈希一致。
- 轨迹解析：四种格式、NaN/Infinity、零四元数、时间倒退、超过 1000 点。
- 可视化：参数边界、失败错误、视频响应头。

### 前端

- API adapter 测试：路径、query、multipart 字段名、错误解析。
- 页面流程测试：上传 -> 轮询 -> 成功 -> 轨迹 -> 下载。
- 状态切换回归：本地轨迹与历史任务互相切换不会串数据。
- 失败/过期/401/409/413/422/500 的用户提示。
- 轮询停止条件和组件卸载后的请求清理。

### 联调烟雾测试

```text
GET health
POST 小型合法视频
轮询 job 到 succeeded
GET trajectory 并核对 points.length == outputCount
GET dataset 并校验 ZIP CRC
逐个下载 artifacts 并核对 SHA-256
POST 同一 ZIP 到 trajectories/parse 并核对关键元数据
POST visualizations，轮询成功并下载 MP4
```

GPU 完整重建耗时较高，CI 可用伪造 pipeline runner 生成固定合法产物；真实 GPU 冒烟测试放到部署环境执行。

## 10. 推荐开发顺序与交付物

1. 修复 API 启动入口、端口文档、manifest 哈希和统一错误响应。
2. 修复前端任务切换串数据、失败轮询和加载/错误状态。
3. 接入 ZIP/单文件下载与任务取消。
4. 接入 MP4 创建、轮询、预览和下载。
5. 增加后端契约测试与前端关键流程测试。
6. 再实施轨迹视锥、按时间戳播放、分页和任务恢复。

每个阶段至少交付：代码、接口示例、自动化测试、环境/启动说明更新，以及一份可在无 GPU 模式运行的联调说明。

## 11. 当前结论

项目的核心后端链路已经较完整：上传安全控制、视频业务校验、GPU 串行锁、隔离子进程、轨迹校验、数据集打包、浏览器 DTO、轨迹解析和 MP4 渲染均已有实现。前端也已完成核心上传、轮询和 Three.js 路径展示。

当前主要差距不是“没有接口”，而是启动方式和若干契约尚未收口，同时页面只接入了部分后端能力。优先完成 P0 与阶段 1 后，项目即可形成稳定的端到端基础闭环；随后复用现有 API 层接入下载、取消和 MP4，可在较小改动下补齐主要产品功能。

## 12. 迭代实施记录

### 2026-07-24：第一轮（P0 与核心闭环）

已完成 API 启动入口、端口统一、manifest 原始字节哈希、统一 500 错误、任务列表参数约束，以及前端任务切换、失败轮询停止、加载/错误提示、任务取消和产物下载。新增 FastAPI 契约测试。

### 2026-07-24：第二轮（MP4 可视化）

已接入已有任务和本地轨迹的 MP4 创建、状态轮询、失败提示、在线播放和下载。服务端可视化失败状态现包含结构化错误；前端增加 FPS/速度参数校验和响应式渲染面板。自动化测试覆盖无效轨迹失败及临时文件清理。

### 2026-07-24：第三轮（轨迹检查准确性）

Three.js 查看器已按轨迹包围盒自适应相机、网格、裁剪面和标记尺寸；当前相机使用 orientationXYZW 绘制 OpenCV 光学轴方向的视锥与局部坐标轴。前端播放改为按相邻位姿的真实时间戳调度，并保留平均 FPS 作为回环或异常间隔的降级值。侧栏新增 child frame 和首帧归一化状态。

### 2026-07-24：第四轮（分页、恢复与结果生命周期）

任务列表已实现基于创建时间和任务 ID 的不透明游标分页，前端支持加载更多；第一页保持实时刷新，进入多页浏览后切换为稳定分页视图。服务启动时会把遗留的非终态任务标记为 SERVICE_RESTARTED 并清理对应临时上传。成功任务新增 datasetJobId、resultAvailable 和 resultExpiresAt，前端可明确展示结果已过期，而不会无限等待轨迹。

### 2026-07-24：第五轮（工程化收尾）

可视化任务状态已持久化到运行目录，可在进程重启后重新加载；重启时中断的渲染任务会标记为 SERVICE_RESTARTED，成功记录若丢失 MP4 则标记为 VIDEO_EXPIRED。前端增加路由懒加载，并将 React、React Query、Three.js 和图标库拆分为独立构建块，消除了单块超过 500 KB 的构建警告。后端增加任务开始、成功、拒绝、失败和耗时日志，并在任务结束后释放 Future 引用。
