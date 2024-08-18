import type { NextApiRequest, NextApiResponse } from 'next'

import RequestError from '@/error/requestError'
import { prisma } from '@/lib/prisma'
import auth from '@/utils/auth'
import { getDateFilter } from '@/utils/query'
import { Ticket } from '@prisma/client'
import { isSameDay } from 'date-fns'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userId = await auth(req, res)

    const { body } = req

    const data = JSON.parse(body) as Ticket

    const ticketDb = await prisma.ticket.findFirstOrThrow({
      where: { id: data.id, userId }
    })

    if (
      data.date &&
      (!ticketDb.date ||
        isSameDay(new Date(ticketDb.date ?? ''), new Date(data.date ?? '')))
    ) {
      const total = await prisma.ticket.count({
        where: {
          userId,
          date: getDateFilter(data.date)
        }
      })

      data.order = 1 + total
    }

    const ticket = await prisma.ticket.update({
      data: {
        description: data.description,
        date: data.date ? new Date(data.date) : null,
        tagId: data.tagId,
        order: data.order ?? 1
      },
      where: { id: data.id }
    })

    return res.status(200).send(ticket)
  } catch (e) {
    const { message, code } = e as RequestError
    return res.status(code ?? 500).json({ message })
  }
}
