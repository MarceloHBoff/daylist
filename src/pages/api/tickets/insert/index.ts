import type { NextApiRequest, NextApiResponse } from 'next'

import RequestError from '@/error/requestError'
import { Ticket } from '@/models/ticket'
import auth from '@/utils/auth'
import { createTicket } from '@/utils/query'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userId = await auth(req, res)

    const { body } = req

    const data = JSON.parse(body) as Ticket

    data.userId = userId
    const ticket = await createTicket(data)

    return res.status(201).json(ticket)
  } catch (e) {
    const { message, code } = e as RequestError
    return res.status(code ?? 500).json({ message })
  }
}
