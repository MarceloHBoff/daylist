import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string
  console.log(req.query)

  try {
    const ticket = await prisma.ticket.findUniqueOrThrow({ where: { id } })

    ticket.done = false

    const newTicket = await prisma.ticket.create({
      data: { ...ticket, id: undefined }
    })

    return res.status(201).json(newTicket)
  } catch {
    return res.status(404)
  }
}
