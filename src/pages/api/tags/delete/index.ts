import type { NextApiRequest, NextApiResponse } from 'next'

import RequestError from '@/error/requestError'
import { prisma } from '@/lib/prisma'
import auth from '@/utils/auth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userId = await auth(req, res)

    const id = req.query.id as string

    await prisma.ticket.updateMany({
      data: { tagId: null },
      where: { userId, tagId: id }
    })

    await prisma.tag.delete({ where: { id, userId } })

    return res.status(204).send('')
  } catch (e) {
    const { message, code } = e as RequestError
    return res.status(code ?? 500).json({ message })
  }
}
