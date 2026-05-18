type SkeletonProps = {
  count: number
  type: 'ticket' | 'tag'
}

function TicketSkeleton() {
  return (
    <article className="group mx-2 my-3 flex w-full rounded-xl border border-zinc-700/70 bg-gradient-to-br from-zinc-800 to-zinc-900/80 p-6 shadow-sm">
      <div className="flex w-full animate-pulse items-center gap-3">
        <div className="h-8 w-8 flex-shrink-0 rounded-full bg-zinc-700" />
        <div className="flex flex-1 flex-col gap-2">
          <div className="h-5 w-3/4 rounded bg-zinc-700" />
          <div className="h-5 w-1/2 rounded bg-zinc-700" />
        </div>
      </div>
    </article>
  )
}

function TagSkeleton() {
  return (
    <div className="mb-4 flex animate-pulse items-center border-b-2 border-b-zinc-700 p-2">
      <div className="mr-2 h-5 w-5 rounded-full bg-zinc-700" />
      <div className="h-4 w-32 rounded bg-zinc-700" />
      <div className="ml-4 h-3 w-6 rounded bg-zinc-700" />
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
