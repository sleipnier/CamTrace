export type JobStatus =
  | 'uploaded'
  | 'validating'
  | 'queued'
  | 'reconstructing'
  | 'packaging'
  | 'succeeded'
  | 'failed'

export interface VideoMetadata {
  originalName: string
  sizeBytes: number
  codec: string
  durationSeconds: number
  width: number
  height: number
  frameCount: number
  fps: number
}

export interface JobProgress {
  percent: number
  stageLabel: string
  queuePosition?: number
}

export interface JobSummary {
  id: string
  status: JobStatus
  createdAt: string
  completedAt?: string
  source: VideoMetadata
  progress: JobProgress
}

export interface JobDetail extends JobSummary {
  robotExecutionReady: false
  frameId?: string
  lengthUnit?: 'reconstruction_unit' | 'meter'
  outputCount?: number
  error?: { code: string; message: string }
  artifacts: Array<{
    kind: 'dataset' | 'trajectory' | 'manifest'
    name: string
    sizeBytes: number
    sha256: string
    downloadUrl: string
  }>
}

export interface CreateJobInput {
  video: File
}

export interface TrajectoryPoint {
  frameIndex: number
  timeFromStartS: number
  positionXYZ: [number, number, number]
  orientationXYZW: [number, number, number, number]
}

export interface Trajectory {
  jobId: string
  frameId: string
  childFrameId: string
  lengthUnit: 'reconstruction_unit' | 'meter'
  fps: number
  firstPoseNormalized: boolean
  robotExecutionReady: false
  points: TrajectoryPoint[]
}

export interface RenderVisualizationInput {
  trajectoryFile: File
  fps: number
  speed: number
}

export interface VisualizationJob {
  id: string
  status: 'queued' | 'rendering' | 'succeeded' | 'failed'
  progressPercent: number
  previewUrl?: string
  downloadUrl?: string
}

export interface ListJobsParams {
  status?: JobStatus
  limit?: number
  cursor?: string
}

export interface PaginatedJobs {
  items: JobSummary[]
  nextCursor?: string
}

export interface JobsApi {
  list(params?: ListJobsParams): Promise<PaginatedJobs>
  create(input: CreateJobInput): Promise<JobDetail>
  get(jobId: string): Promise<JobDetail>
  cancel(jobId: string): Promise<JobDetail>
}

export interface TrajectoryApi {
  getByJob(jobId: string): Promise<Trajectory>
  parseLocal(file: File): Promise<Trajectory>
}

export interface VisualizationsApi {
  create(input: RenderVisualizationInput): Promise<VisualizationJob>
  get(id: string): Promise<VisualizationJob>
}
