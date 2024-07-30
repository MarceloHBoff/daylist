import RequestError from '@/error/requestError'

function api(path: string, init?: RequestInit) {
  const baseUrl =
    typeof window === 'undefined'
      ? process.env.NEXT_PUBLIC_API_BASE_URL
      : process.env.NEXT_PUBLIC_CLIENT_API_URL
  const apiPrefix = '/api'
  const url = new URL(apiPrefix.concat(path), baseUrl)

  return fetch(url, init)
}

export async function apiGet<T>(path: string, init?: RequestInit) {
  const response = await api(path, init)

  if (response.status === 401) {
    throw new RequestError('Unauthorized', 401)
  }

  return (await response.json()) as T
}

export async function apiPost(path: string, data: any) {
  return await api(path, {
    method: 'post',
    body: JSON.stringify(data)
  })
}
