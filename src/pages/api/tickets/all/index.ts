import type { NextApiRequest, NextApiResponse } from 'next'

import RequestError from '@/error/requestError'
import { prisma } from '@/lib/prisma'
import { groupBy } from '@/utils/array'
import auth from '@/utils/auth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userId = await auth(req, res)

    const tickets = await prisma.ticket.findMany({
      where: {
        userId,
        done: false,
        tagId: {
          not: null
        }
      },
      include: { tag: true }
    })

    const ticketByTags = groupBy(tickets, p => p.tag?.description ?? '').sort(
      (a, b) => (a.data[0].tag!.order > b.data[0].tag!.order ? 1 : -1)
    )

    return res.status(200).json(ticketByTags)
  } catch (e) {
    const { message, code } = e as RequestError
    return res.status(code ?? 500).json({ message })
  }
}
