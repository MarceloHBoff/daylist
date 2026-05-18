type SkeletonProps = {
  count: number
  type: 'ticket' | 'tag'
}

function TicketSkeleton() {
  return (
    <article className="group mx-2 my-3 flex w-full rounded-xl border border-neutral-800 bg-neutral-950 p-6">
      <div className="flex w-full animate-pulse items-center gap-3">
        <div className="h-8 w-8 flex-shrink-0 rounded-full bg-neutral-800" />
        <div className="flex flex-1 flex-col gap-2">
          <div className="h-5 w-3/4 rounded bg-neutral-800" />
          <div className="h-5 w-1/2 rounded bg-neutral-800" />
        </div>
      </div>
    </article>
  )
}

function TagSkeleton() {
  return (
    <div className="mb-4 flex animate-pulse items-center border-b border-neutral-800 p-2">
      <div className="mr-2 h-5 w-5 rounded-full bg-neutral-800" />
      <div className="h-4 w-32 rounded bg-neutral-800" />
      <div className="ml-4 h-3 w-6 rounded bg-neutral-800" />
    </div>
  )
}

export default function Skeleton({ count, type }: SkeletonProps) {
  const Item = type === 'ticket' ? TicketSkeleton : TagSkeleton

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Item key={i} />
      ))}
    </>
  )
}
