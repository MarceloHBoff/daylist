import Menu from '@/components/Menu'
import { ComponentProps } from '@/types'

export default function PagesLayout({ children }: ComponentProps) {
  return (
    <main className="h-screen w-full bg-black">
      <Menu />

      {children}
    </main>
  )
}
