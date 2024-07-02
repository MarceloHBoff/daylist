import type { NextApiRequest, NextApiResponse } from 'next'
import { Ticket } from '@prisma/client'
import { createTicket } from '@/utils/query'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req

  const data = body as Ticket

  const ticket = await createTicket(data)

  return res.status(201).json(ticket)
}
