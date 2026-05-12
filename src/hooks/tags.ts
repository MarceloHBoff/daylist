'use client'

import { apiGet, apiPost } from '@/lib/api'
import { TagWithTickets } from '@/models/ticket'
import { Tag } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const TAGS_KEY = ['tags']

export function useTags() {
  return useQuery({
    queryKey: TAGS_KEY,
    queryFn: () => apiGet<TagWithTickets[]>('/tags', { cache: 'no-cache' })
  })
}

function useInvalidateTags() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: TAGS_KEY })
}

export function useInsertTag() {
  const invalidate = useInvalidateTags()
  return useMutation({
    mutationFn: (data: Partial<Tag>) => apiPost('/tags/insert', data),
    onSuccess: invalidate
  })
}

export function useUpdateTag() {
  const invalidate = useInvalidateTags()
  return useMutation({
    mutationFn: (data: Partial<Tag>) => apiPost('/tags/update', data),
    onSuccess: invalidate
  })
}

export function useDeleteTag() {
  const invalidate = useInvalidateTags()
  return useMutation({
    mutationFn: (id: string) => apiPost(`/tags/delete?id=${id}`, {}),
    onSuccess: invalidate
  })
}
