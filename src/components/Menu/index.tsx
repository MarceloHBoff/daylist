import Image from 'next/image'

import MenuLink from './MenuLink'
import SignOut from './SignOut'

export default function Menu() {
  return (
    <nav className="flex items-center bg-zinc-700 border-b-2 border-b-slate-400">
      <div className="w-full grid grid-cols-5 mx-14 p-1">
        <div className="flex items-center justify-center">
          <Image src="/favicon.ico" width={36} height={36} alt="Day list" />
        </div>

        <div className="col-span-3 flex justify-center">
          <MenuLink />
        </div>

        <SignOut />
      </div>
    </nav>
  )
}
