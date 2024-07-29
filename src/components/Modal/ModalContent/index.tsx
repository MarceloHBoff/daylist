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
      className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="w-1/3 rounded-lg bg-gray-800 p-6 text-white shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-700 pb-3">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-lg text-gray-400 hover:text-white"
          >
            X
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}
