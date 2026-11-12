import type { NextApiRequest, NextApiResponse } from 'next'

import RequestError from '@/error/requestError'
import { supabase, unwrap } from '@/lib/supabase'
import auth from '@/utils/auth'
import { zonedDayRange } from '@/utils/timezone'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userId = await auth(req, res)

    const { initialDate } = req.query

    const tickets = unwrap(
      await supabase
        .from('tickets')
        .select('*, tag:tags(*)')
        .eq('userId', userId)
        .eq('done', false)
        .lt(
          'date',
          initialDate
            ? new Date(String(initialDate)).toISOString()
            : zonedDayRange(new Date()).gte
        )
        .order('order')
    )

    return res.status(200).json(tickets)
  } catch (e) {
    const { message, code } = e as RequestError
    return res.status(code ?? 500).json({ message })
  }
}
