import Image from 'next/image'

import MenuLink from './MenuLink'

export default function Menu() {
  return (
    <nav className="flex items-center bg-zinc-700 border-b-2 border-b-slate-400">
      <div className="w-full flex items-center justify-around p-1">
        <Image src="/favicon.ico" width={36} height={36} alt="Day list" />

        <MenuLink />

        <div />
      </div>
    </nav>
  )
}
