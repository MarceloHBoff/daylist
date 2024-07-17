function api(path: string, init?: RequestInit) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const apiPrefix = '/api'
  const url = new URL(apiPrefix.concat(path), baseUrl)

  return fetch(url, init)
}

export async function apiGet<T>(path: string, init?: RequestInit) {
  const response = await api(path, init)

  return (await response.json()) as T
}

export async function apiPost(path: string, data: any) {
  return await api(path, {
    method: 'post',
    body: JSON.stringify(data)
  })
}
