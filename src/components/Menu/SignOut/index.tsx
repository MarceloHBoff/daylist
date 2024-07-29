'use client'

import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

export default function SignOut() {
  const { data } = useSession()

  return (
    <div className="flex items-center justify-end">
      {data && (
        <div className="hidden xl:flex">
          <Image
            src={data?.user?.image ?? ''}
            alt={data?.user?.name ?? ''}
            width={42}
            height={42}
            className="rounded-full"
          />

          <div className="mx-4 flex flex-col">
            <span className="text-sm font-bold text-white">
              {data?.user?.name}
            </span>
            <span className="text-xs font-bold text-white">
              {data?.user?.email}
            </span>
          </div>
        </div>
      )}

      <button onClick={() => signOut()} title="Sign Out" className="ml-4">
        <Image src="/sign-out.svg" alt="Sign Out" width={26} height={26} />
      </button>
    </div>
  )
}
