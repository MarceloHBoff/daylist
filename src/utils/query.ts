import { prisma } from '@/lib/prisma'
import { Ticket } from '@prisma/client'

export function getDateFilter(date: Date | null) {
  const currentDate = new Date(date ?? '')

  return {
    gte: new Date(currentDate.setUTCHours(0, 0, 0)),
    lt: new Date(currentDate.setUTCHours(23, 59, 59))
  }
}

export async function createTicket(data: Ticket) {
  data.done = false
  if (data.date) {
    data.date = new Date(data.date)
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
