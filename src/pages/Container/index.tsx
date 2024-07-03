import { ComponentProps } from '@/types'
import Menu from './Menu'

type ContainerProps = ComponentProps & {
  path: string
}

export default function Container({ path, children }: ContainerProps) {
  return (
    <main className="w-full max-h-screen bg-zinc-800">
      <Menu path={path} />

      {children}
    </main>
  )
}
