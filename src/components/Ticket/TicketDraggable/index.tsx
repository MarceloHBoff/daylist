'use client'

import { useEffect, useState } from 'react'

import { apiPost } from '@/lib/api'
import { TicketWithTag } from '@/models/ticket'
import { reorder } from '@/utils/array'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'

import Ticket from '../TicketCard'

type TicketDraggableProps = {
  tickets: TicketWithTag[]
}

export default function TicketDraggable({ tickets }: TicketDraggableProps) {
  const [data, setData] = useState<TicketWithTag[]>([])
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    setData(tickets.filter(p => !p.done))
  }, [tickets])

  return (
    <DragDropContext
      onDragEnd={async p => {
        setIsDragging(false)

        if (p.destination) {
          setData(reorder(data, p.source.index, p.destination.index))

          await apiPost(
            `/tickets/reorder?id=${p.draggableId}&startIndex=${p.source.index}&endIndex=${p.destination.index}`,
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
            className={`${isDragging && 'mb-28'}`}
          >
            {data.map((p, index) => (
              <Draggable key={p.id} draggableId={p.id} index={index}>
                {(provided, snapshot) => (
                  <article
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`group mx-2 my-3 flex min-h-20 w-full rounded-xl border-2 border-gray-600 bg-zinc-700 p-3 ${
                      snapshot.isDragging && 'border-blue-300'
                    }`}
                  >
                    <Ticket key={p.id} ticket={p} showDate={false} />
                  </article>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
