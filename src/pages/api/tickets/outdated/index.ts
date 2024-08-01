import type { NextApiRequest, NextApiResponse } from 'next'

import RequestError from '@/error/requestError'
import { prisma } from '@/lib/prisma'
import auth from '@/utils/auth'
import { startOfDay } from 'date-fns'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userId = await auth(req, res)

    const tickets = await prisma.ticket.findMany({
      where: {
        userId,
        done: false,
        date: {
          lt: startOfDay(new Date())
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
