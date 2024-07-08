import { ReactNode } from 'react'

type ModalContentProps = {
  title: string
  onClose: () => void
  children: ReactNode
  onButtonClick: () => Promise<void>
}

export default function ModalContent({
  title,
  children,
  onClose,
  onButtonClick
}: ModalContentProps) {
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      onClose()
    }
  })

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-1/3"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-gray-700 pb-3">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-lg"
          >
            X
          </button>
        </div>
        <div className="mt-4">{children}</div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={async () => {
              await onButtonClick()
              onClose()
            }}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
