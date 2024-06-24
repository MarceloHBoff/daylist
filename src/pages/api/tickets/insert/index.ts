import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { Ticket } from '@prisma/client'
import { startOfDay } from 'date-fns'
import { getDateFilter } from '@/utils/query'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req

  const data = body as Ticket

  data.done = false
  data.userId = '7eb9f4e9-7088-4fac-9683-49e82259678e'
  data.date = startOfDay(data.date ?? '')

  const total = await prisma.ticket.count({
    where: {
      date: getDateFilter(data.date)
    }
  })

  data.order = 1 + total

  const ticket = await prisma.ticket.create({ data })

  return res.status(201).json(ticket)
}
