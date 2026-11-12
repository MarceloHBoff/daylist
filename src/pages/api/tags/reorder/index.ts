import type { NextApiRequest, NextApiResponse } from 'next'

import RequestError from '@/error/requestError'
import { supabase, unwrap } from '@/lib/supabase'
import { reorder } from '@/utils/array'
import auth from '@/utils/auth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userId = await auth(req, res)

    const startIndex = Number(req.query.startIndex)
    const endIndex = Number(req.query.endIndex)

    const allTags = unwrap(
      await supabase
        .from('tags')
        .select('*')
        .eq('userId', userId)
        .order('order')
    )

    const newOrderTags = reorder(allTags, startIndex, endIndex)

    unwrap(
      await supabase
        .from('tags')
        .upsert(newOrderTags.map((p, index) => ({ ...p, order: index + 1 })))
    )

    return res.status(204).send('')
  } catch (e) {
    const { message, code } = e as RequestError
    return res.status(code ?? 500).json({ message })
  }
}
