import { api } from '@/lib/axios'
import { Tag } from '@prisma/client'
import { useEffect, useState } from 'react'
import { UseFormRegister } from 'react-hook-form'

type TagSelectProps = {
  register: UseFormRegister<any>
  name: string
}

export default function TagSelect({ register, name }: TagSelectProps) {
  const [tags, setTags] = useState<Tag[]>([])

  useEffect(() => {
    api.get<Tag[]>('/tags').then(p => setTags(p.data))
  }, [])

  console.log(tags)

  return (
    <select
      {...register(name)}
      className="w-full border-2 border-gray-600 rounded-xl p-4 bg-transparent outline-none focus:border-gray-500"
    >
      <option className="bg-gray-700" />

      {tags.map(p => (
        <option key={p.id} value={p.id} className="bg-gray-700">
          {p.description}
        </option>
      ))}
    </select>
  )
}
