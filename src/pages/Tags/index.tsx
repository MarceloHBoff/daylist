import { apiGet } from '@/lib/api'
import { Tag } from '@prisma/client'

import TagDraggable from './TagDraggable'
import TagForm from './TagForm'

export default async function Tags() {
  const tags = await apiGet<Tag[]>('/tags', { cache: 'no-cache' })

  return (
    <div className="pt-28 px-64">
      <div className="text-white font-bold text-3xl p-2 mb-14 border-b-2 border-b-slate-500">
        Tags
      </div>

      <TagDraggable tags={tags} />

      <TagForm
        opener={
          <div className="flex items-center p-2 opacity-80 hover:opacity-100 cursor-pointer">
            <span className="text-orange-600 mr-2 text-2xl">+</span>
            <span className="text-white">Add Tag</span>
          </div>
        }
      />
    </div>
  )
}
