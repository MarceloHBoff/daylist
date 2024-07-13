import { api } from '@/lib/axios'
import { TicketWithTag } from '@/models/ticket'
import { groupBy } from '@/utils/array'

import TicketList from '../Home/TicketList'

export default async function TicketTags() {
  const response = await api.get<TicketWithTag[]>(`/tickets/all`)
  const tickets = groupBy(response.data, p => p.tag?.description ?? '').sort(
    (a, b) => (a.data.length > b.data.length ? 1 : -1)
  )

  return (
    <div className="py-4 h-ticket-tags">
      <div className="text-white font-bold text-3xl mx-8 p-2 mb-4 border-b-2 border-b-slate-500">
        Ticket by Tags
      </div>

      <article className="flex h-full overflow-x-auto">
        {tickets.map(p => (
          <TicketList
            key={p.key}
            title={p.key}
            tickets={p.data}
            showDate
            defaultValues={{ tagId: p.data[0].tagId }}
          />
        ))}
      </article>
    </div>
  )
}
