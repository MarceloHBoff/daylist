'use client'

import { useCallback, useMemo } from 'react'

import * as Ticket from '@/components/Ticket'
import { useSortByTime, useTickets } from '@/hooks/tickets'
import { formatDay } from '@/utils/date'
import {
  addDays,
  addWeeks,
  differenceInDays,
  endOfWeek,
  getDay,
  isSameDay,
  startOfDay,
  startOfWeek
} from 'date-fns'

type DashboardTicketsProps = {
  week: number
}

export default function DashboardTickets({ week }: DashboardTicketsProps) {
  const initialDate = useMemo(
    () =>
      week > 0
        ? startOfWeek(addWeeks(new Date(), week), { weekStartsOn: 1 })
        : new Date(),
    [week]
  )
  const finalDate = useMemo(
    () => endOfWeek(initialDate, { weekStartsOn: 1 }),
    [initialDate]
  )

  const days = useMemo(() => {
    const count = differenceInDays(finalDate, initialDate) + 1
    return new Array(count).fill(0).map((_, index) => ({
      key: getDay(addDays(initialDate, index)) + 1,
      date: startOfDay(addDays(initialDate, index))
    }))
  }, [initialDate, finalDate])

  const { data: tickets = [] } = useTickets(initialDate, finalDate)
  const sortByTime = useSortByTime()

  const onReorder = useCallback(
    async (date: Date) => {
      sortByTime.mutate(date)
    },
    [sortByTime]
  )

  return (
    <>
      {days.map(p => (
        <Ticket.TicketsWrapper
          key={p.key}
          title={formatDay(p.date)}
          defaultValues={{ date: p.date }}
          onReorder={() => onReorder(p.date)}
        >
          <Ticket.TicketDraggable
            tickets={tickets.filter(t =>
              isSameDay(new Date(t.date ?? ''), p.date)
            )}
          />
        </Ticket.TicketsWrapper>
      ))}
    </>
  )
}
