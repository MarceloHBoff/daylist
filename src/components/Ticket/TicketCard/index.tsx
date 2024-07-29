import Image from 'next/image'

import TagIcon from '@/components/TagIcon'
import { TicketWithTag } from '@/models/ticket'
import { getDaySuffix } from '@/utils/date'

import TicketForm from '../TicketForm'

import TicketCheck from './TicketCheck'
import TicketContextMenu from './TicketContextMenu'

type TicketProps = {
  ticket: TicketWithTag
  showDate?: boolean
}

export default function Ticket({ ticket, showDate = false }: TicketProps) {
  return (
    <>
      <div className="mr-2 flex items-center">
        <TicketCheck id={ticket.id} />
      </div>

      <div className="flex w-full flex-col">
        <TicketForm
          defaultValues={{ ...ticket }}
          opener={
            <div className="cursor-pointer text-sm font-bold text-slate-100">
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

            <span className="ml-2 text-sm">{ticket.tag.description}</span>

            {showDate && ticket.date && (
              <div className="ml-auto flex items-center text-base text-zinc-400">
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
    </>
  )
}
