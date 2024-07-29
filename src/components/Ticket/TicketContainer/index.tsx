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
      className={`group mx-2 my-3 flex min-h-20 w-full rounded-xl border-2 border-gray-600 bg-zinc-700 p-3 ${className}`}
    >
      {children}
    </article>
  )
}
