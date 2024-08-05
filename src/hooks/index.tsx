'use client'

import { SessionProvider } from 'next-auth/react'

import { ComponentProps } from '@/types'

import { LoadingProvider } from './loading'

export default function AppProvider({ children }: ComponentProps) {
  return (
    <SessionProvider>
      <LoadingProvider>{children}</LoadingProvider>
    </SessionProvider>
  )
}
