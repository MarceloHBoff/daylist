'use client'

import Image from 'next/image'

import { apiPost } from '@/lib/api'
import { Tag } from '@prisma/client'

import TagForm from '../TagForm'

type TagActionsProps = {
  tag: Tag
}

export default function TagActions({ tag }: TagActionsProps) {
  const onDelete = async () => {
    await apiPost(`tags/delete?id=${tag.id}`, {})

    window.location.reload()
  }

  return (
    <div className="flex ml-auto">
      <TagForm
        defaultValues={tag}
        opener={
          <button className="hidden group-hover:block opacity-0 transition-opacity duration-500 group-hover:opacity-100 animate-fade-in">
            <Image width={20} height={20} alt="Edit" src="/edit.svg" />
          </button>
        }
      />
      <button
        className="hidden ml-2 group-hover:block opacity-0 transition-opacity duration-500 group-hover:opacity-100 animate-fade-in"
        onClick={onDelete}
      >
        <Image width={20} height={20} alt="Delete" src="/delete.svg" />
      </button>
    </div>
  )
}
