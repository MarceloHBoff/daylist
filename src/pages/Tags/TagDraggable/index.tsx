'use client'

import { useState } from 'react'

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
  const [data, setData] = useState(tags)
  const [isDragging, setIsDragging] = useState(false)

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
                    className="flex items-center p-2 mb-4 border-b-2 border-b-zinc-700 group"
                  >
                    <TagIcon color={p.color} />

                    <span className="text-white ml-2">{p.description}</span>

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
