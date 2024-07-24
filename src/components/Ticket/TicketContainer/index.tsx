import { ComponentProps } from '@/types'

type TicketContainerProps = ComponentProps & {
  className?: string
}

export default function TicketContainer({
  children,
  className = ''
}: TicketContainerProps) {
  return (
    <article
      className={`bg-zinc-700 mx-2 my-3 p-3 w-full min-h-20 rounded-xl border-2 border-gray-600 flex group ${className}`}
    >
      {children}
    </article>
  )
}
