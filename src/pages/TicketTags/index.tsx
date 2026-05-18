'use client'

import { useMemo, useState } from 'react'

import Skeleton from '@/components/Skeleton'
import * as Ticket from '@/components/Ticket'
import { useAllTickets } from '@/hooks/tickets'

export default function TicketTags() {
  const { data: tickets = [], isLoading } = useAllTickets()
  const [onlyUndated, setOnlyUndated] = useState(false)

  const ticketsFiltered = useMemo(() => {
    if (onlyUndated) {
      return tickets.filter(p => p.data.some(i => !i.date))
    }

    return tickets
  }, [onlyUndated, tickets])

  return (
    <div className="h-ticket-tags py-4">
      <div className="mx-8 mb-4 flex justify-between border-b border-neutral-800 p-2 text-3xl font-bold text-neutral-50">
        <span>Ticket by Tags</span>

        <div className="me-4 flex items-center">
          <input
            id="green-checkbox"
            type="checkbox"
            checked={onlyUndated}
            onChange={() => setOnlyUndated(!onlyUndated)}
            className="h-8 w-8 cursor-pointer rounded border-neutral-700 bg-neutral-950 text-sky-500 focus:ring-2 focus:ring-sky-500/40"
          />
          <label
            htmlFor="green-checkbox"
            className="ms-2 cursor-pointer text-lg font-medium text-neutral-400"
          >
            Only undated
          </label>
        </div>
      </div>

      <article className="flex h-full overflow-x-auto">
        {isLoading ? (
          <div className="mx-8 flex flex-1 gap-6">
            <div className="flex-1">
              <Skeleton type="ticket" count={4} />
            </div>
            <div className="flex-1">
              <Skeleton type="ticket" count={2} />
            </div>
            <div className="flex-1">
              <Skeleton type="ticket" count={5} />
            </div>
          </div>
        ) : (
          ticketsFiltered.map(p => (
            <Ticket.TicketsWrapper
              key={p.key}
              title={p.key}
              defaultValues={{ tagId: p.data[0]?.tagId }}
            >
              {p.data
                .filter(i => (onlyUndated ? !i.date : true))
                .sort((a, b) => {
                  if (!a.date) return 1
                  if (!b.date) return -1
                  return a.date > b.date ? 1 : -1
                })
                .map(ticket => (
                  <Ticket.TicketContainer key={ticket.id} tagColor={ticket.tag?.color}>
                    <Ticket.TicketCard ticket={ticket} showDate />
                  </Ticket.TicketContainer>
                ))}
            </Ticket.TicketsWrapper>
          ))
        )}
      </article>
    </div>
  )
}
