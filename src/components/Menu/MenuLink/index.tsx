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
    <div className="my-3">
      {menus.map(p => (
        <Link
          key={p.label}
          href={p.path}
          className={`mx-8 text-xl font-bold ${
            pathname === p.path
              ? 'text-blue-400 hover:text-blue-400'
              : 'text-zinc-200 hover:text-zinc-50'
          }`}
        >
          {p.label}
        </Link>
      ))}
    </div>
  )
}
