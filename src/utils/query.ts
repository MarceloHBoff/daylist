import { prisma } from '@/lib/prisma'
import { Ticket } from '@prisma/client'
import { addDays, startOfDay } from 'date-fns'

export function getDateFilter(date: Date | null) {
  const currentDate = new Date(date ?? '')

  return {
    gte: new Date(currentDate.setUTCHours(0, 0, 0, 0)),
    lt: new Date(currentDate.setUTCHours(24, 0, 0, 0))
  }
}

export async function createTicket(data: Ticket) {
  data.done = false
  data.userId = '9fe83035-7071-4158-9dda-371a6cc61bed'
  if (data.date) {
    data.date = addDays(startOfDay(data.date ?? ''), 1)
  }

  if (!data.tagId) {
    data.tagId = null
  }

  if (data.date) {
    const total = await prisma.ticket.count({
      where: {
        date: getDateFilter(data.date)
      }
    })

    data.order = 1 + total
  }

  return await prisma.ticket.create({ data })
}
