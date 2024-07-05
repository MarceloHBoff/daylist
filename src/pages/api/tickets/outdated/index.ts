import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { startOfDay } from 'date-fns'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const tickets = await prisma.ticket.findMany({
    where: {
      userId: '7eb9f4e9-7088-4fac-9683-49e82259678e',
      done: false,
      date: {
        lt: startOfDay(new Date())
      }
    },
    include: { tag: true },
    orderBy: { order: 'asc' }
  })

  return res.status(200).json(tickets)
}
