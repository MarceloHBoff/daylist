'use client'

import { useRouter } from 'next/navigation'

import { useEffect, useState } from 'react'

import * as Ticket from '@/components/Ticket'
import RequestError from '@/error/requestError'
import { apiGet } from '@/lib/api'
import { TicketWithTag } from '@/models/ticket'
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
  const router = useRouter()

  const initialDate =
    week > 0
      ? startOfWeek(addWeeks(new Date(), week), { weekStartsOn: 1 })
      : new Date()
  const finalDate = endOfWeek(initialDate, { weekStartsOn: 1 })

  const daysInWeek = differenceInDays(finalDate, initialDate) + 1

  const days = new Array(daysInWeek).fill(0).map((_, index) => ({
    key: getDay(addDays(initialDate, index)) + 1,
    date: startOfDay(addDays(initialDate, index))
  }))

  const [tickets, setTickets] = useState<TicketWithTag[]>([])

  useEffect(() => {
    apiGet<TicketWithTag[]>(
      `/tickets?initialDate=${initialDate.toISOString()}&finalDate=${finalDate.toISOString()}`,
      { cache: 'no-cache' }
    )
      .then(setTickets)
      .catch((e: RequestError) => {
        if (e.code === 401) {
          router.replace('/login')
        }
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {days.map(p => (
        <Ticket.TicketsWrapper
          key={p.key}
          title={formatDay(p.date)}
          defaultValues={{ date: p.date }}
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
