import type { NextApiRequest, NextApiResponse } from 'next'

import RequestError from '@/error/requestError'
import { supabase, unwrap } from '@/lib/supabase'
import { Ticket } from '@/models/ticket'
import auth from '@/utils/auth'
import { countTicketsOnDay } from '@/utils/query'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userId = await auth(req, res)

    const id = req.query.id as string

    const { id: _id, ...ticket } = unwrap<Ticket>(
      await supabase
        .from('tickets')
        .select('*')
        .eq('id', id)
        .eq('userId', userId)
        .single()
    )
    ticket.done = false

    if (ticket.date) {
      ticket.order = 1 + (await countTicketsOnDay(userId, ticket.date))
    }

    const newTicket = unwrap(
      await supabase.from('tickets').insert(ticket).select().single()
    )

    return res.status(201).json(newTicket)
  } catch (e) {
    const { message, code } = e as RequestError
    return res.status(code ?? 500).json({ message })
  }
}
