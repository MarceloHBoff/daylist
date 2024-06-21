import { TicketWithTag } from '@/models/ticket'
import TagIcon from '@/components/TagIcon'
import CardCheck from './CardCheck'
import CardContextMenu from './CardContextMenu'

type CardProps = {
  ticket: TicketWithTag
}

export default function Card({ ticket }: CardProps) {
  return (
    <article className="bg-zinc-700 mx-2 my-3 p-3 w-full min-h-20 rounded-xl border-2 border-gray-600 flex group">
      <div className="flex items-center mr-2">
        <CardCheck id={ticket.id} />
      </div>

      <div className="flex flex-col w-full">
        <div className="text-slate-300 text-sm font-bold">
          {ticket.description}
        </div>

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

      <CardContextMenu id={ticket.id} />
    </article>
  )
}
