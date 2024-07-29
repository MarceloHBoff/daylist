import Image from 'next/image'

import MenuLink from './MenuLink'
import SignOut from './SignOut'

export default function Menu() {
  return (
    <nav className="flex items-center border-b-2 border-b-slate-400 bg-zinc-700">
      <div className="mx-14 grid w-full grid-cols-5 p-1">
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
