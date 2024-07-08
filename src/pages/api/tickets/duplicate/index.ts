import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { getDateFilter } from '@/utils/query'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string

  try {
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
  } catch {
    return res.status(404)
  }
}
