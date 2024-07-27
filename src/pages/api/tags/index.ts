import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const tags = await prisma.tag.findMany({
    orderBy: { order: 'asc' }
  })

  return res.status(200).json(tags)
}
