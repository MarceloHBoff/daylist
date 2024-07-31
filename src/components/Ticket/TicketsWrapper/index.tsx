import { ComponentProps } from '@/types'

import TicketForm from '../TicketForm'

type TicketsWrapperProps = ComponentProps & {
  title: string
  defaultValues?: any
  outdated?: boolean
}

export default function TicketsWrapper({
  title,
  defaultValues,
  outdated = false,
  children
}: TicketsWrapperProps) {
  // @ts-ignore
  const length = children.length

  return (
    <section className="h-ticket-list scrollbar-stable mx-2 w-full min-w-96 max-w-[400px] overflow-x-hidden overflow-y-hidden p-2 hover:overflow-y-auto">
      <strong className="ml-3 text-white">
        {title}
        <span className="ml-2 text-xs text-gray-500">{length}</span>
      </strong>

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
