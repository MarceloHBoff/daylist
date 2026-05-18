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
      className={`group mx-2 my-3 flex w-full rounded-xl border border-neutral-800 bg-neutral-950 p-4 transition-all duration-200 hover:border-neutral-700 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_8px_24px_-12px_rgba(56,189,248,0.15)] ${className}`}
    >
      {children}
    </article>
  )
}
