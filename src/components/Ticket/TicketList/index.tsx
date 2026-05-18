import { TicketWithTag } from '@/models/ticket'

import Ticket from '../TicketCard'
import TicketContainer from '../TicketContainer'

type TicketDraggableProps = {
  tickets: TicketWithTag[]
}

export default function TicketList({ tickets }: TicketDraggableProps) {
  return (
    <>
      {tickets
        .filter(p => !p.done)
        .map(p => (
          <TicketContainer key={p.id}>
            <Ticket ticket={p} showDate={false} />
          </TicketContainer>
        ))}
    </>
  )
}
