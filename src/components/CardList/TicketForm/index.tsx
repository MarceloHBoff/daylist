'use client'

import Modal from '@/components/Modal'
import { api } from '@/lib/axios'
import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'

type TicketFormProps = {
  opener: ReactNode
  defaultValues?: any
}

export default function TicketForm({ opener, defaultValues }: TicketFormProps) {
  const { register, handleSubmit } = useForm({ defaultValues })

  const onSubmit = handleSubmit(async data => {
    await api.post('tickets/insert', { ...data })
    window.location.reload()
  })

  return (
    <Modal title="New Ticket" opener={opener} onButtonClick={onSubmit}>
      <form onSubmit={onSubmit}>
        <input
          className="border-2 border-gray-600 rounded-xl p-4 bg-transparent"
          {...register('description')}
        />
      </form>
    </Modal>
  )
}
