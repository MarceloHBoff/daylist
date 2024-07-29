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
    <main className="h-screen w-screen bg-zinc-800">
      <div className="flex h-full items-center justify-center">
        <article className="flex max-w-[800px] flex-col items-center justify-evenly rounded-xl bg-zinc-700 p-16">
          <div className="flex flex-col items-center justify-center">
            <Image src="/favicon.ico" width={80} height={80} alt="Day list" />

            <span className="my-4 text-4xl font-bold text-white">Day list</span>
            <span className="text-xl font-bold text-zinc-400">
              Optimize your day completion your tasks
            </span>
          </div>

          <button
            className="mt-12 flex items-center rounded-xl bg-white p-4"
            onClick={() => signIn('google')}
          >
            <Image alt="google" src="/google.svg" height={30} width={30} />

            <span className="ml-4 text-zinc-800">Sign In with Google</span>
          </button>
        </article>
      </div>
    </main>
  )
}
