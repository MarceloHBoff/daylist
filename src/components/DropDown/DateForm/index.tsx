'use client'

import { ReactNode } from 'react'

import * as Form from '@/components/Form'
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
  const onSubmit = async (data: any) => {
    await apiPost('/tickets/insert-many', { type, ...data })

    window.location.reload()
  }

  return (
    <Modal title="New Tickets" opener={opener}>
      <Form.Form
        onSubmit={onSubmit}
        defaultData={{
          initialDate: type === 0 ? parseForm(addDays(new Date(), 1)) : null,
          finalDate: type === 0 ? parseForm(addDays(new Date(), 7)) : null,
          description: ''
        }}
      >
        {type === 0 ? (
          <div className="flex">
            <div className="mr-2">
              <Form.Input name="initialDate" type="date" />
            </div>

            <Form.Input name="finalDate" type="date" />
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
