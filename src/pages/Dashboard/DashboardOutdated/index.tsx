'use client'

import { useMemo } from 'react'

import * as Ticket from '@/components/Ticket'
import { useOutdatedTickets } from '@/hooks/tickets'
import { startOfDay } from 'date-fns'

export default function DashboardOutdated() {
  const initialDate = useMemo(() => startOfDay(new Date()), [])
  const { data: outdated = [] } = useOutdatedTickets(initialDate)

  return (
    <>
      {outdated.length > 0 && (
        <Ticket.TicketsWrapper title="Outdated" outdated>
          {outdated.map(ticket => (
            <Ticket.TicketContainer key={ticket.id} className="border-red-600">
              <Ticket.TicketCard ticket={ticket} showDate />
            </Ticket.TicketContainer>
          ))}
        </Ticket.TicketsWrapper>
      )}
    </>
  )
}
