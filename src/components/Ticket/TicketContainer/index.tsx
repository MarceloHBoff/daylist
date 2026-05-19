'use client'

import { ComponentProps } from '@/types'

type TicketContainerProps = ComponentProps & {
  className?: string
  tagColor?: string | null
}

export default function TicketContainer({
  children,
  className = '',
  tagColor
}: TicketContainerProps) {
  if (tagColor) {
    return (
      <article
        className={`group relative mx-2 my-3 flex w-full rounded-xl border border-x-4 p-4 transition-all duration-200 ${className}`}
        style={{
          backgroundColor: `${tagColor}1a`,
          borderColor: `${tagColor}77`,
          borderLeftColor: tagColor,
          boxShadow: `inset 0 1px 0 0 ${tagColor}14, 0 4px 16px -10px ${tagColor}44`
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = `${tagColor}66`
          e.currentTarget.style.borderLeftColor = tagColor
          e.currentTarget.style.boxShadow = `inset 0 1px 0 0 ${tagColor}1f, 0 8px 28px -10px ${tagColor}66`
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = `${tagColor}77`
          e.currentTarget.style.borderLeftColor = tagColor
          e.currentTarget.style.boxShadow = `inset 0 1px 0 0 ${tagColor}14, 0 4px 16px -10px ${tagColor}44`
        }}
      >
        {children}
      </article>
    )
  }

  return (
    <article
      className={`group mx-2 my-3 flex w-full rounded-xl border border-neutral-800 bg-neutral-950 p-4 transition-all duration-200 hover:border-neutral-700 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_8px_24px_-12px_rgba(56,189,248,0.15)] ${className}`}
    >
      {children}
    </article>
  )
}
