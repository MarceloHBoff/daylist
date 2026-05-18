import Image from 'next/image'

import { ComponentProps } from '@/types'

import TicketForm from '../TicketForm'

type TicketsWrapperProps = ComponentProps & {
  title: string
  defaultValues?: any
  outdated?: boolean
  isLoading?: boolean
  onReorder?: () => void
}

export default function TicketsWrapper({
  title,
  defaultValues,
  outdated = false,
  isLoading = false,
  onReorder,
  children
}: TicketsWrapperProps) {
  // @ts-ignore
  const length = children.length ?? children.props?.tickets?.length

  return (
    <section className="h-ticket-list scrollbar-stable mx-2 w-full min-w-96 max-w-[400px] overflow-x-hidden p-2 xl:overflow-y-hidden xl:hover:overflow-y-auto">
      <div className="flex items-center">
        <strong className="ml-3 text-sm font-semibold uppercase tracking-wider text-neutral-100">
          {title}
        </strong>

        {!isLoading && (
          <>
            <span className="ml-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-md bg-neutral-900 px-1.5 text-[11px] font-medium text-neutral-500">
              {length}
            </span>

            {onReorder && (
              <button
                className="ml-3 opacity-60 transition-opacity hover:opacity-100"
                type="button"
                onClick={onReorder}
              >
                <Image alt="sort" src="/reorder.svg" height={14} width={14} />
              </button>
            )}
          </>
        )}
      </div>

      {children}

      {!outdated && !isLoading && (
        <TicketForm
          defaultValues={defaultValues}
          opener={
            <div className="group/add mx-2 mt-2 flex w-full cursor-pointer items-center gap-2 rounded-lg border border-dashed border-neutral-700 bg-neutral-900/40 px-3 py-2 text-neutral-300 transition-all hover:border-sky-400/60 hover:bg-sky-400/10 hover:text-sky-200 hover:shadow-[0_0_0_1px_rgba(56,189,248,0.15)]">
              <span className="text-lg font-bold text-sky-400 transition-transform group-hover/add:scale-110">
                +
              </span>
              <span className="text-sm font-medium">Add ticket</span>
            </div>
          }
        />
      )}
    </section>
  )
}
