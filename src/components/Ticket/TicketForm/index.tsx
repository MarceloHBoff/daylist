'use client'

import { ReactNode } from 'react'

import * as Form from '@/components/Form'
import Modal from '@/components/Modal'
import TagSelect from '@/components/TagSelect'
import { apiPost } from '@/lib/api'
import { parseForm } from '@/utils/date'
import { Ticket } from '@prisma/client'

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
          date: parseForm(defaultValues?.date)
        }}
      >
        <Form.Input
          name="description"
          placeholder="Type your ticket description..."
        />

        <div className="mt-2 flex">
          <div className="mr-2">
            <Form.Input name="date" type="date" />
          </div>

          <TagSelect />
        </div>

        <Form.Submit />
      </Form.Form>
    </Modal>
  )
}
