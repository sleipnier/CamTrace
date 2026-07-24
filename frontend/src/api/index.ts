import { httpJobsApi, httpTrajectoryApi, httpVisualizationsApi } from './httpAdapter'
import { mockJobsApi, mockTrajectoryApi, mockVisualizationsApi } from './mockAdapter'

const useMock = (import.meta.env.VITE_API_MODE ?? 'mock') === 'mock'

export const jobsApi = useMock ? mockJobsApi : httpJobsApi
export const trajectoryApi = useMock ? mockTrajectoryApi : httpTrajectoryApi
export const visualizationsApi = useMock ? mockVisualizationsApi : httpVisualizationsApi

export * from './types'
