'use client'

import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default function SignInButton() {
  const { status } = useSession()

  if (status === 'authenticated') {
    redirect('/')
  }

  if (status === 'loading') {
    return (
      <div className="mt-12 h-16 w-16 animate-spin rounded-full border-b-4 border-blue-400" />
    )
  }

  return (
    <button
      className="mt-12 flex items-center rounded-xl bg-white p-4"
      onClick={() => signIn('google')}
    >
      <Image alt="google" src="/google.svg" height={30} width={30} />

      <span className="ml-4 text-zinc-800">Sign In with Google</span>
    </button>
  )
}
