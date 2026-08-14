'use client'

type Props = {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatMessage({ role, content }: Props) {
  const isUser = role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ${
          isUser ? 'bg-blue-600 text-white' : 'bg-neutral-800 text-neutral-100'
        }`}
      >
        {content}
      </div>
    </div>
  )
}
