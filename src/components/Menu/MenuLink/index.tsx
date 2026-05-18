'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menus = [
  { label: 'Home', path: '/' },
  { label: 'Tags', path: '/tags' },
  { label: 'Ticket by Tags', path: '/ticket-tags' }
]

export default function MenuLink() {
  const pathname = usePathname()

  return (
    <div className="my-3 flex flex-col space-y-6 md:flex-row md:items-center md:space-y-0">
      {menus.map(p => (
        <Link
          key={p.label}
          href={p.path}
          className={`mx-8 text-base font-bold transition-colors lg:text-xl ${
            pathname === p.path
              ? 'text-sky-400 hover:text-sky-300'
              : 'text-neutral-400 hover:text-neutral-50'
          }`}
        >
          {p.label}
        </Link>
      ))}
    </div>
  )
}
