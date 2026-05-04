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
      className={`group mx-2 my-3 flex w-full rounded-xl border border-zinc-700/70 bg-gradient-to-br from-zinc-800 to-zinc-900/80 p-4 shadow-sm transition-all duration-200 hover:border-zinc-600 hover:shadow-md ${className}`}
    >
      {children}
    </article>
  )
}
