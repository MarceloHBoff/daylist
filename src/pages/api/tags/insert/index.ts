import type { NextApiRequest, NextApiResponse } from 'next'

import RequestError from '@/error/requestError'
import { prisma } from '@/lib/prisma'
import auth from '@/utils/auth'
import { Tag } from '@prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await auth(req)

    const { body } = req

    const data = JSON.parse(body) as Tag

    data.description = data.description.toLocaleUpperCase()
    data.color = data.color.toLocaleUpperCase()
    data.userId = '9fe83035-7071-4158-9dda-371a6cc61bed'

    const tag = await prisma.tag.create({ data })

    return res.status(201).json(tag)
  } catch (e) {
    const { message, code } = e as RequestError
    return res.status(code).json({ message })
  }
}
