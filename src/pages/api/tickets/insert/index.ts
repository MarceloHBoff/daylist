import type { NextApiRequest, NextApiResponse } from 'next'

import RequestError from '@/error/requestError'
import auth from '@/utils/auth'
import { createTicket } from '@/utils/query'
import { Ticket } from '@prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await auth(req)

    const { body } = req

    const data = JSON.parse(body) as Ticket

    const ticket = await createTicket(data)

    return res.status(201).json(ticket)
  } catch (e) {
    const { message, code } = e as RequestError
    return res.status(code).json({ message })
  }
}
