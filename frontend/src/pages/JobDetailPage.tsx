import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AlertTriangle, ArrowLeft, Box, Download, FileJson, Route, StopCircle } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { jobsApi } from '../api'
import { StatusBadge } from '../components/StatusBadge'

export function JobDetailPage() {
  const { jobId = '' } = useParams()
  const queryClient = useQueryClient()
  const { data: job, isLoading, error } = useQuery({
    queryKey: ['job', jobId], queryFn: () => jobsApi.get(jobId),
    refetchInterval: (query) => query.state.data?.status === 'succeeded' ? false : 1800,
  })
  const cancel = useMutation({ mutationFn: () => jobsApi.cancel(jobId), onSuccess: (data) => queryClient.setQueryData(['job', jobId], data) })
  if (isLoading) return <div className="page loading-panel">正在读取任务状态…</div>
  if (error || !job) return <div className="page loading-panel">任务读取失败：{error?.message}</div>
  const running = ['queued', 'reconstructing', 'packaging'].includes(job.status)

  return (
    <div className="page detail-page">
      <Link to="/" className="back-link"><ArrowLeft /> 返回工作台</Link>
      <div className="detail-title">
        <div><p className="eyebrow">JOB / {job.id}</p><h1>{job.source.originalName}</h1></div>
        <StatusBadge status={job.status} />
      </div>

      <section className="progress-card">
        <div className="progress-number">{job.progress.percent}<small>%</small></div>
        <div className="progress-main"><div><strong>{job.progress.stageLabel}</strong><span>{job.progress.queuePosition ? `前方还有 ${job.progress.queuePosition} 个任务` : '任务状态由服务端定期更新'}</span></div><div className="big-progress"><span style={{ width: `${job.progress.percent}%` }} /></div></div>
        {running && <button className="button button-light" onClick={() => cancel.mutate()}><StopCircle /> 取消</button>}
      </section>

      <div className="detail-grid">
        <section className="info-card">
          <span className="section-index">01</span><h2>视频参数</h2>
          <dl>
            <div><dt>文件大小</dt><dd>{(job.source.sizeBytes / 1024 / 1024).toFixed(2)} MB</dd></div>
            <div><dt>分辨率</dt><dd>{job.source.width ? `${job.source.width} × ${job.source.height}` : '等待检测'}</dd></div>
            <div><dt>编码</dt><dd>{job.source.codec.toUpperCase()}</dd></div>
            <div><dt>帧数</dt><dd>{job.source.frameCount || '—'}</dd></div>
            <div><dt>时长</dt><dd>{job.source.durationSeconds ? `${job.source.durationSeconds} 秒` : '—'}</dd></div>
            <div><dt>帧率</dt><dd>{job.source.fps ? `${job.source.fps} FPS` : '—'}</dd></div>
          </dl>
        </section>
        <section className="info-card acid">
          <span className="section-index">02</span><h2>轨迹协议</h2>
          <dl>
            <div><dt>父坐标系</dt><dd>{job.frameId ?? '完成后生成'}</dd></div>
            <div><dt>长度单位</dt><dd>{job.lengthUnit ?? '待定'}</dd></div>
            <div><dt>位姿数量</dt><dd>{job.outputCount ?? '—'}</dd></div>
            <div><dt>机器人可执行</dt><dd>FALSE</dd></div>
          </dl>
          <div className="warning-line"><AlertTriangle /> 必须先完成尺度、坐标系和手眼标定</div>
        </section>
      </div>

      {job.status === 'succeeded' && (
        <section className="results-block">
          <div className="section-heading"><div><span className="section-index">03</span><h2>输出结果</h2></div><Link to={`/trajectory/${job.id}`} className="button button-purple"><Route /> 打开 3D 轨迹</Link></div>
          <div className="artifact-list">
            {job.artifacts.length ? job.artifacts.map((item) => (
              <article key={item.name}><FileJson /><div><strong>{item.name}</strong><small>{(item.sizeBytes / 1024).toFixed(1)} KB · SHA256 {item.sha256.slice(0, 16)}…</small></div><a href={item.downloadUrl} className="icon-button" aria-label="下载"><Download /></a></article>
            )) : <article><Box /><div><strong>camera_dataset_{job.id}.zip</strong><small>Mock 任务完成 · 真实后端将返回下载链接</small></div><button className="icon-button"><Download /></button></article>}
          </div>
        </section>
      )}
    </div>
  )
}
