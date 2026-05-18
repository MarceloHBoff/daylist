import { Metadata } from 'next'
import Image from 'next/image'

import SignInButton from '@/components/SignInButton'

export const metadata: Metadata = {
  title: 'Login | Day List'
}

export default async function Login() {
  return (
    <main className="h-screen w-screen bg-black">
      <div className="flex h-full items-center justify-center p-8 md:p-0">
        <article className="flex max-w-[800px] flex-col items-center justify-evenly rounded-xl border border-neutral-800 bg-neutral-950 p-8 shadow-2xl shadow-sky-500/5 md:p-16">
          <div className="flex flex-col items-center justify-center">
            <Image src="/favicon.ico" width={80} height={80} alt="Day list" />

            <span className="my-4 text-4xl font-bold text-neutral-50">Day list</span>
            <span className="text-center text-base font-medium text-neutral-500 md:text-xl">
              Optimize your day completion your tasks
            </span>
          </div>

          <SignInButton />
        </article>
      </div>
    </main>
  )
}
