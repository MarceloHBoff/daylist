import { prisma } from '@/lib/prisma'
import { Ticket } from '@prisma/client'
import { startOfDay } from 'date-fns'

export function getDateFilter(date: Date | null) {
  const currentDate = new Date(date ?? '')

  return {
    gte: new Date(currentDate.setUTCHours(0, 0, 0, 0)),
    lt: new Date(currentDate.setUTCHours(24, 0, 0, 0))
  }
}

export async function createTicket(data: Ticket) {
  data.done = false
  data.userId = '7eb9f4e9-7088-4fac-9683-49e82259678e'
  data.date = startOfDay(data.date ?? '')

  if (!data.tagId) {
    data.tagId = null
  }

  const total = await prisma.ticket.count({
    where: {
      date: getDateFilter(data.date)
    }
  })

  data.order = 1 + total

  return await prisma.ticket.create({ data })
}
