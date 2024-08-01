import RequestError from '@/error/requestError'

function api(path: string, init?: RequestInit) {
  const url = '/api' + path

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
