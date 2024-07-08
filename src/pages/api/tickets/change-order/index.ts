import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { getDateFilter } from '@/utils/query'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string
  const order = Number(req.query.order)

  try {
    const ticket = await prisma.ticket.findUniqueOrThrow({ where: { id } })

    const ticketsFromSameDay = await prisma.ticket.findMany({
      where: {
        id: {
          not: ticket.id
        },
        date: getDateFilter(ticket.date)
      },
      orderBy: { order: 'asc' }
    })

    ticketsFromSameDay.splice(order - 1, 0, ticket)

    let newOrder = 1
    for await (const ticket of ticketsFromSameDay) {
      await prisma.ticket.updateMany({
        data: { order: newOrder },
        where: { id: ticket.id }
      })
      newOrder++
    }

    return res.status(204).send('')
  } catch {
    return res.status(404).send('')
  }
}
