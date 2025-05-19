import Image from 'next/image'

import { ComponentProps } from '@/types'

import TicketForm from '../TicketForm'

type TicketsWrapperProps = ComponentProps & {
  title: string
  defaultValues?: any
  outdated?: boolean
  onReorder?: () => void
}

export default function TicketsWrapper({
  title,
  defaultValues,
  outdated = false,
  onReorder,
  children
}: TicketsWrapperProps) {
  // @ts-ignore
  const length = children.length ?? children.props.tickets.length

  return (
    <section className="h-ticket-list scrollbar-stable mx-2 w-full min-w-96 max-w-[400px] overflow-x-hidden overflow-y-hidden p-2 hover:overflow-y-auto">
      <div className="flex items-center">
        <strong className="ml-3 text-white">{title}</strong>

        <span className="ml-2 text-xs text-gray-500">{length}</span>

        {onReorder && (
          <button className="ml-4" type="button" onClick={onReorder}>
            <Image alt="sort" src="/reorder.svg" height={15} width={15} />
          </button>
        )}
      </div>

      {children}

      {!outdated && (
        <TicketForm
          defaultValues={defaultValues}
          opener={
            <div className="flex cursor-pointer items-center p-2 opacity-80 hover:opacity-100">
              <span className="mr-2 text-2xl text-orange-600">+</span>
              <span className="text-white">Add ticket</span>
            </div>
          }
        />
      )}
    </section>
  )
}
