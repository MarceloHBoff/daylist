import { TicketWithTag } from '@/models/ticket'
import Ticket from './Ticket'
import TicketForm from './TicketForm'

type TicketListProps = {
  title: string
  tickets: TicketWithTag[]
  defaultValues?: any
  showDate?: boolean
}

export default function TicketList({
  title,
  tickets,
  defaultValues,
  showDate = false
}: TicketListProps) {
  const validTickets = tickets.filter(p => !p.done)

  return (
    <section className="mx-2 p-2 w-full min-w-72 overflow-y-hidden hover:overflow-y-auto overflow-x-hidden">
      <strong className="ml-3 text-white">
        {title}
        <span className="text-xs ml-2 text-gray-500">
          {validTickets.length}
        </span>
      </strong>

      {validTickets.map(p => (
        <Ticket key={p.id} ticket={p} showDate={showDate} />
      ))}

      <TicketForm
        defaultValues={defaultValues}
        opener={
          <div className="flex items-center p-2 opacity-80 hover:opacity-100 cursor-pointer">
            <span className="text-orange-600 mr-2 text-2xl">+</span>
            <span className="text-white">Add ticket</span>
          </div>
        }
      />
    </section>
  )
}
