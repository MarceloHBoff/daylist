import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'
import { reorder } from '@/utils/array'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const startIndex = Number(req.query.startIndex)
  const endIndex = Number(req.query.endIndex)

  try {
    const allTags = await prisma.tag.findMany({
      where: {
        userId: '9fe83035-7071-4158-9dda-371a6cc61bed'
      },
      orderBy: { order: 'asc' }
    })

    const newOrderTags = reorder(allTags, startIndex, endIndex)

    await prisma.$transaction(
      newOrderTags.map((p, index) =>
        prisma.tag.updateMany({
          data: { order: index + 1 },
          where: { id: p.id }
        })
      )
    )

    return res.status(204).send('')
  } catch {
    return res.status(404).send('')
  }
}
