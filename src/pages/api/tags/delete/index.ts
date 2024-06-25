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
      userId: '7eb9f4e9-7088-4fac-9683-49e82259678e',
      tagId: id
    }
  })

  await prisma.tag.delete({ where: { id } })

  return res.status(204).send('')
}
