import Card from '../Card'
import { TicketWithTag } from '@/models/ticket'

type CardListProps = {
  title: string
  tickets: TicketWithTag[]
}

export default function CardList({ title, tickets }: CardListProps) {
  return (
    <section className="mx-2 p-2 w-full min-w-72 overflow-y-hidden hover:overflow-y-auto overflow-x-hidden">
      <strong className="ml-3 text-white">
        {title}
        <span className="text-xs ml-2 text-gray-500">5</span>
      </strong>

      {tickets
        .filter(p => !p.done)
        .map(p => (
          <Card key={p.id} ticket={p} />
        ))}
    </section>
  )
}
