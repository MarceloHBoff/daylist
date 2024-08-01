import type { NextApiRequest, NextApiResponse } from 'next'

import RequestError from '@/error/requestError'
import { prisma } from '@/lib/prisma'
import auth from '@/utils/auth'
import { endOfDay, startOfDay } from 'date-fns'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userId = await auth(req, res)

    const { initialDate, finalDate } = req.query

    const tickets = await prisma.ticket.findMany({
      where: {
        userId,
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
  } catch (e) {
    const { message, code } = e as RequestError
    return res.status(code ?? 500).json({ message })
  }
}
