import { useQuery } from '@tanstack/react-query'
import { ArrowRight, Box, Clock3, Route, Upload, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { jobsApi } from '../api'
import { PageHeader } from '../components/PageHeader'
import { StatusBadge } from '../components/StatusBadge'

const formatBytes = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(1)} MB`
const formatTime = (value: string) => new Intl.DateTimeFormat('zh-CN', { hour: '2-digit', minute: '2-digit' }).format(new Date(value))

export function DashboardPage() {
  const { data, isLoading } = useQuery({ queryKey: ['jobs'], queryFn: () => jobsApi.list({ limit: 6 }), refetchInterval: 5000 })
  const jobs = data?.items ?? []
  const completed = jobs.filter((job) => job.status === 'succeeded').length
  const running = jobs.filter((job) => ['queued', 'reconstructing', 'packaging'].includes(job.status)).length

  return (
    <div className="page dashboard-page">
      <PageHeader
        eyebrow="VIDEO → CAMERA MOTION"
        title="把镜头运动，从视频里拽出来。"
        copy="上传普通视频，重建逐帧相机位姿。检查轨迹，导出数据，继续你的机器人或视觉工作流。"
        action={<Link to="/jobs/new" className="button button-primary"><Upload size={20} /> 开始重建 <ArrowRight /></Link>}
      />

      <section className="stats-grid" aria-label="系统概览">
        <article className="stat-card yellow"><span>当前任务</span><strong>{String(jobs.length).padStart(2, '0')}</strong><Box /></article>
        <article className="stat-card green"><span>处理完成</span><strong>{String(completed).padStart(2, '0')}</strong><Zap /></article>
        <article className="stat-card orange"><span>队列运行</span><strong>{String(running).padStart(2, '0')}</strong><Clock3 /></article>
        <article className="stat-card blue"><span>GPU WORKER</span><strong>01</strong><i>ONLINE</i></article>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div><span className="section-index">01</span><h2>任务队列</h2></div>
          <Link to="/jobs/new" className="text-link">新建任务 <ArrowRight size={18} /></Link>
        </div>
        <div className="job-table-wrap">
          <table className="job-table">
            <thead><tr><th>任务 / 文件</th><th>状态</th><th>进度</th><th>视频信息</th><th>创建时间</th><th /></tr></thead>
            <tbody>
              {isLoading && <tr><td colSpan={6} className="empty-cell">正在读取任务接口…</td></tr>}
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td><strong>{job.source.originalName}</strong><small>{job.id}</small></td>
                  <td><StatusBadge status={job.status} /></td>
                  <td><div className="mini-progress"><span style={{ width: `${job.progress.percent}%` }} /></div><small>{job.progress.percent}% · {job.progress.stageLabel}</small></td>
                  <td><strong>{job.source.width || '—'}×{job.source.height || '—'}</strong><small>{formatBytes(job.source.sizeBytes)}</small></td>
                  <td>{formatTime(job.createdAt)}</td>
                  <td><Link className="icon-button" to={`/jobs/${job.id}`} aria-label={`查看 ${job.id}`}><ArrowRight /></Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="quick-grid">
        <Link to="/jobs/new" className="action-card orange"><Upload /><div><span>BUILD DATASET</span><h3>上传视频重建</h3><p>MP4 / MOV / MKV · 最大 200 MB</p></div><ArrowRight /></Link>
        <Link to="/trajectory" className="action-card purple"><Route /><div><span>OPEN VIEWER</span><h3>检查已有轨迹</h3><p>ZIP / CSV / JSON / JSONL</p></div><ArrowRight /></Link>
      </section>
    </div>
  )
}
