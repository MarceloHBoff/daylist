'use client'

import { ReactNode, useState } from 'react'

import * as Form from '@/components/Form'
import ModalContent from '@/components/Modal/ModalContent'
import { useInsertTag, useUpdateTag } from '@/hooks/tags'
import { Tag } from '@prisma/client'

type TagFormProps = {
  opener: ReactNode
  defaultValues?: any
  onSuccess?: () => void
}

export default function TagForm({ opener, defaultValues, onSuccess }: TagFormProps) {
  const [showModal, setShowModal] = useState(false)
  const insertTag = useInsertTag()
  const updateTag = useUpdateTag()

  const onSubmit = (data: Tag) => {
    setShowModal(false)
    if (data.id) {
      updateTag.mutate(data, { onSuccess })
    } else {
      insertTag.mutate(data, { onSuccess })
    }
  }

  return (
    <>
      <div onClick={() => setShowModal(true)}>{opener}</div>

      {showModal && (
        <ModalContent title="New Tag" onClose={() => setShowModal(false)}>
          <Form.Form
            onSubmit={onSubmit}
            defaultData={{ color: '#000000', ...defaultValues }}
          >
            <div className="flex">
              <Form.Input name="description" autoComplete="off" />

              <Form.Input
                className="ml-2 h-16 w-60 py-2"
                name="color"
                type="color"
              />
            </div>

            <Form.Submit />
          </Form.Form>
        </ModalContent>
      )}
    </>
  )
}
