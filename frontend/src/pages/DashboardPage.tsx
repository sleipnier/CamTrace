import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  AlertTriangle, ArrowDown, Check, Download, FileVideo, Pause, Play,
  RotateCcw, Route, Upload, X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { jobsApi, trajectoryApi, type JobDetail } from '../api'
import { StatusBadge } from '../components/StatusBadge'
import { TrajectoryCanvas } from '../components/TrajectoryCanvas'

const allowed = ['video/mp4', 'video/quicktime', 'video/webm', 'video/x-matroska']
const formatBytes = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(1)} MB`
const formatTime = (value: string) => new Intl.DateTimeFormat('zh-CN', { hour: '2-digit', minute: '2-digit' }).format(new Date(value))

function RequirementsPanel() {
  return (
    <div className="side-state requirements-state">
      <span className="panel-kicker">BEFORE YOU START</span>
      <h2>视频要求</h2>
      <p className="side-intro">文件满足以下条件，才能进入 GPU 重建队列。</p>
      <ul className="rule-list">
        <li><Check /><span><strong>视频格式</strong>MP4 / MOV / MKV / AVI / WEBM</span></li>
        <li><Check /><span><strong>文件大小</strong>不超过 200 MB</span></li>
        <li><Check /><span><strong>视频长度</strong>不超过 60 秒</span></li>
        <li><Check /><span><strong>帧数范围</strong>8～1000 帧</span></li>
        <li><Check /><span><strong>最高分辨率</strong>3840 × 2160</span></li>
      </ul>
      <div className="safety-note"><AlertTriangle /><p><strong>注意</strong>输出是相机重建轨迹，不能直接作为机器人执行指令。</p></div>
    </div>
  )
}

function SkeletonValue() { return <span className="skeleton-value" aria-label="正在解析" /> }

function AnalysisPanel({ job }: { job: JobDetail }) {
  const items = [
    ['文件大小', formatBytes(job.source.sizeBytes)],
    ['视频编码', job.source.codec !== 'pending' ? job.source.codec.toUpperCase() : null],
    ['视频时长', job.source.durationSeconds ? `${job.source.durationSeconds.toFixed(1)} 秒` : null],
    ['分辨率', job.source.width ? `${job.source.width} × ${job.source.height}` : null],
    ['视频帧数', job.source.frameCount ? `${job.source.frameCount} 帧` : null],
    ['平均帧率', job.source.fps ? `${job.source.fps} FPS` : null],
  ]
  return (
    <div className="side-state analysis-state">
      <span className="panel-kicker">LIVE ANALYSIS</span>
      <div className="side-title-row"><h2>视频参数</h2><StatusBadge status={job.status} /></div>
      <p className="side-intro">参数由后端逐项探测，未完成的项目会自动保持 Loading 状态。</p>
      <div className="parameter-grid">
        {items.map(([label, value]) => <div key={label}><span>{label}</span>{value ? <strong>{value}</strong> : <SkeletonValue />}</div>)}
      </div>
      <div className="side-progress"><div><span>{job.progress.stageLabel}</span><strong>{job.progress.percent}%</strong></div><div className="big-progress"><i style={{ width: `${job.progress.percent}%` }} /></div></div>
    </div>
  )
}

export function DashboardPage() {
  const queryClient = useQueryClient()
  const inputRef = useRef<HTMLInputElement>(null)
  const trajectoryInputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState('')
  const [activeJobId, setActiveJobId] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [localTrajectory, setLocalTrajectory] = useState<Awaited<ReturnType<typeof trajectoryApi.parseLocal>> | null>(null)

  const listQuery = useQuery({ queryKey: ['jobs'], queryFn: () => jobsApi.list({ limit: 8 }), refetchInterval: 5000 })
  const jobQuery = useQuery({
    queryKey: ['job', activeJobId], queryFn: () => jobsApi.get(activeJobId!), enabled: Boolean(activeJobId),
    refetchInterval: (query) => query.state.data?.status === 'succeeded' ? false : 1200,
  })
  const trajectoryQuery = useQuery({
    queryKey: ['trajectory', activeJobId], queryFn: () => trajectoryApi.getByJob(activeJobId!),
    enabled: jobQuery.data?.status === 'succeeded' && Boolean(activeJobId),
  })
  const createJob = useMutation({
    mutationFn: jobsApi.create,
    onSuccess: (job) => {
      setActiveJobId(job.id)
      queryClient.setQueryData(['job', job.id], job)
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
    },
  })
  const parseTrajectory = useMutation({
    mutationFn: trajectoryApi.parseLocal,
    onSuccess: (data) => {
      setLocalTrajectory(data)
      setActiveJobId(null)
      setFile(null)
      setActiveIndex(0)
      document.querySelector('#workspace')?.scrollIntoView({ behavior: 'smooth' })
    },
  })

  const job = jobQuery.data
  const trajectory = localTrajectory ?? trajectoryQuery.data
  const finished = Boolean(localTrajectory) || job?.status === 'succeeded'
  const point = trajectory?.points[activeIndex]

  useEffect(() => {
    if (!playing || !trajectory) return
    const timer = window.setInterval(() => setActiveIndex((index) => index >= trajectory.points.length - 1 ? 0 : index + 1), 1000 / Math.max(trajectory.fps, 1) / speed)
    return () => window.clearInterval(timer)
  }, [playing, speed, trajectory])

  const chooseFile = (next?: File) => {
    setFileError('')
    if (!next) return
    if (next.size > 200 * 1024 * 1024) return setFileError('文件超过 200 MB 限制')
    if (!allowed.includes(next.type) && !/\.(mp4|mov|mkv|avi|webm|m4v)$/i.test(next.name)) return setFileError('不支持这个视频格式')
    setFile(next)
  }
  const reset = () => { setFile(null); setActiveJobId(null); setLocalTrajectory(null); setActiveIndex(0); setPlaying(false); setFileError('') }
  const phase = finished ? 'result' : activeJobId ? 'processing' : 'upload'

  return (
    <div className="page single-page">
      <header className="single-hero">
        <div><p className="eyebrow">VIDEO → CAMERA MOTION</p><h1>一个页面，<br />跑完整条轨迹。</h1></div>
        <div className="hero-side"><p>上传视频，等待解析，在同一个工作区检查三维相机运动。没有页面跳转，没有隐藏步骤。</p><input ref={trajectoryInputRef} hidden type="file" accept=".zip,.csv,.json,.jsonl" onChange={(e) => e.target.files?.[0] && parseTrajectory.mutate(e.target.files[0])} /><button className="button button-light" onClick={() => trajectoryInputRef.current?.click()}><Route /> {parseTrajectory.isPending ? '正在解析轨迹…' : '导入已有轨迹'}</button></div>
      </header>

      <section className="workflow" id="workspace">
        <div className="workflow-label"><span>01</span><strong>重建工作区</strong><i>{phase === 'upload' ? '等待视频' : phase === 'processing' ? '正在解析' : '轨迹就绪'}</i></div>
        <div className="workspace-grid">
          <div className="workspace-main">
            {phase === 'upload' && (
              <div className="upload-stage">
                <div className="drop-zone main-drop" onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); chooseFile(e.dataTransfer.files[0]) }} onClick={() => !file && inputRef.current?.click()}>
                  <input ref={inputRef} type="file" accept="video/*,.mkv,.m4v" hidden onChange={(e) => chooseFile(e.target.files?.[0])} />
                  {!file ? <><div className="drop-icon"><Upload size={42} /></div><span className="drop-number">01 / DROP</span><h2>上传一个视频</h2><p>拖到这里，或者点击选择文件</p><button className="button button-dark" type="button">选择视频</button></> : <><FileVideo className="file-hero-icon" /><span className="drop-number">READY TO SEND</span><h2>{file.name}</h2><p>{formatBytes(file.size)} · 等待提交</p><button className="remove-file" onClick={(e) => { e.stopPropagation(); setFile(null) }}><X /> 重新选择</button></>}
                </div>
                {fileError && <div className="alert error"><AlertTriangle />{fileError}</div>}
                <button className="button button-primary workflow-submit" disabled={!file || createJob.isPending} onClick={() => file && createJob.mutate({ video: file })}>{createJob.isPending ? '正在提交…' : '开始解析与重建'} <ArrowDown /></button>
              </div>
            )}

            {phase === 'processing' && job && job.status !== 'failed' && (
              <div className="processing-stage">
                <div className="processing-visual"><div className="scan-frame"><FileVideo /><div className="scan-line" /></div><span>{String(job.progress.percent).padStart(2, '0')}%</span><h2>{job.progress.stageLabel}</h2><p>{job.source.originalName}</p></div>
                <div className="stage-track">{['上传完成', '视频校验', '等待 GPU', '轨迹重建', '验证打包'].map((label, index) => <div className={job.progress.percent >= index * 22 ? 'done' : ''} key={label}><i>{job.progress.percent >= index * 22 ? '✓' : index + 1}</i><span>{label}</span></div>)}</div>
              </div>
            )}

            {job?.status === 'failed' && (
              <div className="processing-stage failed-stage"><div className="processing-visual"><AlertTriangle /><span>FAILED</span><h2>{job.error?.message ?? '算法任务执行失败'}</h2><p>{job.id}</p><button className="button button-light" onClick={reset}>处理新视频</button></div></div>
            )}

            {phase === 'result' && trajectory && point && (
              <div className="result-stage">
                <div className="canvas-top"><span>3D CAMERA TRAJECTORY</span><div><i className="green-dot" /> START <i className="orange-dot" /> CURRENT</div></div>
                <TrajectoryCanvas trajectory={trajectory} activeIndex={activeIndex} />
                <div className="transport"><button className="transport-button" onClick={() => setPlaying(!playing)}>{playing ? <Pause /> : <Play />}</button><button className="transport-button" onClick={() => setActiveIndex(0)}><RotateCcw /></button><span className="timecode">{point.timeFromStartS.toFixed(2)}s</span><input type="range" min="0" max={trajectory.points.length - 1} value={activeIndex} onChange={(e) => setActiveIndex(Number(e.target.value))} /><span>{trajectory.points.at(-1)?.timeFromStartS.toFixed(2)}s</span><select value={speed} onChange={(e) => setSpeed(Number(e.target.value))}><option value="0.5">0.5×</option><option value="1">1×</option><option value="2">2×</option><option value="4">4×</option></select></div>
              </div>
            )}
            {phase === 'result' && !trajectory && <div className="processing-stage"><div className="processing-visual"><div className="loader-square" /><h2>正在加载轨迹数据</h2></div></div>}
          </div>

          <aside className="workspace-side">
            {phase === 'upload' && <RequirementsPanel />}
            {phase === 'processing' && job && <AnalysisPanel job={job} />}
            {phase === 'result' && trajectory && point && (
              <div className="side-state coordinate-state">
                <span className="panel-kicker">LIVE COORDINATES</span><div className="side-title-row"><h2>XYZ 位姿</h2><strong className="frame-chip">#{point.frameIndex}</strong></div>
                <div className="coordinate-stack">{['X','Y','Z'].map((axis, index) => <div key={axis}><span className={`axis axis-${axis.toLowerCase()}`}>{axis}</span><strong>{point.positionXYZ[index].toFixed(5)}</strong><small>{trajectory.lengthUnit}</small></div>)}</div>
                <h3 className="quaternion-title">QUATERNION / XYZW</h3><div className="quat-grid">{point.orientationXYZW.map((value, index) => <div key={index}><span>Q{['X','Y','Z','W'][index]}</span><strong>{value.toFixed(4)}</strong></div>)}</div>
                <dl className="trajectory-meta"><div><dt>FRAME ID</dt><dd>{trajectory.frameId}</dd></div><div><dt>TIME</dt><dd>{point.timeFromStartS.toFixed(3)}s</dd></div><div><dt>ROBOT READY</dt><dd>FALSE</dd></div></dl>
                <button className="button button-light new-run" onClick={reset}>处理新视频</button>
              </div>
            )}
          </aside>
        </div>
      </section>

      <section className="queue-section" id="queue">
        <div className="section-heading"><div><span className="section-index">02</span><h2>任务队列</h2></div><span className="queue-live"><i /> LIVE · 5S REFRESH</span></div>
        <div className="job-table-wrap"><table className="job-table"><thead><tr><th>任务 / 文件</th><th>状态</th><th>进度</th><th>视频信息</th><th>时间</th><th /></tr></thead><tbody>
          {listQuery.isLoading && <tr><td colSpan={6} className="empty-cell">正在读取任务队列…</td></tr>}
          {(listQuery.data?.items ?? []).map((item) => <tr className={activeJobId === item.id ? 'active-row' : ''} key={item.id}><td><strong>{item.source.originalName}</strong><small>{item.id}</small></td><td><StatusBadge status={item.status} /></td><td><div className="mini-progress"><span style={{ width: `${item.progress.percent}%` }} /></div><small>{item.progress.percent}% · {item.progress.stageLabel}</small></td><td><strong>{item.source.width || '—'} × {item.source.height || '—'}</strong><small>{formatBytes(item.source.sizeBytes)}</small></td><td>{formatTime(item.createdAt)}</td><td><button className="icon-button" aria-label="在工作区打开" onClick={() => { setActiveJobId(item.id); setFile(null); document.querySelector('#workspace')?.scrollIntoView({ behavior: 'smooth' }) }}>{item.status === 'succeeded' ? <Play /> : <Download />}</button></td></tr>)}
        </tbody></table></div>
      </section>

      <section className="single-about" id="about"><span className="section-index">03</span><h2>关于输出</h2><p>所有轨迹都以第一帧相机坐标系为基准，四元数顺序为 XYZW。未完成外部尺度、坐标系与手眼标定之前，数据始终标记为 <strong>robot_execution_ready: false</strong>。</p></section>
    </div>
  )
}
