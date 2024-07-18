import TicketList from '@/components/TicketList'
import { apiGet } from '@/lib/api'
import { TicketWithTag } from '@/models/ticket'
import { groupBy } from '@/utils/array'

export default async function TicketTags() {
  const data = await apiGet<TicketWithTag[]>(`/tickets/all`, {
    cache: 'no-cache'
  })

  const tickets = groupBy(data, p => p.tag?.description ?? '').sort((a, b) =>
    a.data.length > b.data.length ? 1 : -1
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
