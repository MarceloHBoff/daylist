'use client'

import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default function Login() {
  const { status } = useSession()

  if (status === 'authenticated') {
    redirect('/')
  }

  return (
    <main className="w-screen h-screen bg-zinc-800">
      <div className="w-full h-full flex items-center justify-center">
        <button
          className="flex items-center bg-white rounded-xl p-4"
          onClick={() => signIn('google')}
        >
          <Image alt="google" src="/google.svg" height={30} width={30} />

          <span className="ml-4 text-zinc-800">Sign In with Google</span>
        </button>
      </div>
    </main>
  )
}
