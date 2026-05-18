import Image from 'next/image'
import Link from 'next/link'

import DropDown from '@/components/DropDown'

type DashboardHeaderProps = {
  week: number
}

export default function DashboardHeader({ week }: DashboardHeaderProps) {
  return (
    <div className="m-10 flex items-center justify-between">
      <DropDown />

      <div className="-mb-16 flex xl:mr-6">
        {Number(week) > 0 && (
          <Link
            href={`/${Number(week) - 1}`}
            className="mr-4 rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-1 shadow-sm transition-all hover:border-sky-400/50 hover:bg-neutral-800 hover:shadow-[0_0_0_1px_rgba(56,189,248,0.15)]"
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
