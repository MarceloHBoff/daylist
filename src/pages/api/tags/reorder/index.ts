import type { NextApiRequest, NextApiResponse } from 'next'

import RequestError from '@/error/requestError'
import { prisma } from '@/lib/prisma'
import { reorder } from '@/utils/array'
import auth from '@/utils/auth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userId = await auth(req, res)

    const startIndex = Number(req.query.startIndex)
    const endIndex = Number(req.query.endIndex)

    const allTags = await prisma.tag.findMany({
      where: { userId },
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
  } catch (e) {
    const { message, code } = e as RequestError
    return res.status(code ?? 500).json({ message })
  }
}
