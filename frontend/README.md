# CAM//TRACE Frontend

独立 React + TypeScript 前端。所有页面数据均通过真实 `/api` 服务获取。

```bash
npm install
npm run dev
```

构建：

```bash
npm run build
```

本地开发前请先在仓库根目录启动 FastAPI（默认端口 `8000`）。Vite 会把 `/api` 代理到该服务。

接口与传输协议见仓库根目录的 `API_AND_DEVICE_PROTOCOL.md`。
