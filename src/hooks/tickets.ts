'use client'

import { apiGet, apiPost } from '@/lib/api'
import { TicketWithTag } from '@/models/ticket'
import { Ticket } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const TICKETS_KEY = ['tickets']

export function useTickets(initialDate: Date, finalDate: Date) {
  return useQuery({
    queryKey: [
      ...TICKETS_KEY,
      'weekly',
      initialDate.toISOString(),
      finalDate.toISOString()
    ],
    queryFn: () =>
      apiGet<TicketWithTag[]>(
        `/tickets?initialDate=${initialDate.toISOString()}&finalDate=${finalDate.toISOString()}`,
        { cache: 'no-cache' }
      ),
    staleTime: 0
  })
}

export function useOutdatedTickets() {
  return useQuery({
    queryKey: [...TICKETS_KEY, 'outdated'],
    queryFn: () =>
      apiGet<TicketWithTag[]>('/tickets/outdated', { cache: 'no-cache' }),
    staleTime: 0
  })
}

function useInvalidateTickets() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: TICKETS_KEY })
}

export function useMarkAsDone() {
  const invalidate = useInvalidateTickets()
  return useMutation({
    mutationFn: (id: string) => apiPost(`/tickets/mark-as-done?id=${id}`, {}),
    onSuccess: invalidate
  })
}

export function useInsertTicket() {
  const invalidate = useInvalidateTickets()
  return useMutation({
    mutationFn: (data: Partial<Ticket>) => apiPost('/tickets/insert', data),
    onSuccess: invalidate
  })
}

export function useUpdateTicket() {
  const invalidate = useInvalidateTickets()
  return useMutation({
    mutationFn: (data: Partial<Ticket>) => apiPost('/tickets/update', data),
    onSuccess: invalidate
  })
}

export function useDeleteTicket() {
  const invalidate = useInvalidateTickets()
  return useMutation({
    mutationFn: (id: string) => apiPost(`/tickets/delete?id=${id}`, {}),
    onSuccess: invalidate
  })
}

export function useDuplicateTicket() {
  const invalidate = useInvalidateTickets()
  return useMutation({
    mutationFn: (id: string) => apiPost(`/tickets/duplicate?id=${id}`, {}),
    onSuccess: invalidate
  })
}

export function useReorderTickets() {
  const invalidate = useInvalidateTickets()
  return useMutation({
    mutationFn: ({
      id,
      startIndex,
      endIndex
    }: {
      id: string
      startIndex: number
      endIndex: number
    }) =>
      apiPost(
        `/tickets/reorder?id=${id}&startIndex=${startIndex}&endIndex=${endIndex}`,
        {}
      ),
    onSuccess: invalidate
  })
}

export function useSortByTime() {
  const invalidate = useInvalidateTickets()
  return useMutation({
    mutationFn: (date: Date) =>
      apiPost(`/tickets/sort-by-time?date=${date.toISOString()}`, {}),
    onSuccess: invalidate
  })
}
