# 前端功能与 API 接口映射

本文档描述 `frontend/` 独立前端的功能模块、接口契约、Mock 实现及接入真实后端时的要求。

## 1. 架构

```text
React 页面 / 组件
        │
        ▼
src/api/index.ts（统一出口）
        │
        ├── VITE_API_MODE=mock → mockAdapter.ts → 内存 Mock 数据
        │
        └── VITE_API_MODE=http → httpAdapter.ts → /api → Python API 服务
```

页面不允许直接导入 `mockData.ts`。页面只使用 `jobsApi`、`trajectoryApi`、`visualizationsApi`，因此切换真实数据不需要修改页面组件。

所有前后端共享的数据结构都定义在 `frontend/src/api/types.ts`。真实后端字段名、状态枚举和空值行为必须遵守这些类型。

## 2. 环境切换

开发 Mock：

```env
VITE_API_MODE=mock
VITE_API_BASE_URL=/api
```

连接真实 API：

```env
VITE_API_MODE=http
VITE_API_BASE_URL=/api
```

Vite 开发服务器会将 `/api` 代理到 `http://localhost:8000`。生产环境建议由同一域名的反向代理转发 `/api`，避免额外配置 CORS。

## 3. 功能模块映射

| 功能模块 | 页面 | 使用接口 | 刷新策略 |
| --- | --- | --- | --- |
| 工作台任务列表 | `/` | `GET /api/jobs?limit=6` | 每 5 秒刷新 |
| 工作台统计卡片 | `/` | `GET /api/jobs?limit=6` | 从任务列表派生，不额外请求 |
| 上传并创建重建任务 | `/jobs/new` | `POST /api/jobs` | 用户提交时调用一次 |
| 任务状态与进度 | `/jobs/:jobId` | `GET /api/jobs/:jobId` | 未完成时约每 1.8 秒刷新 |
| 取消任务 | `/jobs/:jobId` | `POST /api/jobs/:jobId/cancel` | 用户确认取消时调用 |
| 输出文件列表 | `/jobs/:jobId` | `GET /api/jobs/:jobId` | 读取响应中的 `artifacts` |
| 下载数据集/轨迹 | `/jobs/:jobId` | 响应中的 `artifacts[].downloadUrl` | 浏览器直接下载 |
| 查看任务轨迹 | `/trajectory/:jobId` | `GET /api/jobs/:jobId/trajectory` | 进入页面时调用一次 |
| 解析本地轨迹文件 | `/trajectory` | `POST /api/trajectories/parse` | 用户选择文件时调用 |
| 浏览器 3D 轨迹播放 | `/trajectory` | 无额外接口 | 使用已取得的轨迹数据在 Three.js 中渲染 |
| 创建服务端 MP4 渲染 | 预留 | `POST /api/visualizations` | 用户提交渲染参数时调用 |
| 查询 MP4 渲染状态 | 预留 | `GET /api/visualizations/:id` | 渲染完成前轮询 |

## 4. 接口契约

### 4.1 获取任务列表

```http
GET /api/jobs?status=reconstructing&limit=20&cursor=<cursor>
```

响应：

```json
{
  "items": [
    {
      "id": "vtc_8f2a91c4",
      "status": "succeeded",
      "createdAt": "2026-07-24T04:00:00.000Z",
      "completedAt": "2026-07-24T04:07:00.000Z",
      "source": {
        "originalName": "studio_orbit_01.mp4",
        "sizeBytes": 28404112,
        "codec": "h264",
        "durationSeconds": 12.4,
        "width": 1920,
        "height": 1080,
        "frameCount": 372,
        "fps": 30
      },
      "progress": {
        "percent": 100,
        "stageLabel": "数据集已就绪"
      }
    }
  ],
  "nextCursor": null
}
```

### 4.2 创建重建任务

```http
POST /api/jobs
Content-Type: multipart/form-data

video=<binary>
```

成功响应为完整 `JobDetail`，建议使用 HTTP `201`。文件类型、大小、时长、帧数或分辨率不合法时使用 HTTP `422`。

### 4.3 获取任务详情

```http
GET /api/jobs/:jobId
```

任务状态枚举：

```text
uploaded | validating | queued | reconstructing | packaging | succeeded | failed
```

完整任务响应中的关键字段：

```json
{
  "id": "vtc_8f2a91c4",
  "status": "succeeded",
  "progress": { "percent": 100, "stageLabel": "数据集已就绪" },
  "robotExecutionReady": false,
  "frameId": "reconstruction_camera0",
  "lengthUnit": "reconstruction_unit",
  "outputCount": 372,
  "artifacts": [
    {
      "kind": "dataset",
      "name": "camera_dataset_vtc_8f2a91c4.zip",
      "sizeBytes": 384222,
      "sha256": "...",
      "downloadUrl": "/api/jobs/vtc_8f2a91c4/dataset"
    }
  ]
}
```

失败任务应包含：

```json
{
  "error": {
    "code": "RECONSTRUCTION_FAILED",
    "message": "可安全展示给用户的错误说明"
  }
}
```

### 4.4 取消任务

```http
POST /api/jobs/:jobId/cancel
```

响应为取消后的完整 `JobDetail`。已经完成的任务建议返回 HTTP `409`。

### 4.5 获取任务轨迹

```http
GET /api/jobs/:jobId/trajectory
```

响应：

```json
{
  "jobId": "vtc_8f2a91c4",
  "frameId": "reconstruction_camera0",
  "childFrameId": "camera",
  "lengthUnit": "reconstruction_unit",
  "fps": 30,
  "firstPoseNormalized": true,
  "robotExecutionReady": false,
  "points": [
    {
      "frameIndex": 0,
      "timeFromStartS": 0,
      "positionXYZ": [0, 0, 0],
      "orientationXYZW": [0, 0, 0, 1]
    }
  ]
}
```

后端可从现有 `camera_cartesian_trajectory.json` 转换字段命名后返回。必须保持四元数顺序为 `x, y, z, w`。

### 4.6 解析用户轨迹文件

```http
POST /api/trajectories/parse
Content-Type: multipart/form-data

trajectory=<ZIP|CSV|JSON|JSONL binary>
```

响应与“获取任务轨迹”完全相同。后端需继续执行现有的 25 MB、1000 位姿、ZIP 成员名及有限数值校验。

### 4.7 创建轨迹 MP4

```http
POST /api/visualizations
Content-Type: multipart/form-data

trajectory=<binary>
fps=24
speed=1
```

响应：

```json
{
  "id": "viz_18a3b94c",
  "status": "rendering",
  "progressPercent": 34
}
```

### 4.8 查询轨迹 MP4

```http
GET /api/visualizations/:id
```

完成响应：

```json
{
  "id": "viz_18a3b94c",
  "status": "succeeded",
  "progressPercent": 100,
  "previewUrl": "/api/visualizations/viz_18a3b94c/video",
  "downloadUrl": "/api/visualizations/viz_18a3b94c/video?download=1"
}
```

## 5. 错误格式

所有 API 使用统一错误结构：

```json
{
  "code": "VIDEO_TOO_LARGE",
  "message": "视频不能超过 200 MB",
  "details": null
}
```

推荐状态码：

| 状态码 | 用途 |
| --- | --- |
| `400` | 无效请求或无法解析的轨迹 |
| `401` | 未认证 |
| `404` | 任务或文件不存在 |
| `409` | 任务当前状态不允许该操作 |
| `413` | 上传体积超限 |
| `422` | 视频参数不满足业务限制 |
| `429` | 队列已满 |
| `500` | 未预期服务错误 |

## 6. 接入真实后端检查清单

1. FastAPI/Python 响应字段严格匹配 `src/api/types.ts`。
2. 时间统一返回 UTC ISO 8601 字符串。
3. 字节数使用整数，不返回格式化字符串。
4. 缺失的可选数据省略字段，不使用空字符串占位。
5. `progress.percent` 始终为 `0～100`。
6. 下载 URL 必须在结果过期前有效，并正确设置文件名。
7. `robotExecutionReady` 在当前项目中必须保持 `false`。
8. 将 `.env` 中 `VITE_API_MODE` 改为 `http`，执行完整上传、轮询、下载和轨迹播放测试。

## 7. 当前 Mock 行为

- 工作台提供完成、重建中、排队中三类任务。
- 查询进行中的任务会逐步增加进度并最终完成。
- 上传任意合法文件会创建新的 Mock 任务。
- 本地轨迹解析返回确定性的三维螺旋轨迹。
- 所有接口包含约 300～750 ms 延迟，用于验证加载态。
- Mock 数据只保存在页面运行时内存中，刷新页面后重置。
