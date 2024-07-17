'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

import Loading from '@/app/(pages)/loading'
import { ComponentProps } from '@/types'

import ServerComponentWrapper from './ServerComponentWrapper'

export default function PageWrapper({ children }: ComponentProps) {
  const { status } = useSession()

  if (status === 'unauthenticated') {
    redirect('/login')
  }

  return (
    <ServerComponentWrapper>
      {status === 'authenticated' ? children : <Loading />}
    </ServerComponentWrapper>
  )
}
