'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'

import {
  ChatMessageView,
  useConversations,
  useMessages,
  useSendMessage,
  useTranscribe
} from '@/hooks/chat'

import ChatMessage from '../ChatMessage'
import { useRecorder } from '../useRecorder'

type Props = {
  conversationId: string | null
  setConversationId: (id: string | null) => void
  onClose: () => void
}

type LocalMessage = Pick<ChatMessageView, 'id' | 'role' | 'content'>

export default function ChatPanel({
  conversationId,
  setConversationId,
  onClose
}: Props) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<LocalMessage[]>([])
  const [showHistory, setShowHistory] = useState(false)

  const { data: serverMessages } = useMessages(conversationId)
  const { data: conversations } = useConversations()
  const sendMessage = useSendMessage()
  const transcribe = useTranscribe()
  const recorder = useRecorder()

  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (serverMessages) setMessages(serverMessages)
  }, [serverMessages])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight })
  }, [messages, sendMessage.isPending])

  const busy = sendMessage.isPending || transcribe.isPending

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text || sendMessage.isPending) return

    setInput('')
    setMessages(prev => [
      ...prev,
      { id: `temp-${prev.length}`, role: 'user', content: text }
    ])

    const result = await sendMessage.mutateAsync({
      conversationId,
      message: text
    })
    setConversationId(result.conversationId)
    setMessages(prev => [
      ...prev,
      {
        id: `temp-reply-${prev.length}`,
        role: 'assistant',
        content: result.reply
      }
    ])
  }

  async function handleMic() {
    if (recorder.isRecording) {
      const rec = await recorder.stop()
      if (!rec) return
      const { text } = await transcribe.mutateAsync(rec)
      setInput(prev => (prev ? `${prev} ${text}` : text))
    } else {
      await recorder.start().catch(() => {})
    }
  }

  function startNewChat() {
    setConversationId(null)
    setMessages([])
    setShowHistory(false)
  }

  function openConversation(id: string) {
    setConversationId(id)
    setShowHistory(false)
  }

  return (
    <div className="flex h-[32rem] max-h-[80vh] w-[22rem] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl">
      <header className="flex items-center justify-between border-b border-neutral-800 px-4 py-3">
        <span className="text-sm font-semibold text-white">Assistant</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowHistory(s => !s)}
            className="rounded-md px-2 py-1 text-xs text-neutral-300 hover:bg-neutral-800"
            title="History"
          >
            History
          </button>
          <button
            onClick={startNewChat}
            className="rounded-md px-2 py-1 text-xs text-neutral-300 hover:bg-neutral-800"
            title="New conversation"
          >
            New
          </button>
          <button
            onClick={onClose}
            className="rounded-md px-2 py-1 text-neutral-400 hover:bg-neutral-800"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      </header>

      {showHistory ? (
        <div className="flex-1 overflow-y-auto p-2">
          {conversations?.length ? (
            conversations.map(c => (
              <button
                key={c.id}
                onClick={() => openConversation(c.id)}
                className={`block w-full truncate rounded-md px-3 py-2 text-left text-sm text-neutral-200 hover:bg-neutral-800 ${
                  c.id === conversationId ? 'bg-neutral-800' : ''
                }`}
              >
                {c.title || 'Conversation'}
              </button>
            ))
          ) : (
            <p className="p-4 text-center text-sm text-neutral-500">
              No conversations yet.
            </p>
          )}
        </div>
      ) : (
        <div ref={listRef} className="flex-1 space-y-2 overflow-y-auto p-3">
          {messages.length === 0 && !sendMessage.isPending && (
            <p className="mt-8 px-4 text-center text-sm text-neutral-500">
              Ask me to create or complete tasks. E.g.: &quot;add a task
              tomorrow: meeting with the tag Work&quot;.
            </p>
          )}
          {messages.map(m => (
            <ChatMessage key={m.id} role={m.role} content={m.content} />
          ))}
          {sendMessage.isPending && (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-neutral-800 px-3 py-2 text-sm text-neutral-400">
                typing…
              </div>
            </div>
          )}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-neutral-800 p-2"
      >
        <button
          type="button"
          onClick={handleMic}
          disabled={transcribe.isPending}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-700 text-sm disabled:opacity-50 ${
            recorder.isRecording
              ? 'animate-pulse bg-red-600 text-white'
              : 'bg-neutral-900 text-neutral-200 hover:bg-neutral-800'
          }`}
          title={recorder.isRecording ? 'Stop recording' : 'Record audio'}
        >
          {transcribe.isPending ? '…' : '🎤'}
        </button>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message…"
          disabled={busy}
          className="h-9 flex-1 rounded-full border border-neutral-700 bg-neutral-900 px-3 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-blue-500 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50"
          aria-label="Send"
        >
          ➤
        </button>
      </form>
    </div>
  )
}
