import Image from 'next/image'
import Link from 'next/link'

import DropDown from '@/components/DropDown'
import * as Ticket from '@/components/Ticket'
import { apiGet, apiPost } from '@/lib/api'
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

export default async function Dashboard({ week }: DashboardProps) {
  const initialDate =
    week > 0 ? startOfWeek(addWeeks(new Date(), week)) : new Date()
  const finalDate = endOfWeek(initialDate)

  const tickets = await apiGet<TicketWithTag[]>(
    `/tickets?initialDate=${initialDate.toISOString()}&finalDate=${finalDate.toISOString()}`,
    { cache: 'no-cache' }
  )
  const outdated = await apiGet<TicketWithTag[]>(`/tickets/outdated`, {
    cache: 'no-cache'
  })
  await apiPost(`/tickets/reorder-tickets`, {
    initialDate: initialDate.toISOString(),
    finalDate: finalDate.toISOString()
  })

  const daysInWeek = differenceInDays(finalDate, initialDate) + 1

  const days = new Array(daysInWeek).fill(0).map((_, index) => ({
    key: getDay(addDays(initialDate, index)) + 1,
    date: startOfDay(addDays(initialDate, index))
  }))

  return (
    <>
      <div className="m-10 flex items-center justify-between">
        <DropDown />

        <div className="flex mr-6 -mb-16">
          {Number(week) > 0 && (
            <Link
              href={`/${Number(week) - 1}`}
              className="border-2 rounded-xl px-3 py-1 mr-4 border-zinc-500 transition-opacity hover:opacity-70"
            >
              <Image src="left.svg" alt="left" height={26} width={26} />
            </Link>
          )}
          <Link
            href={`/${Number(week) + 1}`}
            className="border-2 rounded-xl px-3 py-1 border-zinc-500 transition-opacity hover:opacity-70"
          >
            <Image src="right.svg" alt="left" height={26} width={26} />
          </Link>
        </div>
      </div>

      <div className="flex w-full">
        <div className="flex w-full p-5 border-t-2 border-gray-700 overflow-x-auto">
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
