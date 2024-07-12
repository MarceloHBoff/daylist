import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const tickets = await prisma.ticket.findMany({
    where: {
      userId: '9fe83035-7071-4158-9dda-371a6cc61bed',
      done: false
    },
    include: { tag: true },
    orderBy: { date: 'asc' }
  })

  return res.status(200).json(tickets)
}
