import Link from 'next/link'

const menus = [
  { label: 'Home', path: '/' },
  { label: 'Tags', path: '/tags' },
  { label: 'Tags/Ticket', path: '/tags-ticket' }
]

type MenuProps = {
  path: string
}

export default function Menu({ path }: MenuProps) {
  return (
    <nav className="flex items-center bg-zinc-700">
      <div className="flex items-center mx-auto p-4">
        {menus.map(p => (
          <Link
            key={p.label}
            href={p.path}
            className={`mx-4 text-zinc-200 hover:text-zinc-50 ${
              path === p.path ? 'text-blue-400' : ''
            }`}
          >
            {p.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
