import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'
import { groupBy } from '@/utils/array'

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const tickets = await prisma.ticket.findMany({
    where: {
      userId: '9fe83035-7071-4158-9dda-371a6cc61bed',
      done: false
    },
    include: { tag: true }
  })

  const ticketByTags = groupBy(tickets, p => p.tag?.description ?? '').sort(
    (a, b) => (a.data[0].tag!.order > b.data[0].tag!.order ? 1 : -1)
  )

  return res.status(200).json(ticketByTags)
}
