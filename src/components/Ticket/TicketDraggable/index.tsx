'use client'

import { useState } from 'react'

import { apiPost } from '@/lib/api'
import { TicketWithTag } from '@/models/ticket'
import { reorder } from '@/utils/array'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'

import Ticket from '../TicketCard'

type TicketDraggableProps = {
  tickets: TicketWithTag[]
}

export default function TicketDraggable({ tickets }: TicketDraggableProps) {
  const [data, setData] = useState(tickets.filter(p => !p.done))
  const [isDragging, setIsDragging] = useState(false)

  return (
    <DragDropContext
      onDragEnd={async p => {
        setIsDragging(false)

        if (p.destination) {
          setData(reorder(data, p.source.index, p.destination.index))

          const order = p.destination.index + 1
          await apiPost(
            `/tickets/change-order?id=${p.draggableId}&order=${order}`,
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
                    className={`bg-zinc-700 mx-2 my-3 p-3 w-full min-h-20 rounded-xl border-2 border-gray-600 flex group ${
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
