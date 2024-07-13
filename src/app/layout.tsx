import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import SessionWrapper from '@/components/SessionWrapper'
import { ComponentProps } from '@/types'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Day List',
  description: 'Daily tickets'
}

export default function RootLayout({ children }: ComponentProps) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={`${inter.className} bg-zinc-800 w-full h-screen`}>
          {children}
        </body>
      </html>
    </SessionWrapper>
  )
}
