import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { endOfDay, startOfDay } from 'date-fns'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { initialDate, finalDate } = req.query

  const tickets = await prisma.ticket.findMany({
    where: {
      done: false,
      date: {
        gte: startOfDay(initialDate?.toString() ?? ''),
        lt: endOfDay(finalDate?.toString() ?? '')
      }
    },
    include: { tag: true },
    orderBy: { order: 'asc' }
  })

  return res.status(200).json(tickets)
}
