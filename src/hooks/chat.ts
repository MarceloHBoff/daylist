'use client'

import { apiGet, apiPost } from '@/lib/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { TAGS_KEY } from './tags'
import { TICKETS_KEY } from './tickets'

export const CHAT_KEY = ['chat']

export type ChatConversation = {
  id: string
  title: string | null
  updatedAt: string
}

export type ChatMessageView = {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: string
}

export type SendResponse = {
  conversationId: string
  reply: string
}

export function useConversations() {
  return useQuery({
    queryKey: [...CHAT_KEY, 'conversations'],
    queryFn: () =>
      apiGet<ChatConversation[]>('/chat/conversations', { cache: 'no-cache' })
  })
}

export function useMessages(conversationId: string | null) {
  return useQuery({
    queryKey: [...CHAT_KEY, 'messages', conversationId],
    enabled: !!conversationId,
    queryFn: () =>
      apiGet<ChatMessageView[]>(
        `/chat/messages?conversationId=${conversationId}`,
        { cache: 'no-cache' }
      ),
    staleTime: 0
  })
}

export function useSendMessage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: {
      conversationId: string | null
      message: string
    }) => {
      const response = await apiPost('/chat/send', data)
      if (!response.ok) {
        throw new Error('Failed to send message')
      }
      return (await response.json()) as SendResponse
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TICKETS_KEY })
      queryClient.invalidateQueries({ queryKey: TAGS_KEY })
      queryClient.invalidateQueries({ queryKey: CHAT_KEY })
    }
  })
}

export function useTranscribe() {
  return useMutation({
    mutationFn: async (data: { audio: string; mimeType: string }) => {
      const response = await apiPost('/chat/transcribe', data)
      if (!response.ok) {
        throw new Error('Failed to transcribe audio')
      }
      return (await response.json()) as { text: string }
    }
  })
}
