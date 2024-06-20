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
  data.userId = '7eb9f4e9-7088-4fac-9683-49e82259678e'

  const tag = await prisma.tag.create({ data: body })

  return res.status(201).json(tag)
}
