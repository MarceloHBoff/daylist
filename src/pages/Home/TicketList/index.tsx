import { TicketWithTag } from '@/models/ticket'
import { format, isToday, isTomorrow } from 'date-fns'
import Ticket from './Ticket'
import TicketForm from './TicketForm'

type TicketListProps = {
  date: Date
  tickets: TicketWithTag[]
}

export default function TicketList({ date, tickets }: TicketListProps) {
  const validTickets = tickets.filter(p => !p.done)

  function formatDate(date: Date) {
    let prefix = ''
    if (isToday(date)) {
      prefix = 'Today'
    } else if (isTomorrow(date)) {
      prefix = 'Tomorrow'
    } else {
      prefix = format(date, 'eeee')
    }

    return format(date, "dd' 'MMM") + ' - ' + prefix
  }

  return (
    <section className="mx-2 p-2 w-full min-w-72 overflow-y-hidden hover:overflow-y-auto overflow-x-hidden">
      <strong className="ml-3 text-white">
        {formatDate(date)}
        <span className="text-xs ml-2 text-gray-500">
          {validTickets.length}
        </span>
      </strong>

      {validTickets.map(p => (
        <Ticket key={p.id} ticket={p} />
      ))}

      <TicketForm
        defaultValues={{ date }}
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
