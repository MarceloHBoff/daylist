import type { NextApiRequest, NextApiResponse } from 'next'

import RequestError from '@/error/requestError'
import { supabase, unwrap } from '@/lib/supabase'
import auth from '@/utils/auth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userId = await auth(req, res)

    const { initialDate, finalDate } = req.query

    const tickets = unwrap(
      await supabase
        .from('tickets')
        .select('*, tag:tags(*)')
        .eq('userId', userId)
        .gte('date', new Date(String(initialDate)).toISOString())
        .lt('date', new Date(String(finalDate)).toISOString())
        .order('order')
    )

    return res.status(200).json(tickets)
  } catch (e) {
    const { message, code } = e as RequestError
    return res.status(code ?? 500).json({ message })
  }
}
