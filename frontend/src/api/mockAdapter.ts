import { mockJobs, makeTrajectory } from './mockData'
import type {
  JobDetail,
  JobsApi,
  TrajectoryApi,
  VisualizationJob,
  VisualizationsApi,
} from './types'

const jobs = new Map(mockJobs.map((job) => [job.id, structuredClone(job)]))
const wait = (ms = 450) => new Promise((resolve) => setTimeout(resolve, ms))

function advance(job: JobDetail): JobDetail {
  if (!['queued', 'reconstructing', 'packaging'].includes(job.status)) return job
  job.progress.percent = Math.min(100, job.progress.percent + 8)
  if (job.progress.percent >= 92) {
    job.status = 'packaging'
    job.progress.stageLabel = '正在校验并打包'
  }
  if (job.progress.percent >= 100) {
    job.status = 'succeeded'
    job.completedAt = new Date().toISOString()
    job.progress.stageLabel = '数据集已就绪'
    job.outputCount = job.source.frameCount
    job.frameId = 'reconstruction_camera0'
    job.lengthUnit = 'reconstruction_unit'
  }
  return job
}

export const mockJobsApi: JobsApi = {
  async list(params = {}) {
    await wait()
    let items = [...jobs.values()]
    if (params.status) items = items.filter((item) => item.status === params.status)
    return { items: items.slice(0, params.limit ?? 20) }
  },
  async create({ video }) {
    await wait(700)
    const id = `vtc_${crypto.randomUUID().replaceAll('-', '').slice(0, 8)}`
    const job: JobDetail = {
      id,
      status: 'queued',
      createdAt: new Date().toISOString(),
      source: {
        originalName: video.name,
        sizeBytes: video.size,
        codec: 'pending',
        durationSeconds: 0,
        width: 0,
        height: 0,
        frameCount: 0,
        fps: 0,
      },
      progress: { percent: 8, stageLabel: '文件已接收，等待 GPU', queuePosition: 1 },
      robotExecutionReady: false,
      artifacts: [],
    }
    jobs.set(id, job)
    return structuredClone(job)
  },
  async get(jobId) {
    await wait(300)
    const job = jobs.get(jobId)
    if (!job) throw new Error('任务不存在')
    return structuredClone(advance(job))
  },
  async cancel(jobId) {
    await wait()
    const job = jobs.get(jobId)
    if (!job) throw new Error('任务不存在')
    job.status = 'failed'
    job.error = { code: 'CANCELLED', message: '任务已由用户取消' }
    job.progress.stageLabel = '已取消'
    return structuredClone(job)
  },
}

export const mockTrajectoryApi: TrajectoryApi = {
  async getByJob(jobId) {
    await wait(650)
    return makeTrajectory(jobId)
  },
  async parseLocal(file) {
    await wait(750)
    return makeTrajectory(`local:${file.name}`)
  },
}

const renders = new Map<string, VisualizationJob>()
export const mockVisualizationsApi: VisualizationsApi = {
  async create() {
    await wait(600)
    const result: VisualizationJob = {
      id: `viz_${crypto.randomUUID().slice(0, 8)}`,
      status: 'rendering',
      progressPercent: 34,
    }
    renders.set(result.id, result)
    return { ...result }
  },
  async get(id) {
    await wait(300)
    const result = renders.get(id)
    if (!result) throw new Error('渲染任务不存在')
    result.progressPercent = Math.min(100, result.progressPercent + 28)
    if (result.progressPercent >= 100) {
      result.status = 'succeeded'
      result.previewUrl = '#mock-preview'
      result.downloadUrl = '#mock-download'
    }
    return { ...result }
  },
}
