import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string

  const ticket = await prisma.ticket.update({
    data: { done: true },
    where: { id, userId: '7eb9f4e9-7088-4fac-9683-49e82259678e' }
  })

  return res.status(200).json(ticket)
}
