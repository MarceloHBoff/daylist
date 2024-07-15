'use client'

import { ReactNode } from 'react'

import * as Form from '@/components/Form'
import Modal from '@/components/Modal'
import { api } from '@/lib/axios'
import { Tag } from '@prisma/client'

type TagFormProps = {
  opener: ReactNode
  defaultValues?: any
}

export default function TagForm({ opener, defaultValues }: TagFormProps) {
  const onSubmit = async (data: Tag) => {
    if (data.id) {
      await api.post('tags/update', { ...data })
    } else {
      await api.post('tags/insert', { ...data })
    }
    window.location.reload()
  }

  return (
    <Modal title="New Tag" opener={opener}>
      <Form.Form onSubmit={onSubmit} defaultData={defaultValues}>
        <div className="flex">
          <Form.Input name="description" autoComplete="off" />

          <Form.Input
            className="ml-2 w-60 h-16 py-2"
            name="color"
            type="color"
          />
        </div>

        <Form.Submit />
      </Form.Form>
    </Modal>
  )
}
