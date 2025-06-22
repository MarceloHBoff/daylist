'use client'

import { ReactNode } from 'react'

import * as Form from '@/components/Form'
import Modal from '@/components/Modal'
import TagSelect from '@/components/TagSelect'
import { apiPost } from '@/lib/api'
import { Ticket } from '@prisma/client'
import { format } from 'date-fns'

type TicketFormProps = {
  opener: ReactNode
  defaultValues?: any
}

export default function TicketForm({ opener, defaultValues }: TicketFormProps) {
  const onSubmit = async (data: Ticket) => {
    if (data.id) {
      apiPost('/tickets/update', { ...data })
    } else {
      apiPost('/tickets/insert', { ...data })
    }
    window.location.reload()
  }

  return (
    <Modal title="New Ticket" opener={opener}>
      <Form.Form
        onSubmit={onSubmit}
        defaultData={{
          ...defaultValues,
          date: defaultValues.date
            ? format(new Date(defaultValues.date), "yyyy-MM-dd'T'hh:mm:ss")
            : null
        }}
      >
        <Form.Input
          name="description"
          placeholder="Type your ticket description..."
        />

        <div className="mt-2 xl:flex">
          <div className="mb-2 xl:mr-2">
            <Form.Input name="date" type="datetime-local" />
          </div>

          <TagSelect />
        </div>

        <Form.Submit />
      </Form.Form>
    </Modal>
  )
}
