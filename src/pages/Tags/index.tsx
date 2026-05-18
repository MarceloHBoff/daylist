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
      <div className="mb-14 border-b border-neutral-800 p-2 text-3xl font-bold text-neutral-50">
        Tags
      </div>

      <TagDraggable tags={tags} isLoading={isLoading} />

      {!isLoading && (
        <TagForm
          opener={
            <div className="group/add mt-2 flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-neutral-700 bg-neutral-900/40 px-3 py-2 text-neutral-300 transition-all hover:border-sky-400/60 hover:bg-sky-400/10 hover:text-sky-200 hover:shadow-[0_0_0_1px_rgba(56,189,248,0.15)]">
              <span className="text-lg font-bold text-sky-400 transition-transform group-hover/add:scale-110">
                +
              </span>
              <span className="text-sm font-medium">Add Tag</span>
            </div>
          }
        />
      )}
    </div>
  )
}
