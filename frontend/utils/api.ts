const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API}${endpoint}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers }
  })
  if (!res.ok) throw new Error('API Error')
  return res.json()
}