export type Tag = {
  id: string
  description: string
  color: string
  createdAt: Date
  order: number
  userId: string
}

export type Ticket = {
  id: string
  description: string
  done: boolean
  date: Date | null
  createdAt: Date
  order: number
  userId: string
  tagId: string | null
}

export type TicketWithTag = Ticket & { tag: Tag | null }
export type TagWithTickets = Tag & { ticket: Ticket[] }
