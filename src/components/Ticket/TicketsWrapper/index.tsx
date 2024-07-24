import { ComponentProps } from '@/types'

import TicketForm from '../TicketForm'

type TicketListWrapperProps = ComponentProps & {
  title: string
  defaultValues?: any
  outdated?: boolean
}

export default function TicketListWrapper({
  title,
  defaultValues,
  outdated = false,
  children
}: TicketListWrapperProps) {
  // @ts-ignore
  const length = children.length

  return (
    <section className="h-ticket-list mx-2 p-2 w-full min-w-96 max-w-[400px] overflow-y-hidden hover:overflow-y-auto overflow-x-hidden scrollbar-stable">
      <strong className="ml-3 text-white">
        {title}
        <span className="text-xs ml-2 text-gray-500">{length}</span>
      </strong>

      {children}

      {!outdated && (
        <TicketForm
          defaultValues={defaultValues}
          opener={
            <div className="flex items-center p-2 opacity-80 hover:opacity-100 cursor-pointer">
              <span className="text-orange-600 mr-2 text-2xl">+</span>
              <span className="text-white">Add ticket</span>
            </div>
          }
        />
      )}
    </section>
  )
}
