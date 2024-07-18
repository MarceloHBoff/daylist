import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'
import { Tag } from '@prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req

  const data = JSON.parse(body) as Tag

  const tag = await prisma.tag.update({ data, where: { id: data.id } })

  return res.status(200).send(tag)
}
