'use client'

import Modal from '@/components/Modal'
import Select from '@/components/Select'
import TagSelect from '@/components/TagSelect'
import { api } from '@/lib/axios'
import { parseForm } from '@/utils/date'
import { addDays } from 'date-fns'
import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'

type DateFormProps = {
  opener: ReactNode
  type: number
}

export default function DateForm({ opener, type }: DateFormProps) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      initialDate: type === 0 ? parseForm(addDays(new Date(), 1)) : null,
      finalDate: type === 0 ? parseForm(addDays(new Date(), 8)) : null,
      description: ''
    }
  })

  const onSubmit = handleSubmit(async data => {
    await api.post('tickets/insert-many', { type, ...data })

    window.location.reload()
  })

  return (
    <Modal title="New Tickets" opener={opener} onButtonClick={onSubmit}>
      <form onSubmit={onSubmit} className="flex flex-col">
        {type === 0 ? (
          <div className="flex mb-4">
            <input
              className="w-full border-2 border-gray-600 rounded-xl p-4 bg-transparent outline-none focus:border-gray-500 mr-4"
              type="date"
              {...register('initialDate')}
            />
            <input
              className="w-full border-2 border-gray-600 rounded-xl p-4 bg-transparent outline-none focus:border-gray-500"
              type="date"
              {...register('finalDate')}
            />
          </div>
        ) : type === 1 ? (
          <div className="flex mb-4">
            <Select
              name="dayOnMonth"
              options={[...Array(31)].map((_, index) => ({
                id: (index + 1).toString(),
                description: (index + 1).toString()
              }))}
              register={register}
            />
          </div>
        ) : (
          <div className="flex mb-4">
            <Select
              name="dayOnWeek"
              options={[
                { id: '1', description: 'Monday' },
                { id: '2', description: 'Tuesday' },
                { id: '3', description: 'Wednesday' },
                { id: '4', description: 'Thursday' },
                { id: '5', description: 'Friday' },
                { id: '6', description: 'Saturday' },
                { id: '7', description: 'Sunday' }
              ]}
              register={register}
            />
          </div>
        )}

        <input
          className="border-2 border-gray-600 rounded-xl p-4 bg-transparent outline-none focus:border-gray-500 mb-4"
          autoFocus
          autoComplete="off"
          placeholder="Type your ticket description..."
          {...register('description')}
        />

        <TagSelect register={register} name="tagId" />
      </form>
    </Modal>
  )
}
