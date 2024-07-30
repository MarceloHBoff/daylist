'use client'

import { useRouter } from 'next/navigation'

import { useEffect, useState } from 'react'

import * as Ticket from '@/components/Ticket'
import RequestError from '@/error/requestError'
import { apiGet } from '@/lib/api'
import { TicketWithTag } from '@/models/ticket'

type TicketTagsType = {
  key: string
  data: TicketWithTag[]
}

export default function TicketTags() {
  const router = useRouter()
  const [tickets, setTickets] = useState<TicketTagsType[]>([])

  useEffect(() => {
    apiGet<TicketTagsType[]>(`/tickets/all`, {
      cache: 'no-cache'
    })
      .then(setTickets)
      .catch((e: RequestError) => {
        if (e.code === 401) {
          router.replace('/login')
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="h-ticket-tags py-4">
      <div className="mx-8 mb-4 border-b-2 border-b-slate-500 p-2 text-3xl font-bold text-white">
        Ticket by Tags
      </div>

      <article className="flex h-full overflow-x-auto">
        {tickets.map(p => (
          <Ticket.TicketsWrapper
            key={p.key}
            title={p.key}
            defaultValues={{ tagId: p.data[0].tagId }}
          >
            {p.data.map(ticket => (
              <Ticket.TicketContainer key={ticket.id}>
                <Ticket.TicketCard ticket={ticket} showDate />
              </Ticket.TicketContainer>
            ))}
          </Ticket.TicketsWrapper>
        ))}
      </article>
    </div>
  )
}
