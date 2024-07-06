import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { Tag } from '@prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req

  const data = body as Tag

  data.description = data.description.toLocaleUpperCase()
  data.color = data.color.toLocaleUpperCase()
  data.userId = '9fe83035-7071-4158-9dda-371a6cc61bed'

  const tag = await prisma.tag.create({ data: body })

  return res.status(201).json(tag)
}
