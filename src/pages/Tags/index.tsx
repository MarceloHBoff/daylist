import { api } from '@/lib/axios'
import { Tag } from '@prisma/client'
import TagIcon from '@/components/TagIcon'
import Image from 'next/image'
import TagForm from './TagForm'

export default async function Tags() {
  const response = await api.get<Tag[]>('/tags')
  const tags = response.data

  return (
    <main className="w-screen h-screen bg-zinc-800 pt-28 px-64">
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

          <button className="hidden ml-auto group-hover:block opacity-0 transition-opacity duration-500 group-hover:opacity-100 animate-fade-in">
            <Image width={20} height={20} alt="Edit" src="/edit.svg" />
          </button>
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
    </main>
  )
}
