'use client'

import { useRouter } from 'next/navigation'

import { useEffect, useState } from 'react'

import * as Ticket from '@/components/Ticket'
import RequestError from '@/error/requestError'
import { useLoading } from '@/hooks/loading'
import { apiGet } from '@/lib/api'
import { TicketWithTag } from '@/models/ticket'

type TicketTagsType = {
  key: string
  data: TicketWithTag[]
}

export default function TicketTags() {
  const router = useRouter()
  const { loader } = useLoading()

  const [tickets, setTickets] = useState<TicketTagsType[]>([])

  useEffect(() => {
    loader(async () => {
      try {
        setTickets(
          await apiGet<TicketTagsType[]>(`/tickets/all`, {
            cache: 'no-cache'
          })
        )
      } catch (e) {
        const { code } = e as RequestError
        if (code === 401) {
          router.replace('/login')
        }
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
