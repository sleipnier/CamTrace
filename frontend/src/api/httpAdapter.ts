import { request } from './http'
import type {
  CreateJobInput,
  JobDetail,
  JobsApi,
  ListJobsParams,
  PaginatedJobs,
  RenderVisualizationInput,
  Trajectory,
  TrajectoryApi,
  VisualizationJob,
  VisualizationsApi,
} from './types'

export const httpJobsApi: JobsApi = {
  list: (params: ListJobsParams = {}) => {
    const query = new URLSearchParams()
    if (params.status) query.set('status', params.status)
    if (params.limit) query.set('limit', String(params.limit))
    if (params.cursor) query.set('cursor', params.cursor)
    return request<PaginatedJobs>(`/jobs?${query}`)
  },
  create: ({ video }: CreateJobInput) => {
    const body = new FormData()
    body.append('video', video)
    return request<JobDetail>('/jobs', { method: 'POST', body })
  },
  get: (jobId) => request<JobDetail>(`/jobs/${jobId}`),
  cancel: (jobId) => request<JobDetail>(`/jobs/${jobId}/cancel`, { method: 'POST' }),
}

export const httpTrajectoryApi: TrajectoryApi = {
  getByJob: (jobId) => request<Trajectory>(`/jobs/${jobId}/trajectory`),
  parseLocal: async (file) => {
    const body = new FormData()
    body.append('trajectory', file)
    return request<Trajectory>('/trajectories/parse', { method: 'POST', body })
  },
}

export const httpVisualizationsApi: VisualizationsApi = {
  create: ({ trajectoryFile, fps, speed }: RenderVisualizationInput) => {
    const body = new FormData()
    body.append('trajectory', trajectoryFile)
    body.append('fps', String(fps))
    body.append('speed', String(speed))
    return request<VisualizationJob>('/visualizations', { method: 'POST', body })
  },
  get: (id) => request<VisualizationJob>(`/visualizations/${id}`),
}
