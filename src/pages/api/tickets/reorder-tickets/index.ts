import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'
import { groupBy } from '@/utils/array'
import { getDayOfYear } from 'date-fns'

type Params = {
  initialDate: Date
  finalDate: Date
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req

  const { initialDate, finalDate } = JSON.parse(body) as Params

  try {
    const tickets = await prisma.ticket.findMany({
      where: {
        date: {
          gte: new Date(
            new Date(initialDate!.toString()).setUTCHours(0, 0, 0, 0)
          ),
          lt: new Date(new Date(finalDate!.toString()).setUTCHours(24, 0, 0, 0))
        },
        done: false
      }
    })

    const ticketsByDate = groupBy(tickets, p => getDayOfYear(new Date(p.date!)))
    for await (const ticketByDate of ticketsByDate) {
      let order = 1

      const sorted = ticketByDate.data.sort((a, b) =>
        a.order > b.order ? 1 : -1
      )

      for await (const ticket of sorted) {
        await prisma.ticket.update({
          data: { order },
          where: { id: ticket.id }
        })
        order++
      }
    }

    return res.status(204).send('')
  } catch {
    return res.status(404).send('')
  }
}
