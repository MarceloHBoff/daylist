import { TicketWithTag } from '@/models/ticket'

import Ticket from '../TicketCard'
import TicketContainer from '../TicketContainer'

type TicketDraggableProps = {
  tickets: TicketWithTag[]
}

export default function TicketList({ tickets }: TicketDraggableProps) {
  return (
    <>
      {tickets.map(p => (
        <TicketContainer
          key={p.id}
          tagColor={p.tag?.color}
          className={p.done ? 'opacity-55 saturate-50' : ''}
        >
          <Ticket ticket={p} showDate={false} />
        </TicketContainer>
      ))}
    </>
  )
}
