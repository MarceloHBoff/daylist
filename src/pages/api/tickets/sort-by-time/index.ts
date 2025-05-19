import type { NextApiRequest, NextApiResponse } from 'next'

import RequestError from '@/error/requestError'
import { prisma } from '@/lib/prisma'
import auth from '@/utils/auth'
import { getDateFilter } from '@/utils/query'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userId = await auth(req, res)

    const date = req.query.date as string

    const ticketsFromSameDay = await prisma.ticket.findMany({
      where: {
        userId,
        date: getDateFilter(new Date(date)),
        done: false
      },
      orderBy: { order: 'asc' }
    })

    ticketsFromSameDay.sort((a, b) => (a.date! > b.date! ? 1 : -1))

    await prisma.$transaction(
      ticketsFromSameDay.map((p, index) =>
        prisma.ticket.updateMany({
          data: { order: index + 1 },
          where: { id: p.id }
        })
      )
    )

    return res.status(204).send('')
  } catch (e) {
    const { message, code } = e as RequestError
    return res.status(code ?? 500).json({ message })
  }
}
