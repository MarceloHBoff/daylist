import { TicketWithTag } from '@/models/ticket'
import TagIcon from '@/components/TagIcon'
import TicketCheck from './TicketCheck'
import TicketContextMenu from './TicketContextMenu'
import TicketForm from '../TicketForm'
import { getDaySuffix } from '@/utils/date'
import Image from 'next/image'

type TicketProps = {
  ticket: TicketWithTag
  showDate?: boolean
  outdated?: boolean
}

export default function Ticket({
  ticket,
  showDate = false,
  outdated = false
}: TicketProps) {
  return (
    <article
      className={`bg-zinc-700 mx-2 my-3 p-3 w-full min-h-20 rounded-xl border-2 border-gray-600 flex group ${
        outdated && 'border-red-600'
      }`}
    >
      <div className="flex items-center mr-2">
        <TicketCheck id={ticket.id} />
      </div>

      <div className="flex flex-col w-full">
        <TicketForm
          defaultValues={{ ...ticket }}
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

            {showDate && ticket.date && (
              <div className="ml-auto text-base text-zinc-400 flex items-center">
                <Image
                  src="/calendar.svg"
                  alt="calendar"
                  width={16}
                  height={16}
                  className="mr-2"
                />

                {getDaySuffix(ticket.date)}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="w-8">
        <TicketContextMenu id={ticket.id} />
      </div>
    </article>
  )
}
