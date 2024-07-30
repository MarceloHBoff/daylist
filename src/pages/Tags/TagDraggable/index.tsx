'use client'

import { useEffect, useState } from 'react'

import TagIcon from '@/components/TagIcon'
import { apiPost } from '@/lib/api'
import { reorder } from '@/utils/array'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { Tag } from '@prisma/client'

import TagActions from '../TagActions'

type TagDraggableProps = {
  tags: Tag[]
}

export default function TagDraggable({ tags }: TagDraggableProps) {
  const [data, setData] = useState<Tag[]>([])
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    setData(tags)
  }, [tags])

  return (
    <DragDropContext
      onDragEnd={async p => {
        setIsDragging(false)

        if (p.destination) {
          setData(reorder(data, p.source.index, p.destination.index))

          await apiPost(
            `/tags/reorder?startIndex=${p.source.index}&endIndex=${p.destination.index}`,
            {}
          )
        }
      }}
      onDragStart={() => setIsDragging(true)}
    >
      <Droppable droppableId="droppable">
        {provided => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`${isDragging && 'mb-16'}`}
          >
            {data.map((p, index) => (
              <Draggable key={p.id} draggableId={p.id} index={index}>
                {provided => (
                  <div
                    key={p.id}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="group mb-4 flex items-center border-b-2 border-b-zinc-700 p-2"
                  >
                    <TagIcon color={p.color} />

                    <span className="ml-2 text-white">{p.description}</span>

                    <TagActions tag={p} />
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
