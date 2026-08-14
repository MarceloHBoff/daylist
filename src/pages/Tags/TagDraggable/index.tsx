'use client'

import { useState } from 'react'

import Skeleton from '@/components/Skeleton'
import TagBadge from '@/components/TagBadge'
import { apiPost } from '@/lib/api'
import { TagWithTickets } from '@/models/ticket'
import { reorder } from '@/utils/array'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'

import TagActions from '../TagActions'

type TagDraggableProps = {
  tags: TagWithTickets[]
  isLoading?: boolean
}

export default function TagDraggable({
  tags = [],
  isLoading
}: TagDraggableProps) {
  const [data, setData] = useState<TagWithTickets[]>(tags)
  const [isDragging, setIsDragging] = useState(false)
  const [previousTags, setPreviousTags] = useState(tags)

  if (previousTags !== tags) {
    setPreviousTags(tags)
    setData(tags)
  }

  if (isLoading) {
    return <Skeleton type="tag" count={6} />
  }

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
                {providedItem => (
                  <div
                    key={p.id}
                    ref={providedItem.innerRef}
                    {...providedItem.draggableProps}
                    {...providedItem.dragHandleProps}
                    className="group mb-4 flex items-center border-b border-neutral-800 p-2"
                  >
                    <TagBadge
                      color={p.color}
                      description={p.description}
                      showIcon
                    />

                    <span className="ml-4 text-xs text-neutral-500">
                      {p.ticket.filter(p => !p.done).length}
                    </span>

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
