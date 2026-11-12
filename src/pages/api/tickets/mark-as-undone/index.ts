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
    const id = req.query.id as string

    const ticket = unwrap(
      await supabase
        .from('tickets')
        .update({ done: false })
        .eq('id', id)
        .eq('userId', userId)
        .select()
        .single()
    )

    return res.status(200).json(ticket)
  } catch (e) {
    const { message, code } = e as RequestError
    return res.status(code ?? 500).json({ message })
  }
}
