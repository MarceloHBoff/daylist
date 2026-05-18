'use client'

import { apiGet, apiPost } from '@/lib/api'
import { TagWithTickets, TicketWithTag } from '@/models/ticket'
import { Ticket } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { TAGS_KEY } from './tags'

export const TICKETS_KEY = ['tickets']

type TicketByTag = {
  key: string
  data: TicketWithTag[]
}

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

export function useAllTickets() {
  return useQuery({
    queryKey: [...TICKETS_KEY, 'all'],
    queryFn: () => apiGet<TicketByTag[]>('/tickets/all', { cache: 'no-cache' }),
    staleTime: 0
  })
}

function useInvalidateTickets() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: TICKETS_KEY })
}

export function useMarkAsDone() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => apiPost(`/tickets/mark-as-done?id=${id}`, {}),
    onMutate: async id => {
      await queryClient.cancelQueries({ queryKey: TICKETS_KEY })
      const previousData = queryClient.getQueriesData<TicketWithTag[]>({
        queryKey: TICKETS_KEY
      })
      queryClient.setQueriesData<TicketWithTag[]>(
        { queryKey: [...TICKETS_KEY, 'weekly'] },
        old => old?.filter(ticket => ticket.id !== id) ?? old
      )
      queryClient.setQueriesData<TicketWithTag[]>(
        { queryKey: [...TICKETS_KEY, 'outdated'] },
        old => old?.filter(ticket => ticket.id !== id) ?? old
      )
      return { previousData }
    },
    onError: (_err, _id, context) => {
      context?.previousData.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data)
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TICKETS_KEY })
    }
  })
}

export function useInsertTicket() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Ticket>) => apiPost('/tickets/insert', data),
    onMutate: async newTicket => {
      await queryClient.cancelQueries({ queryKey: TICKETS_KEY })
      const previousData = queryClient.getQueriesData<TicketWithTag[]>({
        queryKey: TICKETS_KEY
      })

      if (newTicket.date) {
        const ticketDate = new Date(newTicket.date as unknown as string)
        const tags = queryClient.getQueryData<TagWithTickets[]>(TAGS_KEY)
        const tag = tags?.find(t => t.id === newTicket.tagId) ?? null

        const tempTicket: TicketWithTag = {
          id: `temp-${Date.now()}`,
          description: newTicket.description ?? '',
          date: newTicket.date as unknown as Date,
          done: false,
          tagId: newTicket.tagId ?? null,
          order: 9999,
          userId: '',
          createdAt: new Date(),
          tag
        }

        queryClient.setQueriesData<TicketWithTag[]>(
          {
            predicate: query => {
              const key = query.queryKey as string[]
              if (key[0] !== 'tickets' || key[1] !== 'weekly') return false
              const initialDate = new Date(key[2])
              const finalDate = new Date(key[3])
              return ticketDate >= initialDate && ticketDate <= finalDate
            }
          },
          old => (old ? [...old, tempTicket] : [tempTicket])
        )
      }

      return { previousData }
    },
    onError: (_err, _data, context) => {
      context?.previousData.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data)
      })
    },
    onSuccess: async (_data, variables) => {
      if (variables.date) {
        const date = new Date(variables.date as unknown as string).toISOString()
        await apiPost(`/tickets/sort-by-time?date=${date}`, {}).catch(() => {})
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TICKETS_KEY })
    }
  })
}

export function useUpdateTicket() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Ticket>) => apiPost('/tickets/update', data),
    onMutate: async updatedTicket => {
      await queryClient.cancelQueries({ queryKey: TICKETS_KEY })
      const previousData = queryClient.getQueriesData<TicketWithTag[]>({
        queryKey: TICKETS_KEY
      })

      const tags = queryClient.getQueryData<TagWithTickets[]>(TAGS_KEY)
      const tag = updatedTicket.tagId
        ? (tags?.find(t => t.id === updatedTicket.tagId) ?? undefined)
        : null

      queryClient.setQueriesData<TicketWithTag[]>(
        { queryKey: [...TICKETS_KEY, 'weekly'] },
        old =>
          old?.map(ticket =>
            ticket.id === updatedTicket.id
              ? {
                  ...ticket,
                  ...updatedTicket,
                  tag: tag !== undefined ? tag : ticket.tag
                }
              : ticket
          ) ?? old
      )
      queryClient.setQueriesData<TicketWithTag[]>(
        { queryKey: [...TICKETS_KEY, 'outdated'] },
        old =>
          old?.map(ticket =>
            ticket.id === updatedTicket.id
              ? {
                  ...ticket,
                  ...updatedTicket,
                  tag: tag !== undefined ? tag : ticket.tag
                }
              : ticket
          ) ?? old
      )

      return { previousData }
    },
    onError: (_err, _data, context) => {
      context?.previousData.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data)
      })
    },
    onSuccess: async (_data, variables) => {
      if (variables.date) {
        const date = new Date(variables.date as unknown as string).toISOString()
        await apiPost(`/tickets/sort-by-time?date=${date}`, {}).catch(() => {})
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TICKETS_KEY })
    }
  })
}

export function useDeleteTicket() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => apiPost(`/tickets/delete?id=${id}`, {}),
    onMutate: async id => {
      await queryClient.cancelQueries({ queryKey: TICKETS_KEY })
      const previousData = queryClient.getQueriesData<TicketWithTag[]>({
        queryKey: TICKETS_KEY
      })
      queryClient.setQueriesData<TicketWithTag[]>(
        { queryKey: [...TICKETS_KEY, 'weekly'] },
        old => old?.filter(ticket => ticket.id !== id) ?? old
      )
      queryClient.setQueriesData<TicketWithTag[]>(
        { queryKey: [...TICKETS_KEY, 'outdated'] },
        old => old?.filter(ticket => ticket.id !== id) ?? old
      )
      return { previousData }
    },
    onError: (_err, _id, context) => {
      context?.previousData.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data)
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TICKETS_KEY })
    }
  })
}

export function useDuplicateTicket() {
  const invalidate = useInvalidateTickets()
  return useMutation({
    mutationFn: (id: string) => apiPost(`/tickets/duplicate?id=${id}`, {}),
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
