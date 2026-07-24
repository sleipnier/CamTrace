import { useMutation } from '@tanstack/react-query'
import { AlertTriangle, ArrowRight, Check, FileVideo, Upload, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { jobsApi } from '../api'
import { PageHeader } from '../components/PageHeader'

const allowed = ['video/mp4', 'video/quicktime', 'video/webm', 'video/x-matroska']

export function NewJobPage() {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const create = useMutation({
    mutationFn: jobsApi.create,
    onSuccess: (job) => navigate(`/jobs/${job.id}`),
  })

  const choose = (next?: File) => {
    setError('')
    if (!next) return
    if (next.size > 200 * 1024 * 1024) return setError('文件超过 200 MB 限制')
    if (!allowed.includes(next.type) && !/\.(mp4|mov|mkv|avi|webm|m4v)$/i.test(next.name)) return setError('不支持这个视频格式')
    setFile(next)
  }

  return (
    <div className="page narrow-page">
      <PageHeader eyebrow="NEW RECONSTRUCTION" title="扔进一个视频。" copy="系统将检查视频并提交到 GPU 队列。Mock 模式会完整模拟任务创建与状态推进。" />
      <div className="step-strip"><span className="active">01 上传视频</span><span>02 参数检查</span><span>03 GPU 重建</span><span>04 下载结果</span></div>

      <section className="upload-layout">
        <div>
          <div
            className="drop-zone"
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => { event.preventDefault(); choose(event.dataTransfer.files[0]) }}
            onClick={() => inputRef.current?.click()}
          >
            <input ref={inputRef} type="file" accept="video/*,.mkv,.m4v" hidden onChange={(event) => choose(event.target.files?.[0])} />
            <div className="drop-icon"><Upload size={40} strokeWidth={3} /></div>
            <h2>拖放视频到这里</h2>
            <p>或者点击，从本地选择一个文件</p>
            <button className="button button-dark" type="button">选择视频</button>
          </div>
          {error && <div className="alert error"><AlertTriangle /> {error}</div>}
          {file && (
            <div className="selected-file">
              <FileVideo size={34} />
              <div><strong>{file.name}</strong><span>{(file.size / 1024 / 1024).toFixed(2)} MB · 等待服务端探测参数</span></div>
              <button onClick={() => setFile(null)} aria-label="移除文件"><X /></button>
            </div>
          )}
          <button
            className="button button-primary submit-job"
            disabled={!file || create.isPending}
            onClick={() => file && create.mutate({ video: file })}
          >
            {create.isPending ? '正在创建任务…' : '提交到重建队列'} <ArrowRight />
          </button>
        </div>

        <aside className="requirements-card">
          <span className="sticker">INPUT RULES</span>
          <h3>上传要求</h3>
          <ul>
            <li><Check /> MP4、MOV、MKV、AVI、WEBM</li>
            <li><Check /> 文件不超过 200 MB</li>
            <li><Check /> 时长不超过 60 秒</li>
            <li><Check /> 8～1000 个视频帧</li>
            <li><Check /> 最大分辨率 3840×2160</li>
          </ul>
          <div className="warning-box"><AlertTriangle /><p><strong>这不是机器人指令。</strong>输出是相机重建轨迹，默认没有物理尺度，不能直接驱动机械臂。</p></div>
        </aside>
      </section>
    </div>
  )
}
