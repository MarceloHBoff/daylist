'use client'

import { SessionProvider } from 'next-auth/react'

import { useState } from 'react'

import { ComponentProps } from '@/types'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { LoadingProvider } from './loading'

export default function AppProvider({ children }: ComponentProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <LoadingProvider>{children}</LoadingProvider>
      </SessionProvider>
    </QueryClientProvider>
  )
}
