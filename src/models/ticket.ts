import { Prisma } from '@prisma/client'

export type TicketWithTag = Prisma.TicketGetPayload<{ include: { tag: true } }>
export type TagWithTickets = Prisma.TagGetPayload<{ include: { ticket: true } }>
