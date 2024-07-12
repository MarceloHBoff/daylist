import TagIcon from '@/components/TagIcon'
import { api } from '@/lib/axios'
import { Tag } from '@prisma/client'

import Container from '../Container'

import TagActions from './TagActions'
import TagForm from './TagForm'


export default async function Tags() {
  const response = await api.get<Tag[]>('/tags')
  const tags = response.data

  return (
    <Container path="/tags">
      <div className="pt-28 px-64">
        <div className="text-white font-bold text-3xl p-2 mb-14 border-b-2 border-b-slate-500">
          Tags
        </div>

        {tags.map(p => (
          <div
            key={p.id}
            className="flex items-center p-2 mb-4 border-b-2 border-b-zinc-700 group"
          >
            <TagIcon color={p.color} />

            <span className="text-white ml-2">{p.description}</span>

            <TagActions tag={p} />
          </div>
        ))}

        <TagForm
          opener={
            <div className="flex items-center p-2 opacity-80 hover:opacity-100 cursor-pointer">
              <span className="text-orange-600 mr-2 text-2xl">+</span>
              <span className="text-white">Add Tag</span>
            </div>
          }
        />
      </div>
    </Container>
  )
}
