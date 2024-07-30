import type { NextApiRequest, NextApiResponse } from 'next'

import RequestError from '@/error/requestError'
import { prisma } from '@/lib/prisma'
import auth from '@/utils/auth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await auth(req)

    const id = req.query.id as string

    const ticket = await prisma.ticket.update({
      data: { done: true },
      where: { id, userId: '9fe83035-7071-4158-9dda-371a6cc61bed' }
    })

    return res.status(200).json(ticket)
  } catch (e) {
    const { message, code } = e as RequestError
    return res.status(code).json({ message })
  }
}
