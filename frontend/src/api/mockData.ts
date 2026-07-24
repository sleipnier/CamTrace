import type { JobDetail, Trajectory } from './types'

const now = Date.now()

export const mockJobs: JobDetail[] = [
  {
    id: 'vtc_8f2a91c4',
    status: 'succeeded',
    createdAt: new Date(now - 42 * 60_000).toISOString(),
    completedAt: new Date(now - 35 * 60_000).toISOString(),
    source: {
      originalName: 'studio_orbit_01.mp4', sizeBytes: 28_404_112, codec: 'h264',
      durationSeconds: 12.4, width: 1920, height: 1080, frameCount: 372, fps: 30,
    },
    progress: { percent: 100, stageLabel: '数据集已就绪' },
    robotExecutionReady: false,
    frameId: 'reconstruction_camera0',
    lengthUnit: 'reconstruction_unit',
    outputCount: 372,
    artifacts: [
      { kind: 'dataset', name: 'camera_dataset_vtc_8f2a91c4.zip', sizeBytes: 384_222, sha256: '9d7f6e503be4334da8199a249c540bc419bc17262e09c8e4cb84c9fc17de9c66', downloadUrl: '#' },
      { kind: 'trajectory', name: 'camera_cartesian_trajectory.json', sizeBytes: 141_082, sha256: '2c17c5486da24c3ce0d56e046f1a1d8ac985f070c880d44f9d1484f88a6721fd', downloadUrl: '#' },
    ],
  },
  {
    id: 'vtc_4d817e20',
    status: 'reconstructing',
    createdAt: new Date(now - 9 * 60_000).toISOString(),
    source: {
      originalName: 'handheld_walk.mov', sizeBytes: 62_944_901, codec: 'hevc',
      durationSeconds: 18.2, width: 1920, height: 1080, frameCount: 546, fps: 30,
    },
    progress: { percent: 68, stageLabel: '正在重建相机轨迹' },
    robotExecutionReady: false,
    artifacts: [],
  },
  {
    id: 'vtc_77c1b4d9',
    status: 'queued',
    createdAt: new Date(now - 3 * 60_000).toISOString(),
    source: {
      originalName: 'product_pan.mp4', sizeBytes: 18_380_221, codec: 'h264',
      durationSeconds: 8.6, width: 1280, height: 720, frameCount: 258, fps: 30,
    },
    progress: { percent: 12, stageLabel: '等待 GPU', queuePosition: 2 },
    robotExecutionReady: false,
    artifacts: [],
  },
]

export function makeTrajectory(jobId = 'vtc_8f2a91c4'): Trajectory {
  const pointCount = 180
  return {
    jobId,
    frameId: 'reconstruction_camera0',
    childFrameId: 'camera',
    lengthUnit: 'reconstruction_unit',
    fps: 30,
    firstPoseNormalized: true,
    robotExecutionReady: false,
    points: Array.from({ length: pointCount }, (_, index) => {
      const t = index / (pointCount - 1)
      const angle = t * Math.PI * 2.6
      return {
        frameIndex: index,
        timeFromStartS: index / 30,
        positionXYZ: [
          Math.sin(angle) * (1.2 + t) + t * 1.8,
          Math.cos(angle * 0.65) * 0.48 + t * 0.8,
          Math.cos(angle) * (0.8 + t * 0.5),
        ],
        orientationXYZW: [0, Math.sin(angle / 8), 0, Math.cos(angle / 8)],
      }
    }),
  }
}
