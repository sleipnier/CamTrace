export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

export function apiUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path
  if (path.startsWith('/api/') && API_BASE_URL.endsWith('/api')) {
    return `${API_BASE_URL}${path.slice(4)}`
  }
  return `${API_BASE_URL}${path}`
}

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code = 'UNKNOWN_ERROR',
  ) {
    super(message)
  }
}

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(apiUrl(path), {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(!(init?.body instanceof FormData) ? { 'Content-Type': 'application/json' } : {}),
      ...init?.headers,
    },
  })
  if (!response.ok) {
    const payload = await response.json().catch(() => null)
    throw new ApiError(
      payload?.message ?? '请求失败，请稍后重试',
      response.status,
      payload?.code,
    )
  }
  return response.json() as Promise<T>
}
