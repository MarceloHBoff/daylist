import type { NextApiRequest, NextApiResponse } from 'next'

import RequestError from '@/error/requestError'
import { prisma } from '@/lib/prisma'
import { reorder } from '@/utils/array'
import auth from '@/utils/auth'
import { getDateFilter } from '@/utils/query'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await auth(req)

    const id = req.query.id as string
    const startIndex = Number(req.query.startIndex)
    const endIndex = Number(req.query.endIndex)

    const ticket = await prisma.ticket.findUniqueOrThrow({ where: { id } })

    const ticketsFromSameDay = await prisma.ticket.findMany({
      where: {
        userId: '9fe83035-7071-4158-9dda-371a6cc61bed',
        date: getDateFilter(ticket.date),
        done: false
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
  } catch (e) {
    const { message, code } = e as RequestError
    return res.status(code).json({ message })
  }
}
