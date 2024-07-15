import { useEffect, useState } from 'react'

import Select from '@/components/Form/Select'
import { api } from '@/lib/axios'
import { Tag } from '@prisma/client'

export default function TagSelect() {
  const [tags, setTags] = useState<Tag[]>([])

  useEffect(() => {
    api.get<Tag[]>('/tags').then(p => setTags(p.data))
  }, [])

  if (tags.length === 0) {
    return null
  }

  return <Select name="tagId" options={tags} />
}
