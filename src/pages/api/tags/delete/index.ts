import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string

  await prisma.ticket.updateMany({
    data: { tagId: null },
    where: {
      userId: '9fe83035-7071-4158-9dda-371a6cc61bed',
      tagId: id
    }
  })

  await prisma.tag.delete({ where: { id } })

  return res.status(204).send('')
}
