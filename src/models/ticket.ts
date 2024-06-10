import { Prisma } from '@prisma/client'

export type TicketWithTag = Prisma.TicketGetPayload<{ include: { tag: true } }>
