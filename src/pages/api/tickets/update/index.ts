import type { NextApiRequest, NextApiResponse } from 'next'

import RequestError from '@/error/requestError'
import { supabase, unwrap } from '@/lib/supabase'
import { Ticket } from '@/models/ticket'
import auth from '@/utils/auth'
import { countTicketsOnDay } from '@/utils/query'
import { parseTicketDate, zonedDayRange } from '@/utils/timezone'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userId = await auth(req, res)

    const { body } = req

    const data = JSON.parse(body) as Ticket

    const ticketDb = unwrap<Ticket>(
      await supabase
        .from('tickets')
        .select('*')
        .eq('id', data.id)
        .eq('userId', userId)
        .single()
    )

    if (
      data.date &&
      (!ticketDb.date ||
        zonedDayRange(new Date(ticketDb.date)).gte ===
          zonedDayRange(parseTicketDate(data.date)).gte)
    ) {
      data.order =
        1 + (await countTicketsOnDay(userId, parseTicketDate(data.date)))
    }

    const ticket = unwrap(
      await supabase
        .from('tickets')
        .update({
          description: data.description,
          date: data.date ? parseTicketDate(data.date) : null,
          tagId: data.tagId,
          order: data.order ?? 1
        })
        .eq('id', data.id)
        .eq('userId', userId)
        .select()
        .single()
    )

    return res.status(200).send(ticket)
  } catch (e) {
    const { message, code } = e as RequestError
    return res.status(code ?? 500).json({ message })
  }
}
