'use client'

import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'

import Modal from '@/components/Modal'
import TagSelect from '@/components/TagSelect'
import { api } from '@/lib/axios'
import { parseForm } from '@/utils/date'

type TicketFormProps = {
  opener: ReactNode
  defaultValues?: any
}

export default function TicketForm({ opener, defaultValues }: TicketFormProps) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      ...defaultValues,
      date: parseForm(defaultValues?.date)
    }
  })

  const onSubmit = handleSubmit(async data => {
    if (data.id) {
      await api.post('tickets/update', { ...data })
    } else {
      await api.post('tickets/insert', { ...data })
    }
    window.location.reload()
  })

  return (
    <Modal title="New Ticket" opener={opener} onButtonClick={onSubmit}>
      <form onSubmit={onSubmit} className="flex flex-col">
        <input
          className="border-2 border-gray-600 rounded-xl p-4 bg-transparent outline-none focus:border-gray-500 mb-4"
          autoFocus
          autoComplete="off"
          placeholder="Type your ticket description..."
          {...register('description')}
        />
        <div className="flex">
          <input
            className="w-full border-2 border-gray-600 rounded-xl p-4 bg-transparent outline-none focus:border-gray-500 mr-4"
            type="date"
            {...register('date')}
          />

          <TagSelect register={register} name="tagId" />
        </div>
      </form>
    </Modal>
  )
}
