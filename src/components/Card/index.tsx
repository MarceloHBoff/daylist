import { TicketWithTag } from '@/models/ticket'
import TagIcon from '@/components/TagIcon'

type CardProps = {
  ticket: TicketWithTag
}

export default function Card({ ticket }: CardProps) {
  return (
    <article className="bg-zinc-700 mx-2 my-3 p-3 w-full min-h-16 rounded-xl border-2 border-gray-600 flex">
      <div className="flex items-center mr-2">
        <button className="w-5 h-5 border-2 rounded-full hover:opacity-80" />
      </div>

      <div className="flex flex-col">
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
    </article>
  )
}
