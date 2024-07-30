import { Metadata } from 'next'
import Image from 'next/image'

import SignInButton from '@/components/SignInButton'

export const metadata: Metadata = {
  title: 'Login | Day List'
}

export default async function Login() {
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

          <SignInButton />
        </article>
      </div>
    </main>
  )
}
