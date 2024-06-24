import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const tickets = await prisma.ticket.findMany({
    where: { done: false },
    include: { tag: true },
    orderBy: { order: 'asc' }
  })

  return res.status(200).json(tickets)
}
