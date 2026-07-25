import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  AlertTriangle, ArrowDown, Check, Download, FileVideo, Pause, Play,
  RotateCcw, Route, Upload, Video, X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { jobsApi, trajectoryApi, visualizationsApi, type JobDetail } from '../api'
import { ApiError, apiUrl } from '../api/http'
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
  const sourceVideoRef = useRef<HTMLVideoElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState('')
  const [activeJobId, setActiveJobId] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [sourceVideoOpen, setSourceVideoOpen] = useState(true)
  const [sourceVideoError, setSourceVideoError] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [localTrajectory, setLocalTrajectory] = useState<Awaited<ReturnType<typeof trajectoryApi.parseLocal>> | null>(null)
  const [trajectorySourceFile, setTrajectorySourceFile] = useState<File | null>(null)
  const [renderFps, setRenderFps] = useState(24)
  const [renderSpeed, setRenderSpeed] = useState(1)
  const [visualizationId, setVisualizationId] = useState<string | null>(null)

  const listQuery = useInfiniteQuery({
    queryKey: ['jobs'],
    initialPageParam: undefined as string | undefined,
    queryFn: ({ pageParam }) => jobsApi.list({ limit: 8, cursor: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchInterval: (query) => (query.state.data?.pages.length ?? 1) === 1 ? 5000 : false,
  })
  const jobQuery = useQuery({
    queryKey: ['job', activeJobId], queryFn: () => jobsApi.get(activeJobId!), enabled: Boolean(activeJobId),
    refetchInterval: (query) => ['succeeded', 'failed'].includes(query.state.data?.status ?? '') ? false : 1200,
  })
  const trajectoryQuery = useQuery({
    queryKey: ['trajectory', activeJobId], queryFn: () => trajectoryApi.getByJob(activeJobId!),
    enabled: jobQuery.data?.status === 'succeeded' && jobQuery.data.resultAvailable !== false && Boolean(activeJobId),
  })
  const visualizationQuery = useQuery({
    queryKey: ['visualization', visualizationId],
    queryFn: () => visualizationsApi.get(visualizationId!),
    enabled: Boolean(visualizationId),
    refetchInterval: (query) => ['succeeded', 'failed'].includes(query.state.data?.status ?? '') ? false : 1500,
  })
  const createJob = useMutation({
    mutationFn: jobsApi.create,
    onSuccess: (job) => {
      setLocalTrajectory(null)
      setTrajectorySourceFile(null)
      setVisualizationId(null)
      setActiveIndex(0)
      setPlaying(false)
      setActiveJobId(job.id)
      queryClient.setQueryData(['job', job.id], job)
      queryClient.resetQueries({ queryKey: ['jobs'] })
    },
  })
  const cancelJob = useMutation({
    mutationFn: jobsApi.cancel,
    onSuccess: (cancelled) => {
      queryClient.setQueryData(['job', cancelled.id], cancelled)
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
    },
  })
  const createVisualization = useMutation({
    mutationFn: async () => {
      let source = trajectorySourceFile
      if (!source) {
        const artifact = job?.artifacts.find((item) => item.kind === 'trajectory')
        if (!artifact) throw new ApiError('当前任务没有可用于渲染的轨迹文件', 409, 'TRAJECTORY_NOT_READY')
        const response = await fetch(apiUrl(artifact.downloadUrl), { headers: { Accept: 'application/json' } })
        if (!response.ok) {
          const payload = await response.json().catch(() => null)
          throw new ApiError(payload?.message ?? '轨迹文件下载失败', response.status, payload?.code)
        }
        source = new File([await response.blob()], artifact.name, { type: 'application/json' })
      }
      return visualizationsApi.create({ trajectoryFile: source, fps: renderFps, speed: renderSpeed })
    },
    onSuccess: (visualization) => setVisualizationId(visualization.id),
  })
  const parseTrajectory = useMutation({
    mutationFn: trajectoryApi.parseLocal,
    onSuccess: (data) => {
      setLocalTrajectory(data)
      setVisualizationId(null)
      setActiveJobId(null)
      setFile(null)
      setActiveIndex(0)
      document.querySelector('#workspace')?.scrollIntoView({ behavior: 'smooth' })
    },
  })

  const job = jobQuery.data
  const jobItems = listQuery.data?.pages.flatMap((page) => page.items) ?? []
  const requestError = createJob.error ?? parseTrajectory.error ?? cancelJob.error ?? trajectoryQuery.error ?? createVisualization.error ?? visualizationQuery.error
  const trajectory = localTrajectory ?? trajectoryQuery.data
  const finished = Boolean(localTrajectory) || job?.status === 'succeeded'
  const point = trajectory?.points[activeIndex]
  const sourceVideoUrl = job?.sourceVideoUrl ? apiUrl(job.sourceVideoUrl) : null

  const indexAtTime = (time: number) => {
    if (!trajectory?.points.length) return 0
    let low = 0
    let high = trajectory.points.length - 1
    while (low < high) {
      const middle = Math.ceil((low + high) / 2)
      if (trajectory.points[middle].timeFromStartS <= time) low = middle
      else high = middle - 1
    }
    const next = Math.min(low + 1, trajectory.points.length - 1)
    return Math.abs(trajectory.points[next].timeFromStartS - time) < Math.abs(trajectory.points[low].timeFromStartS - time) ? next : low
  }

  useEffect(() => {
    if (!playing || sourceVideoUrl || !trajectory || trajectory.points.length < 2) return
    const currentIndex = Math.min(activeIndex, trajectory.points.length - 1)
    const nextIndex = currentIndex >= trajectory.points.length - 1 ? 0 : currentIndex + 1
    const currentTime = trajectory.points[currentIndex].timeFromStartS
    const nextTime = trajectory.points[nextIndex].timeFromStartS
    const fallbackDelay = 1000 / Math.max(trajectory.fps, 1)
    const sourceDelay = nextIndex === 0 ? fallbackDelay : Math.max((nextTime - currentTime) * 1000, 0)
    const timer = window.setTimeout(() => setActiveIndex(nextIndex), Math.max(sourceDelay / speed, 16))
    return () => window.clearTimeout(timer)
  }, [activeIndex, playing, sourceVideoUrl, speed, trajectory])

  useEffect(() => {
    const video = sourceVideoRef.current
    if (!video || !sourceVideoUrl) return
    video.playbackRate = speed
    if (!playing) {
      video.pause()
      return
    }
    const targetTime = trajectory?.points[activeIndex]?.timeFromStartS ?? 0
    if (video.readyState > 0 && Math.abs(video.currentTime - targetTime) > 0.12) video.currentTime = targetTime
    void video.play().catch(() => setPlaying(false))
  }, [playing, sourceVideoUrl, speed])

  useEffect(() => {
    const video = sourceVideoRef.current
    if (!video || !sourceVideoUrl || !playing) return
    let animationFrame = 0
    const synchronize = () => {
      const nextIndex = indexAtTime(video.currentTime)
      setActiveIndex((current) => current === nextIndex ? current : nextIndex)
      animationFrame = window.requestAnimationFrame(synchronize)
    }
    animationFrame = window.requestAnimationFrame(synchronize)
    return () => window.cancelAnimationFrame(animationFrame)
  }, [playing, sourceVideoUrl, trajectory])

  const chooseFile = (next?: File) => {
    setFileError('')
    if (!next) return
    if (next.size > 200 * 1024 * 1024) return setFileError('文件超过 200 MB 限制')
    if (!allowed.includes(next.type) && !/\.(mp4|mov|mkv|avi|webm|m4v)$/i.test(next.name)) return setFileError('不支持这个视频格式')
    setFile(next)
  }
  const reset = () => { setFile(null); setActiveJobId(null); setLocalTrajectory(null); setTrajectorySourceFile(null); setVisualizationId(null); setActiveIndex(0); setPlaying(false); setSourceVideoOpen(true); setSourceVideoError(false); setFileError('') }
  const phase = finished ? 'result' : activeJobId ? 'processing' : 'upload'
  const openJob = (jobId: string) => {
    setLocalTrajectory(null)
    setTrajectorySourceFile(null)
    setVisualizationId(null)
    setActiveIndex(0)
    setPlaying(false)
    setSourceVideoOpen(true)
    setSourceVideoError(false)
    setFile(null)
    setFileError('')
    setActiveJobId(jobId)
    document.querySelector('#workspace')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="page single-page">
      <header className="single-hero">
        <div><p className="eyebrow">VIDEO → CAMERA MOTION</p><h1>一个页面，<br />跑完整条轨迹。</h1></div>
        <div className="hero-side"><p>上传视频，等待解析，在同一个工作区检查三维相机运动。没有页面跳转，没有隐藏步骤。</p><input ref={trajectoryInputRef} hidden type="file" accept=".zip,.csv,.json,.jsonl" onChange={(e) => { const source = e.target.files?.[0]; if (source) { setTrajectorySourceFile(source); parseTrajectory.mutate(source) } }} /><button className="button button-light" onClick={() => trajectoryInputRef.current?.click()}><Route /> {parseTrajectory.isPending ? '正在解析轨迹…' : '导入已有轨迹'}</button></div>
      </header>

      <section className="workflow" id="workspace">
        <div className="workflow-label"><span>01</span><strong>重建工作区</strong><i>{phase === 'upload' ? '等待视频' : phase === 'processing' ? '正在解析' : '轨迹就绪'}</i></div>
        <div className="workspace-grid">
          <div className="workspace-main">
            {requestError && <div className="alert error"><AlertTriangle />{requestError.message}</div>}
            {phase === 'upload' && (
              <div className="upload-stage">
                <div className="drop-zone main-drop" onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); chooseFile(e.dataTransfer.files[0]) }} onClick={() => !file && inputRef.current?.click()}>
                  <input ref={inputRef} type="file" accept="video/*,.mkv,.m4v" hidden onChange={(e) => chooseFile(e.target.files?.[0])} />
                  {!file ? <><div className="drop-icon"><Upload size={42} /></div><span className="drop-number">01 / DROP</span><h2>上传一个视频</h2><p>拖到这里，或者点击选择文件</p><button className="button button-dark" type="button">选择视频</button></> : <><FileVideo className="file-hero-icon" /><span className="drop-number">READY TO SEND</span><h2>{file.name}</h2><p>{formatBytes(file.size)} · 等待提交</p><button className="remove-file" onClick={(e) => { e.stopPropagation(); setFile(null) }}><X /> 重新选择</button></>}
                </div>
                {fileError && <div className="alert error"><AlertTriangle />{fileError}</div>}
                {requestError && <div className="alert error"><AlertTriangle />{requestError.message}</div>}
                <button className="button button-primary workflow-submit" disabled={!file || createJob.isPending} onClick={() => file && createJob.mutate({ video: file })}>{createJob.isPending ? '正在提交…' : '开始解析与重建'} <ArrowDown /></button>
              </div>
            )}

            {phase === 'processing' && jobQuery.isLoading && (
              <div className="processing-stage"><div className="processing-visual"><div className="loader-square" /><h2>正在加载任务详情</h2></div></div>
            )}

            {phase === 'processing' && jobQuery.isError && (
              <div className="processing-stage failed-stage"><div className="processing-visual"><AlertTriangle /><h2>{jobQuery.error.message}</h2><button className="button button-light" onClick={() => jobQuery.refetch()}>重新加载</button></div></div>
            )}

            {phase === 'processing' && job && job.status !== 'failed' && (
              <div className="processing-stage">
                <div className="processing-visual"><div className="scan-frame"><FileVideo /><div className="scan-line" /></div><span>{String(job.progress.percent).padStart(2, '0')}%</span><h2>{job.progress.stageLabel}</h2><p>{job.source.originalName}</p></div>
                <div className="stage-track">{['上传完成', '视频校验', '等待 GPU', '轨迹重建', '验证打包'].map((label, index) => <div className={job.progress.percent >= index * 22 ? 'done' : ''} key={label}><i>{job.progress.percent >= index * 22 ? '✓' : index + 1}</i><span>{label}</span></div>)}</div>
                {['uploaded', 'validating', 'queued'].includes(job.status) && <button className="button button-light" disabled={cancelJob.isPending} onClick={() => cancelJob.mutate(job.id)}>{cancelJob.isPending ? '正在取消…' : '取消任务'}</button>}
              </div>
            )}

            {job?.status === 'failed' && (
              <div className="processing-stage failed-stage"><div className="processing-visual"><AlertTriangle /><span>FAILED</span><h2>{job.error?.message ?? '算法任务执行失败'}</h2><p>{job.id}</p><button className="button button-light" onClick={reset}>处理新视频</button></div></div>
            )}

            {phase === 'result' && trajectory && point && (
              <div className="result-stage">
                <div className="canvas-top"><span>3D CAMERA TRAJECTORY</span><div><i className="green-dot" /> START <i className="orange-dot" /> CURRENT</div></div>
                <div className="trajectory-viewer">
                  <TrajectoryCanvas trajectory={trajectory} activeIndex={activeIndex} />
                  {sourceVideoUrl && !sourceVideoOpen && <button className="source-video-reopen" onClick={() => setSourceVideoOpen(true)}><Video /> 显示原视频</button>}
                  {sourceVideoUrl && (
                    <div className={`source-video-window ${sourceVideoOpen ? '' : 'source-video-window-hidden'}`}>
                      <div className="source-video-title"><span><i /> 原始视频 · 同步</span><button aria-label="关闭原始视频窗口" onClick={() => setSourceVideoOpen(false)}><X /></button></div>
                      {sourceVideoError && <div className="source-video-error"><AlertTriangle />浏览器无法播放该原始视频格式</div>}
                      <video ref={sourceVideoRef} muted playsInline preload="metadata" src={sourceVideoUrl} onEnded={() => setPlaying(false)} onError={() => setSourceVideoError(true)} />
                    </div>
                  )}
                </div>
                <div className="transport"><button className="transport-button" onClick={() => setPlaying(!playing)}>{playing ? <Pause /> : <Play />}</button><button className="transport-button" onClick={() => { setPlaying(false); setActiveIndex(0); if (sourceVideoRef.current?.readyState) sourceVideoRef.current.currentTime = 0 }}><RotateCcw /></button><span className="timecode">{point.timeFromStartS.toFixed(2)}s</span><input type="range" min="0" max={trajectory.points.length - 1} value={activeIndex} onChange={(e) => { const index = Number(e.target.value); setActiveIndex(index); if (sourceVideoRef.current?.readyState) sourceVideoRef.current.currentTime = trajectory.points[index].timeFromStartS }} /><span>{trajectory.points.at(-1)?.timeFromStartS.toFixed(2)}s</span><select value={speed} onChange={(e) => setSpeed(Number(e.target.value))}><option value="0.5">0.5×</option><option value="1">1×</option><option value="2">2×</option><option value="4">4×</option></select></div>
              </div>
            )}
            {phase === 'result' && job?.resultAvailable === false && <div className="processing-stage failed-stage"><div className="processing-visual"><AlertTriangle /><span>EXPIRED</span><h2>任务结果已经过期</h2><p>任务记录仍然保留，但轨迹数据集已按保留策略清理。</p><button className="button button-light" onClick={reset}>重新处理视频</button></div></div>}
            {phase === 'result' && job?.resultAvailable !== false && !trajectory && <div className="processing-stage"><div className="processing-visual"><div className="loader-square" /><h2>正在加载轨迹数据</h2></div></div>}
          </div>

          <aside className="workspace-side">
            {phase === 'upload' && <RequirementsPanel />}
            {phase === 'processing' && job && <AnalysisPanel job={job} />}
            {phase === 'result' && job?.resultAvailable === false && (
              <div className="side-state requirements-state">
                <span className="panel-kicker">RESULT EXPIRED</span>
                <h2>结果已清理</h2>
                <p className="side-intro">任务元数据仍保留，但数据集已经超过服务端保留时间。</p>
                {job.resultExpiresAt && <p className="safety-note">原计划过期时间：{new Date(job.resultExpiresAt).toLocaleString('zh-CN')}</p>}
                <button className="button button-light new-run" onClick={reset}>重新处理视频</button>
              </div>
            )}
            {phase === 'result' && trajectory && point && (
              <div className="side-state coordinate-state">
                <span className="panel-kicker">LIVE COORDINATES</span><div className="side-title-row"><h2>XYZ 位姿</h2><strong className="frame-chip">#{point.frameIndex}</strong></div>
                <div className="coordinate-stack">{['X','Y','Z'].map((axis, index) => <div key={axis}><span className={`axis axis-${axis.toLowerCase()}`}>{axis}</span><strong>{point.positionXYZ[index].toFixed(5)}</strong><small>{trajectory.lengthUnit}</small></div>)}</div>
                <h3 className="quaternion-title">QUATERNION / XYZW</h3><div className="quat-grid">{point.orientationXYZW.map((value, index) => <div key={index}><span>Q{['X','Y','Z','W'][index]}</span><strong>{value.toFixed(4)}</strong></div>)}</div>
                <dl className="trajectory-meta"><div><dt>FRAME ID</dt><dd>{trajectory.frameId}</dd></div><div><dt>CHILD FRAME</dt><dd>{trajectory.childFrameId}</dd></div><div><dt>TIME</dt><dd>{point.timeFromStartS.toFixed(3)}s</dd></div><div><dt>FIRST NORMALIZED</dt><dd>{trajectory.firstPoseNormalized ? 'TRUE' : 'FALSE'}</dd></div><div><dt>ROBOT READY</dt><dd>FALSE</dd></div></dl>
                {job?.resultAvailable !== false && job?.artifacts?.length ? <div className="artifact-actions">{job.artifacts.map((artifact) => <a className="button button-light" href={apiUrl(artifact.downloadUrl)} key={artifact.name} download>{artifact.kind === 'dataset' ? '下载完整数据集' : `下载 ${artifact.name}`}</a>)}</div> : null}
                <button className="button button-light new-run" onClick={reset}>处理新视频</button>
              </div>
            )}
          </aside>
        </div>
        {phase === 'result' && trajectory && (
          <section className="visualization-panel">
            <div>
              <span className="panel-kicker">MP4 RENDER</span>
              <h2>生成多视角轨迹视频</h2>
              <p>服务端会根据当前轨迹生成同步的透视、投影和 Camera POV 视频。</p>
            </div>
            <div className="render-controls">
              <label>FPS<input type="number" min="10" max="60" value={renderFps} onChange={(event) => setRenderFps(Number(event.target.value))} /></label>
              <label>播放速度<select value={renderSpeed} onChange={(event) => setRenderSpeed(Number(event.target.value))}><option value="0.25">0.25×</option><option value="0.5">0.5×</option><option value="1">1×</option><option value="2">2×</option><option value="4">4×</option></select></label>
              <button className="button button-purple" disabled={!Number.isFinite(renderFps) || renderFps < 10 || renderFps > 60 || createVisualization.isPending || visualizationQuery.data?.status === 'queued' || visualizationQuery.data?.status === 'rendering'} onClick={() => createVisualization.mutate()}>
                {createVisualization.isPending ? '正在提交…' : visualizationQuery.data?.status === 'queued' || visualizationQuery.data?.status === 'rendering' ? '渲染中 ' + visualizationQuery.data.progressPercent + '%' : '生成 MP4'}
              </button>
            </div>
            {visualizationQuery.data?.status === 'failed' && <div className="alert error"><AlertTriangle />{visualizationQuery.data.error?.message ?? '视频渲染失败'}</div>}
            {visualizationQuery.data?.status === 'succeeded' && visualizationQuery.data.previewUrl && (
              <div className="render-result">
                <video controls preload="metadata" src={apiUrl(visualizationQuery.data.previewUrl)} />
                {visualizationQuery.data.downloadUrl && <a className="button button-primary" href={apiUrl(visualizationQuery.data.downloadUrl)} download>下载 MP4</a>}
              </div>
            )}
          </section>
        )}
      </section>

      <section className="queue-section" id="queue">
        <div className="section-heading"><div><span className="section-index">02</span><h2>任务队列</h2></div><span className="queue-live"><i /> {(listQuery.data?.pages.length ?? 1) === 1 ? 'LIVE · 5S REFRESH' : 'PAGED VIEW'}</span></div>
        <div className="job-table-wrap"><table className="job-table"><thead><tr><th>任务 / 文件</th><th>状态</th><th>进度</th><th>视频信息</th><th>时间</th><th /></tr></thead><tbody>
          {listQuery.isError && <tr><td colSpan={6} className="empty-cell">任务队列加载失败：{listQuery.error.message} <button className="button button-light" onClick={() => listQuery.refetch()}>重试</button></td></tr>}
          {listQuery.isLoading && <tr><td colSpan={6} className="empty-cell">正在读取任务队列…</td></tr>}
          {jobItems.map((item) => <tr className={activeJobId === item.id ? 'active-row' : ''} key={item.id}><td><strong>{item.source.originalName}</strong><small>{item.id}</small></td><td><StatusBadge status={item.status} />{item.status === 'succeeded' && item.resultAvailable === false && <small>结果已过期</small>}</td><td><div className="mini-progress"><span style={{ width: `${item.progress.percent}%` }} /></div><small>{item.progress.percent}% · {item.progress.stageLabel}</small></td><td><strong>{item.source.width || '—'} × {item.source.height || '—'}</strong><small>{formatBytes(item.source.sizeBytes)}</small></td><td>{formatTime(item.createdAt)}</td><td><button className="icon-button" aria-label="在工作区打开" onClick={() => openJob(item.id)}>{item.status === 'succeeded' ? <Play /> : <Download />}</button></td></tr>)}
          {listQuery.hasNextPage && <tr><td colSpan={6} className="empty-cell"><button className="button button-light" disabled={listQuery.isFetchingNextPage} onClick={() => listQuery.fetchNextPage()}>{listQuery.isFetchingNextPage ? '正在加载…' : '加载更多任务'}</button></td></tr>}
        </tbody></table></div>
      </section>

      <section className="single-about" id="about"><span className="section-index">03</span><h2>关于输出</h2><p>所有轨迹都以第一帧相机坐标系为基准，四元数顺序为 XYZW。未完成外部尺度、坐标系与手眼标定之前，数据始终标记为 <strong>robot_execution_ready: false</strong>。</p></section>
    </div>
  )
}
