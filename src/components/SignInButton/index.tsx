'use client'

import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'

export default function SignInButton() {
  const { status } = useSession()

  if (status === 'loading') {
    return (
      <div className="mt-12 h-16 w-16 animate-spin rounded-full border-b-4 border-blue-400" />
    )
  }

  return (
    <button
      className="mt-12 flex items-center rounded-xl bg-white p-4"
      onClick={() => signIn('google', { callbackUrl: '/' })}
    >
      <Image alt="google" src="/google.svg" height={30} width={30} />

      <span className="ml-2 text-center text-base font-bold text-zinc-800 md:ml-4 md:text-lg">
        Sign In with Google
      </span>
    </button>
  )
}
