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
    await auth(req)

    const id = req.query.id as string

    const ticket = await prisma.ticket.findUniqueOrThrow({ where: { id } })
    ticket.done = false

    if (ticket.date) {
      const total = await prisma.ticket.count({
        where: {
          date: getDateFilter(ticket.date)
        }
      })
      ticket.order = total + 1
    }

    const newTicket = await prisma.ticket.create({
      data: { ...ticket, id: undefined }
    })

    return res.status(201).json(newTicket)
  } catch (e) {
    const { message, code } = e as RequestError
    return res.status(code).json({ message })
  }
}
