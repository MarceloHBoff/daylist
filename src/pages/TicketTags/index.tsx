import * as Ticket from '@/components/Ticket'
import { apiGet } from '@/lib/api'
import { TicketWithTag } from '@/models/ticket'

type TicketTagsType = {
  key: string
  data: TicketWithTag[]
}

export default async function TicketTags() {
  const tickets = await apiGet<TicketTagsType[]>(`/tickets/all`, {
    cache: 'no-cache'
  })

  return (
    <div className="py-4 h-ticket-tags">
      <div className="text-white font-bold text-3xl mx-8 p-2 mb-4 border-b-2 border-b-slate-500">
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
