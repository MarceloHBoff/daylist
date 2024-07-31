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

      <div className="-mb-16 mr-6 flex">
        {Number(week) > 0 && (
          <Link
            href={`/${Number(week) - 1}`}
            className="mr-4 rounded-xl border-2 border-zinc-500 px-3 py-1 transition-opacity hover:opacity-70"
          >
            <Image src="left.svg" alt="left" height={26} width={26} />
          </Link>
        )}
        <Link
          href={`/${Number(week) + 1}`}
          className="rounded-xl border-2 border-zinc-500 px-3 py-1 transition-opacity hover:opacity-70"
        >
          <Image src="right.svg" alt="left" height={26} width={26} />
        </Link>
      </div>
    </div>
  )
}
