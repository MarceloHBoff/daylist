import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'
import { reorder } from '@/utils/array'
import { getDateFilter } from '@/utils/query'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string
  const startIndex = Number(req.query.startIndex)
  const endIndex = Number(req.query.endIndex)

  try {
    const ticket = await prisma.ticket.findUniqueOrThrow({ where: { id } })

    const ticketsFromSameDay = await prisma.ticket.findMany({
      where: {
        userId: '9fe83035-7071-4158-9dda-371a6cc61bed',
        date: getDateFilter(ticket.date)
      },
      orderBy: { order: 'asc' }
    })

    const newOrderTickets = reorder(ticketsFromSameDay, startIndex, endIndex)

    await prisma.$transaction(
      newOrderTickets.map((p, index) =>
        prisma.ticket.updateMany({
          data: { order: index + 1 },
          where: { id: p.id }
        })
      )
    )

    return res.status(204).send('')
  } catch {
    return res.status(404).send('')
  }
}
