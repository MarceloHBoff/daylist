import type { NextApiRequest, NextApiResponse } from 'next'

import RequestError from '@/error/requestError'
import { supabase, unwrap } from '@/lib/supabase'
import { Ticket } from '@/models/ticket'
import auth from '@/utils/auth'
import { zonedDayRange } from '@/utils/timezone'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userId = await auth(req, res)

    const date = req.query.date as string

    const { gte, lt } = zonedDayRange(new Date(date))
    const ticketsFromSameDay = unwrap<Ticket[]>(
      await supabase
        .from('tickets')
        .select('*')
        .eq('userId', userId)
        .gte('date', gte)
        .lt('date', lt)
        .order('order')
    )

    ticketsFromSameDay.sort((a, b) => (a.date! > b.date! ? 1 : -1))

    unwrap(
      await supabase
        .from('tickets')
        .upsert(
          ticketsFromSameDay.map((p, index) => ({ ...p, order: index + 1 }))
        )
    )

    return res.status(204).send('')
  } catch (e) {
    const { message, code } = e as RequestError
    return res.status(code ?? 500).json({ message })
  }
}
