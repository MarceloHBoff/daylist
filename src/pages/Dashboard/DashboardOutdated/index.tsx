'use client'

import { useEffect, useState } from 'react'

import * as Ticket from '@/components/Ticket'
import { apiGet } from '@/lib/api'
import { TicketWithTag } from '@/models/ticket'

export default function DashboardOutdated() {
  const [outdated, setOutdated] = useState<TicketWithTag[]>([])

  useEffect(() => {
    apiGet<TicketWithTag[]>(`/tickets/outdated`, {
      cache: 'no-cache'
    }).then(setOutdated)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
