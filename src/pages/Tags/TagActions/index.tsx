'use client'

import Image from 'next/image'

import { useDeleteTag } from '@/hooks/tags'
import { Tag } from '@prisma/client'

import TagForm from '../TagForm'

type TagActionsProps = {
  tag: Tag
}

export default function TagActions({ tag }: TagActionsProps) {
  const deleteTag = useDeleteTag()

  return (
    <div className="ml-auto flex">
      <TagForm
        defaultValues={tag}
        opener={
          <button className="hidden animate-fade-in opacity-0 transition-opacity duration-500 group-hover:block group-hover:opacity-100">
            <Image width={20} height={20} alt="Edit" src="/edit.svg" />
          </button>
        }
      />
      <button
        className="ml-2 hidden animate-fade-in opacity-0 transition-opacity duration-500 group-hover:block group-hover:opacity-100"
        onClick={() => deleteTag.mutate(tag.id)}
      >
        <Image width={20} height={20} alt="Delete" src="/delete.svg" />
      </button>
    </div>
  )
}
