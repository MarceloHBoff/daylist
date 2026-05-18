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

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <TicketForm
          defaultValues={{ ...ticket }}
          opener={
            <div className="cursor-pointer">
              {(ticket.date || ticket.tag) && (
                <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
                  {ticket.date && (
                    <span className="inline-flex h-5 items-center rounded-md border border-red-500/25 bg-red-500/15 px-1.5 font-mono text-[11px] font-semibold tabular-nums tracking-tight text-red-400">
                      {format(new Date(ticket.date), 'HH:mm')}
                    </span>
                  )}

                  {ticket.tag && (
                    <TagBadge
                      color={ticket.tag.color}
                      description={ticket.tag.description}
                    />
                  )}

                  {showDate && ticket.date && (
                    <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-neutral-500">
                      <Image
                        src="/calendar.svg"
                        alt="calendar"
                        width={11}
                        height={11}
                      />
                      {getDaySuffix(ticket.date)}
                    </span>
                  )}
                </div>
              )}

              <span className="block text-sm font-medium leading-snug text-neutral-100">
                {ticket.description}
              </span>
            </div>
          }
        />
      </div>

      <div className="ml-1 flex items-start">
        <TicketContextMenu ticket={ticket} />
      </div>
    </>
  )
}
