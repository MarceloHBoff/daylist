'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useEffect, useState } from 'react'

import DropDown from '@/components/DropDown'
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

type DashboardProps = {
  week: number
}

export default function Dashboard({ week }: DashboardProps) {
  const router = useRouter()
  const initialDate =
    week > 0 ? startOfWeek(addWeeks(new Date(), week)) : new Date()
  const finalDate = endOfWeek(initialDate)

  const [tickets, setTickets] = useState<TicketWithTag[]>([])
  const [outdated, setOutdated] = useState<TicketWithTag[]>([])

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

    apiGet<TicketWithTag[]>(`/tickets/outdated`, {
      cache: 'no-cache'
    }).then(setOutdated)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const daysInWeek = differenceInDays(finalDate, initialDate) + 1

  const days = new Array(daysInWeek).fill(0).map((_, index) => ({
    key: getDay(addDays(initialDate, index)) + 1,
    date: startOfDay(addDays(initialDate, index))
  }))

  return (
    <>
      <div className="m-10 flex items-center justify-between">
        <DropDown />

        <div className="-mb-16 mr-6 flex">
          {Number(week) > 0 && (
            <Link
              href={`/${Number(week) - 1}`}
              className="mr-4 rounded-xl border-2 border-zinc-500 px-3 py-1 transition-opacity hover:opacity-70"
            >
              <Image src="left.svg" alt="left" height={26} width={26} />
            </Link>
          )}
          <Link
            href={`/${Number(week) + 1}`}
            className="rounded-xl border-2 border-zinc-500 px-3 py-1 transition-opacity hover:opacity-70"
          >
            <Image src="right.svg" alt="left" height={26} width={26} />
          </Link>
        </div>
      </div>

      <div className="flex w-full">
        <div className="flex w-full overflow-x-auto border-t-2 border-gray-700 p-5">
          {outdated.length > 0 && (
            <Ticket.TicketsWrapper title="Outdated" outdated>
              {outdated.map(ticket => (
                <Ticket.TicketContainer
                  key={ticket.id}
                  className="border-red-600"
                >
                  <Ticket.TicketCard ticket={ticket} showDate />
                </Ticket.TicketContainer>
              ))}
            </Ticket.TicketsWrapper>
          )}

          {days.map(p => (
            <Ticket.TicketsWrapper key={p.key} title={formatDay(p.date)}>
              <Ticket.TicketDraggable
                tickets={tickets.filter(t =>
                  isSameDay(new Date(t.date ?? ''), p.date)
                )}
              />
            </Ticket.TicketsWrapper>
          ))}
        </div>
      </div>
    </>
  )
}
