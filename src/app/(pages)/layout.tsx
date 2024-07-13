import Menu from '@/components/Menu'
import { ComponentProps } from '@/types'

export default function PagesLayout({ children }: ComponentProps) {
  return (
    <main className="w-full h-screen bg-zinc-800">
      <Menu />

      {children}
    </main>
  )
}
