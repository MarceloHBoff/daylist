'use client'

import { useEffect, useState } from 'react'

import { useReorderTickets } from '@/hooks/tickets'
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
  const reorderTickets = useReorderTickets()

  useEffect(() => {
    setData(tickets.filter(p => !p.done))
  }, [tickets])

  return (
    <DragDropContext
      onDragEnd={async p => {
        setIsDragging(false)

        if (p.destination) {
          setData(reorder(data, p.source.index, p.destination.index))

          reorderTickets.mutate({
            id: p.draggableId,
            startIndex: p.source.index,
            endIndex: p.destination.index
          })
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
                    className={`group mx-2 my-3 flex w-full rounded-xl border bg-gradient-to-br from-zinc-800 to-zinc-900/80 p-4 shadow-sm transition-all duration-200 ${
                      snapshot.isDragging
                        ? 'border-blue-400 shadow-lg shadow-blue-500/20'
                        : 'border-zinc-700/70 hover:border-zinc-600 hover:shadow-md'
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
