import Image from 'next/image'
import Link from 'next/link'

import DropDown from '@/components/DropDown'

type DashboardHeaderProps = {
  week: number
  showCompleted: boolean
  onShowCompletedChange: (showCompleted: boolean) => void
}

export default function DashboardHeader({
  week,
  showCompleted,
  onShowCompletedChange
}: DashboardHeaderProps) {
  return (
    <div className="m-10 flex items-center justify-between">
      <DropDown />

      <div className="-mb-16 flex items-center gap-3 xl:mr-6">
        <label className="flex cursor-pointer select-none items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs font-medium text-neutral-300 shadow-sm transition-all hover:border-sky-400/50 hover:text-neutral-100">
          <input
            type="checkbox"
            className="peer sr-only"
            checked={showCompleted}
            onChange={event => onShowCompletedChange(event.target.checked)}
          />
          <span className="relative h-4 w-7 rounded-full bg-neutral-700 transition-colors after:absolute after:left-0.5 after:top-0.5 after:h-3 after:w-3 after:rounded-full after:bg-neutral-300 after:transition-transform peer-checked:bg-green-500/70 peer-checked:after:translate-x-3 peer-checked:after:bg-white" />
          Completed
        </label>

        {Number(week) > 0 && (
          <Link
            href={`/${Number(week) - 1}`}
            className="rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-1 shadow-sm transition-all hover:border-sky-400/50 hover:bg-neutral-800 hover:shadow-[0_0_0_1px_rgba(56,189,248,0.15)]"
          >
            <Image src="left.svg" alt="left" height={26} width={26} />
          </Link>
        )}
        <Link
          href={`/${Number(week) + 1}`}
          className="rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-1 shadow-sm transition-all hover:border-sky-400/50 hover:bg-neutral-800 hover:shadow-[0_0_0_1px_rgba(56,189,248,0.15)]"
        >
          <Image src="right.svg" alt="left" height={26} width={26} />
        </Link>
      </div>
    </div>
  )
}
