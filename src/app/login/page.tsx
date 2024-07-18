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
      <div className="h-full flex items-center justify-center">
        <article className="flex flex-col items-center justify-evenly bg-zinc-700 rounded-xl p-16 max-w-[800px]">
          <div className="flex flex-col items-center justify-center">
            <Image src="/favicon.ico" width={80} height={80} alt="Day list" />

            <span className="text-white text-4xl font-bold my-4">Day list</span>
            <span className="text-zinc-400 text-xl font-bold">
              Optimize your day completion your tasks
            </span>
          </div>

          <button
            className="flex items-center bg-white rounded-xl mt-12 p-4"
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
