import { useEffect, useState } from 'react'
import { UseFormRegister } from 'react-hook-form'

import Select from '@/components/Select'
import { api } from '@/lib/axios'
import { Tag } from '@prisma/client'

type TagSelectProps = {
  register: UseFormRegister<any>
  name: string
}

export default function TagSelect({ register, name }: TagSelectProps) {
  const [tags, setTags] = useState<Tag[]>([])

  useEffect(() => {
    api.get<Tag[]>('/tags').then(p => setTags(p.data))
  }, [])

  if (tags.length === 0) {
    return null
  }

  return <Select name={name} options={tags} register={register} />
}
