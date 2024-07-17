import { useEffect, useState } from 'react'

import Select from '@/components/Form/Select'
import { apiGet } from '@/lib/api'
import { Tag } from '@prisma/client'

export default function TagSelect() {
  const [tags, setTags] = useState<Tag[]>([])

  useEffect(() => {
    apiGet<Tag[]>('/tags').then(setTags)
  }, [])

  if (tags.length === 0) {
    return null
  }

  return <Select name="tagId" options={tags} />
}
