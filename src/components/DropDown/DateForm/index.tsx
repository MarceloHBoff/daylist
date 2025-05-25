'use client'

import { ReactNode, useState } from 'react'

import * as Form from '@/components/Form'
import Loading from '@/components/Loading'
import Modal from '@/components/Modal'
import TagSelect from '@/components/TagSelect'
import { apiPost } from '@/lib/api'
import { parseForm } from '@/utils/date'
import { addDays } from 'date-fns'

type DateFormProps = {
  opener: ReactNode
  type: number
}

export default function DateForm({ opener, type }: DateFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    await apiPost('/tickets/insert-many', { type, ...data })

    setIsLoading(false)
    window.location.reload()
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <Modal title="New Tickets" opener={opener}>
      <Form.Form
        onSubmit={onSubmit}
        defaultData={{
          initialDate: type === 0 ? parseForm(addDays(new Date(), 2)) : null,
          finalDate: type === 0 ? parseForm(addDays(new Date(), 8)) : null,
          description: ''
        }}
      >
        {type === 0 ? (
          <div className="flex">
            <div className="mr-2 w-full">
              <Form.Input name="initialDate" type="date" />
            </div>

            <div className="w-full">
              <Form.Input name="finalDate" type="date" />
            </div>
          </div>
        ) : type === 1 ? (
          <Form.Select
            name="dayOnMonth"
            options={[...Array(31)].map((_, index) => ({
              id: (index + 1).toString(),
              description: (index + 1).toString()
            }))}
          />
        ) : (
          <Form.Select
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
          />
        )}

        <div className="mt-2">
          <Form.Input
            name="time"
            type="time"
            placeholder="Type your ticket description..."
          />
        </div>

        <div className="mt-2">
          <Form.Input
            name="description"
            autoFocus
            placeholder="Type your ticket description..."
          />
        </div>

        <div className="mt-2">
          <TagSelect />
        </div>

        <Form.Submit />
      </Form.Form>
    </Modal>
  )
}
