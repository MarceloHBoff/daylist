import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { Ticket } from '@prisma/client'
import { startOfDay } from 'date-fns'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req

  const data = body as Ticket

  const ticket = await prisma.ticket.update({
    data: {
      description: data.description,
      date: startOfDay(data.date ?? ''),
      tagId: data.tagId
    },
    where: { id: data.id }
  })

  return res.status(200).send(ticket)
}
