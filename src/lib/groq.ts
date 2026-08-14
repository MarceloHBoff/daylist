import RequestError from '@/error/requestError'

const BASE = 'https://api.groq.com/openai/v1'

const CHAT_MODEL = process.env.GROQ_CHAT_MODEL ?? 'llama-3.3-70b-versatile'
const STT_MODEL = process.env.GROQ_STT_MODEL ?? 'whisper-large-v3-turbo'

function apiKey() {
  const key = process.env.GROQ_API_KEY
  if (!key) {
    throw new RequestError('GROQ_API_KEY is not configured', 500)
  }
  return key
}

export type ChatMessage = {
  role: 'system' | 'user' | 'assistant' | 'tool'
  content: string | null
  tool_calls?: ToolCall[]
  tool_call_id?: string
}

export type ToolCall = {
  id: string
  type: 'function'
  function: { name: string; arguments: string }
}

export type Tool = {
  type: 'function'
  function: {
    name: string
    description: string
    parameters: Record<string, unknown>
  }
}

export async function chatCompletion(messages: ChatMessage[], tools: Tool[]) {
  const response = await fetch(`${BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: CHAT_MODEL,
      messages,
      tools,
      tool_choice: 'auto'
    })
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new RequestError(`Groq chat error: ${detail}`, 502)
  }

  const data = await response.json()
  return data.choices[0].message as ChatMessage
}

export async function transcribe(buffer: Buffer, mimeType: string) {
  const form = new FormData()
  const ext = mimeType.includes('mp4')
    ? 'mp4'
    : mimeType.includes('mpeg')
      ? 'mp3'
      : 'webm'
  form.append('file', new Blob([buffer], { type: mimeType }), `audio.${ext}`)
  form.append('model', STT_MODEL)

  const response = await fetch(`${BASE}/audio/transcriptions`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey()}` },
    body: form
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new RequestError(`Groq transcription error: ${detail}`, 502)
  }

  const data = await response.json()
  return data.text as string
}
