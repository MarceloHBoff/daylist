'use client'

import { SessionProvider } from 'next-auth/react'

import { ComponentProps } from '@/types'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { LoadingProvider } from './loading'

const queryClient = new QueryClient()

export default function AppProvider({ children }: ComponentProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <LoadingProvider>{children}</LoadingProvider>
      </SessionProvider>
    </QueryClientProvider>
  )
}
