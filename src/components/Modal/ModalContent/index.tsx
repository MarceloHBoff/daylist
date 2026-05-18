import { ReactNode } from 'react'

type ModalContentProps = {
  title: string
  onClose: () => void
  children: ReactNode
}

export default function ModalContent({
  title,
  children,
  onClose
}: ModalContentProps) {
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      onClose()
    }
  })

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="m-2 w-full rounded-xl border border-neutral-800 bg-neutral-950 p-6 text-neutral-50 shadow-2xl shadow-black/60 md:w-1/2"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-lg text-neutral-500 transition-colors hover:text-neutral-100"
          >
            X
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}
