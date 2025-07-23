'use client'

import { useRouter } from 'next/navigation'

import { useEffect, useMemo, useState } from 'react'

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
  const [onlyUndated, setOnlyUndated] = useState(false)

  useEffect(() => {
    loader(async () => {
      try {
        setTickets(
          await apiGet<TicketTagsType[]>(`/tickets/all`, { cache: 'no-cache' })
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

  const ticketsFiltered = useMemo(() => {
    if (onlyUndated) {
      return tickets.filter(p => p.data.some(i => !i.date))
    }

    return tickets
  }, [onlyUndated, tickets])

  return (
    <div className="h-ticket-tags py-4">
      <div className="mx-8 mb-4 flex justify-between border-b-2 border-b-slate-500 p-2 text-3xl font-bold text-white">
        <span>Ticket by Tags</span>

        <div className="me-4 flex items-center">
          <input
            id="green-checkbox"
            type="checkbox"
            checked={onlyUndated}
            onChange={() => setOnlyUndated(!onlyUndated)}
            className="h-8 w-8 cursor-pointer border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
          <label
            htmlFor="green-checkbox"
            className="ms-2 cursor-pointer text-lg font-medium text-gray-900 dark:text-gray-300"
          >
            Only undated
          </label>
        </div>
      </div>

      <article className="flex h-full overflow-x-auto">
        {ticketsFiltered.map(p => (
          <Ticket.TicketsWrapper
            key={p.key}
            title={p.key}
            defaultValues={{ tagId: p.data[0].tagId }}
          >
            {p.data
              .filter(p => (onlyUndated ? !p.date : true))
              .sort((a, b) => {
                if (!a.date) return 1
                if (!b.date) return -1
                return a.date > b.date ? 1 : -1
              })
              .map(ticket => (
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
