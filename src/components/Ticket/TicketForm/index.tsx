'use client'

import { ReactNode, useState } from 'react'

import * as Form from '@/components/Form'
import ModalContent from '@/components/Modal/ModalContent'
import TagSelect from '@/components/TagSelect'
import { useInsertTicket, useUpdateTicket } from '@/hooks/tickets'
import { Ticket } from '@prisma/client'
import { format } from 'date-fns'

type TicketFormProps = {
  opener: ReactNode
  defaultValues?: any
}

export default function TicketForm({ opener, defaultValues }: TicketFormProps) {
  const [showModal, setShowModal] = useState(false)
  const insertTicket = useInsertTicket()
  const updateTicket = useUpdateTicket()

  const onSubmit = async (data: Ticket) => {
    if (data.id) {
      updateTicket.mutate(data, { onSuccess: () => setShowModal(false) })
    } else {
      insertTicket.mutate(data, { onSuccess: () => setShowModal(false) })
    }
  }

  return (
    <>
      <div onClick={() => setShowModal(true)}>{opener}</div>

      {showModal && (
        <ModalContent
          title={defaultValues?.id ? 'Edit Ticket' : 'New Ticket'}
          onClose={() => setShowModal(false)}
        >
          <Form.Form
            onSubmit={onSubmit}
            defaultData={{
              ...defaultValues,
              date: defaultValues?.date
                ? format(defaultValues.date, "yyyy-MM-dd'T'HH:mm:ss")
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
        </ModalContent>
      )}
    </>
  )
}
