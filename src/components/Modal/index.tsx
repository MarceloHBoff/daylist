'use client'

import { ReactNode, useState } from 'react'

import ModalContent from './ModalContent'

type ModalProps = {
  title: string
  opener: ReactNode
  children: ReactNode
}

export default function Modal({ title, opener, children }: ModalProps) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div onClick={() => setShowModal(true)}>{opener}</div>

      {showModal && (
        <ModalContent title={title} onClose={() => setShowModal(false)}>
          {children}
        </ModalContent>
      )}
    </>
  )
}
