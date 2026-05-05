'use client'

import * as Ticket from '@/components/Ticket'
import { useOutdatedTickets } from '@/hooks/tickets'

export default function DashboardOutdated() {
  const { data: outdated = [] } = useOutdatedTickets()

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
