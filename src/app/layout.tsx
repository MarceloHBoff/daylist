import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import AppProvider from '@/hooks'
import { ComponentProps } from '@/types'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Day List',
  description: 'Daily tickets'
}

export default function RootLayout({ children }: ComponentProps) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen w-full bg-zinc-800`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
