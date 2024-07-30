'use client'

import { useRouter } from 'next/navigation'

import { useEffect, useState } from 'react'

import RequestError from '@/error/requestError'
import { apiGet } from '@/lib/api'
import { Tag } from '@prisma/client'

import TagDraggable from './TagDraggable'
import TagForm from './TagForm'

export default function Tags() {
  const router = useRouter()
  const [tags, setTags] = useState<Tag[]>([])

  useEffect(() => {
    apiGet<Tag[]>('/tags', { cache: 'no-cache' })
      .then(setTags)
      .catch((e: RequestError) => {
        if (e.code === 401) {
          router.replace('/login')
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="px-64 pt-28">
      <div className="mb-14 border-b-2 border-b-slate-500 p-2 text-3xl font-bold text-white">
        Tags
      </div>

      <TagDraggable tags={tags} />

      <TagForm
        opener={
          <div className="flex cursor-pointer items-center p-2 opacity-80 hover:opacity-100">
            <span className="mr-2 text-2xl text-orange-600">+</span>
            <span className="text-white">Add Tag</span>
          </div>
        }
      />
    </div>
  )
}
