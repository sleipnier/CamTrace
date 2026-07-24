import { useMutation, useQuery } from '@tanstack/react-query'
import { FileUp, Pause, Play, RotateCcw } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { trajectoryApi, type Trajectory } from '../api'
import { PageHeader } from '../components/PageHeader'
import { TrajectoryCanvas } from '../components/TrajectoryCanvas'

export function TrajectoryPage() {
  const { jobId } = useParams()
  const [local, setLocal] = useState<Trajectory | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const inputRef = useRef<HTMLInputElement>(null)
  const remote = useQuery({ queryKey: ['trajectory', jobId], queryFn: () => trajectoryApi.getByJob(jobId!), enabled: Boolean(jobId) })
  const parse = useMutation({ mutationFn: trajectoryApi.parseLocal, onSuccess: (data) => { setLocal(data); setActiveIndex(0) } })
  const trajectory = local ?? remote.data

  useEffect(() => {
    if (!playing || !trajectory) return
    const timer = window.setInterval(() => {
      setActiveIndex((current) => current >= trajectory.points.length - 1 ? 0 : current + 1)
    }, 1000 / trajectory.fps / speed)
    return () => window.clearInterval(timer)
  }, [playing, speed, trajectory])

  const point = trajectory?.points[activeIndex]
  return (
    <div className="page viewer-page">
      <PageHeader
        eyebrow="INTERACTIVE TRAJECTORY VIEWER"
        title="看清每一次移动。"
        copy="拖动三维画布旋转视角，使用时间轴逐帧检查相机位置和四元数。"
        action={<><input ref={inputRef} hidden type="file" accept=".zip,.csv,.json,.jsonl" onChange={(e) => e.target.files?.[0] && parse.mutate(e.target.files[0])} /><button className="button button-primary" onClick={() => inputRef.current?.click()}><FileUp /> 导入轨迹</button></>}
      />

      {!trajectory && (
        <div className="viewer-empty">
          <FileUp size={52} /><h2>{remote.isLoading || parse.isPending ? '正在解析轨迹…' : '还没有轨迹数据'}</h2>
          <p>导入 ZIP、CSV、JSON 或 JSONL，或者从已完成任务进入。</p>
        </div>
      )}

      {trajectory && point && (
        <div className="viewer-shell">
          <div className="canvas-panel">
            <div className="canvas-top"><span>3D / PERSPECTIVE</span><div><i className="green-dot" /> START <i className="orange-dot" /> CURRENT</div></div>
            <TrajectoryCanvas trajectory={trajectory} activeIndex={activeIndex} />
            <div className="transport">
              <button className="transport-button" onClick={() => setPlaying(!playing)}>{playing ? <Pause /> : <Play />}</button>
              <button className="transport-button" onClick={() => setActiveIndex(0)}><RotateCcw /></button>
              <span className="timecode">{point.timeFromStartS.toFixed(2)}s</span>
              <input aria-label="轨迹时间轴" type="range" min="0" max={trajectory.points.length - 1} value={activeIndex} onChange={(e) => setActiveIndex(Number(e.target.value))} />
              <span>{(trajectory.points.at(-1)?.timeFromStartS ?? 0).toFixed(2)}s</span>
              <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))} aria-label="播放速度"><option value="0.5">0.5×</option><option value="1">1×</option><option value="2">2×</option><option value="4">4×</option></select>
            </div>
          </div>

          <aside className="inspector">
            <div className="inspector-head"><span>FRAME</span><strong>{String(point.frameIndex).padStart(4, '0')}</strong><small>/ {trajectory.points.length - 1}</small></div>
            <section><h3>位置 / POSITION</h3>{['X', 'Y', 'Z'].map((axis, i) => <div className="vector-row" key={axis}><span className={`axis axis-${axis.toLowerCase()}`}>{axis}</span><strong>{point.positionXYZ[i].toFixed(5)}</strong></div>)}</section>
            <section><h3>四元数 / XYZW</h3>{['QX', 'QY', 'QZ', 'QW'].map((axis, i) => <div className="vector-row" key={axis}><span>{axis}</span><strong>{point.orientationXYZW[i].toFixed(5)}</strong></div>)}</section>
            <section className="meta-list"><h3>数据协议</h3><p><span>FRAME ID</span>{trajectory.frameId}</p><p><span>UNIT</span>{trajectory.lengthUnit}</p><p><span>FPS</span>{trajectory.fps}</p><p><span>ROBOT READY</span>FALSE</p></section>
          </aside>
        </div>
      )}
    </div>
  )
}
