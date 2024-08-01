import NextAuth, { DefaultSession } from 'next-auth'

import { ReactNode } from 'react'

export type ComponentProps = {
  children: ReactNode
}

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string
    }
  }
}
