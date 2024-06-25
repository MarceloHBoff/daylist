'use client'

import Modal from '@/components/Modal'
import { api } from '@/lib/axios'
import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'

type TagFormProps = {
  opener: ReactNode
  defaultValues?: any
}

export default function TagForm({ opener, defaultValues }: TagFormProps) {
  const { register, handleSubmit } = useForm({ defaultValues })

  const onSubmit = handleSubmit(async data => {
    if (data.id) {
      await api.post('tags/update', { ...data })
    } else {
      await api.post('tags/insert', { ...data })
    }
    window.location.reload()
  })

  return (
    <Modal title="New Tag" opener={opener} onButtonClick={onSubmit}>
      <form onSubmit={onSubmit} className="flex items-center">
        <input
          className="border-2 border-gray-600 rounded-xl p-4 bg-transparent uppercase"
          {...register('description')}
        />
        <input
          type="color"
          className="ml-6 border-2 border-gray-600 rounded-xl p-2 bg-transparent w-40 h-14"
          {...register('color')}
        />
      </form>
    </Modal>
  )
}
