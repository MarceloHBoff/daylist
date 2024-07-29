import Menu from '@/components/Menu'
import { ComponentProps } from '@/types'

export default function PagesLayout({ children }: ComponentProps) {
  return (
    <main className="h-screen w-full bg-zinc-800">
      <Menu />

      {children}
    </main>
  )
}
