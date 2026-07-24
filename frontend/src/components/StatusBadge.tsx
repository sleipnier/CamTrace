import type { JobStatus } from '../api'

const labels: Record<JobStatus, string> = {
  uploaded: '已上传', validating: '校验中', queued: '排队中', reconstructing: '重建中',
  packaging: '打包中', succeeded: '已完成', failed: '失败',
}

export function StatusBadge({ status }: { status: JobStatus }) {
  return <span className={`status-badge status-${status}`}><i /> {labels[status]}</span>
}
