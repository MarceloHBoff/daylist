'use client'

import { SessionProvider } from 'next-auth/react'

import { ComponentProps } from '@/types'

export default function SessionWrapper({ children }: ComponentProps) {
  return <SessionProvider>{children}</SessionProvider>
}
