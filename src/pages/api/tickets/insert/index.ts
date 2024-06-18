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

  data.done = false
  data.userId = '7eb9f4e9-7088-4fac-9683-49e82259678e'
  data.date = startOfDay(data.date ?? '')

  const ticket = await prisma.ticket.create({ data: body })

  return res.status(201).json(ticket)
}
