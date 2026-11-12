import type { NextApiRequest, NextApiResponse } from 'next'

import RequestError from '@/error/requestError'
import { supabase, unwrap } from '@/lib/supabase'
import { Tag } from '@/models/ticket'
import auth from '@/utils/auth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userId = await auth(req, res)

    const { body } = req

    const data = JSON.parse(body) as Tag

    data.description = data.description.toLocaleUpperCase()
    data.color = data.color.toLocaleUpperCase()
    data.userId = userId

    const tag = unwrap(
      await supabase.from('tags').insert(data).select().single()
    )

    return res.status(201).json(tag)
  } catch (e) {
    const { message, code } = e as RequestError
    return res.status(code ?? 500).json({ message })
  }
}
