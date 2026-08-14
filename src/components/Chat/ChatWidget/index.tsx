'use client'

import { useState } from 'react'

import ChatPanel from '../ChatPanel'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <ChatPanel
          conversationId={conversationId}
          setConversationId={setConversationId}
          onClose={() => setIsOpen(false)}
        />
      )}

      <button
        onClick={() => setIsOpen(o => !o)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-2xl text-white shadow-lg transition-colors hover:bg-blue-500"
        aria-label="Open assistant"
      >
        {isOpen ? '✕' : '💬'}
      </button>
    </div>
  )
}
