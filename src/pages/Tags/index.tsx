'use client'

import { useRouter } from 'next/navigation'

import RequestError from '@/error/requestError'
import { useTags } from '@/hooks/tags'

import TagDraggable from './TagDraggable'
import TagForm from './TagForm'

export default function Tags() {
  const router = useRouter()
  const { data: tags = [], error, isLoading } = useTags()

  if (error) {
    const { code } = error as unknown as RequestError
    if (code === 401) router.replace('/login')
  }

  return (
    <div className="px-64 pt-28">
      <div className="mb-14 border-b-2 border-b-slate-500 p-2 text-3xl font-bold text-white">
        Tags
      </div>

      <TagDraggable tags={tags} isLoading={isLoading} />

      {!isLoading && (
        <TagForm
          opener={
            <div className="flex cursor-pointer items-center p-2 opacity-80 hover:opacity-100">
              <span className="mr-2 text-2xl text-orange-600">+</span>
              <span className="text-white">Add Tag</span>
            </div>
          }
        />
      )}
    </div>
  )
}
