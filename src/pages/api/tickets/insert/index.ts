import type { NextApiRequest, NextApiResponse } from 'next'

import { createTicket } from '@/utils/query'
import { Ticket } from '@prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req

  const data = JSON.parse(body) as Ticket

  const ticket = await createTicket(data)

  return res.status(201).json(ticket)
}
