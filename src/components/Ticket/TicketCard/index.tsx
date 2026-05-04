import Image from 'next/image'

import TagBadge from '@/components/TagBadge'
import { TicketWithTag } from '@/models/ticket'
import { getDaySuffix } from '@/utils/date'
import { format } from 'date-fns'

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
      <div className="mr-3 flex items-start pt-0.5">
        <TicketCheck id={ticket.id} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <TicketForm
          defaultValues={{ ...ticket }}
          opener={
            <div className="flex cursor-pointer flex-wrap items-center gap-2">
              {ticket.date && (
                <span className="rounded px-1.5 py-0.5 text-xs font-semibold bg-red-500/15 text-red-400 border border-red-500/25">
                  {format(new Date(ticket.date), 'HH:mm')}
                </span>
              )}
              <span className="text-sm font-medium text-slate-100 leading-snug">
                {ticket.description}
              </span>
            </div>
          }
        />

        {(ticket.tag || (showDate && ticket.date)) && (
          <div className="flex items-center gap-2">
            {ticket.tag && (
              <TagBadge
                color={ticket.tag.color}
                description={ticket.tag.description}
              />
            )}

            {showDate && ticket.date && (
              <div className="ml-auto flex items-center gap-1.5 text-xs text-zinc-500">
                <Image
                  src="/calendar.svg"
                  alt="calendar"
                  width={12}
                  height={12}
                />
                {getDaySuffix(ticket.date)}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="ml-1 flex items-start">
        <TicketContextMenu id={ticket.id} />
      </div>
    </>
  )
}
