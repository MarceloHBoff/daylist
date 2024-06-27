import { TicketWithTag } from '@/models/ticket'
import TagIcon from '@/components/TagIcon'
import TicketCheck from './TicketCheck'
import TicketContextMenu from './TicketContextMenu'
import TicketForm from '../TicketForm'

type TicketProps = {
  ticket: TicketWithTag
}

export default function Ticket({ ticket }: TicketProps) {
  return (
    <article className="bg-zinc-700 mx-2 my-3 p-3 w-full min-h-20 rounded-xl border-2 border-gray-600 flex group">
      <div className="flex items-center mr-2">
        <TicketCheck id={ticket.id} />
      </div>

      <div className="flex flex-col w-full">
        <TicketForm
          defaultValues={{
            ...ticket,
            date: new Date(ticket.date ?? '').toISOString().replace('.000Z', '')
          }}
          opener={
            <div className="text-slate-300 text-sm font-bold cursor-pointer">
              {ticket.description}
            </div>
          }
        />

        {ticket.tag && (
          <div
            className="mt-3 flex items-center"
            style={{ color: ticket.tag.color }}
          >
            <TagIcon color={ticket.tag.color} />

            <span className="ml-2 text-sm font-medium">
              {ticket.tag.description}
            </span>
          </div>
        )}
      </div>

      <div className="w-8">
        <TicketContextMenu id={ticket.id} />
      </div>
    </article>
  )
}
