import type { NextApiRequest, NextApiResponse } from 'next'

import RequestError from '@/error/requestError'
import { prisma } from '@/lib/prisma'
import auth from '@/utils/auth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userId = await auth(req, res)

    const conversationId = req.query.conversationId as string

    if (!conversationId) {
      return res.status(200).json([])
    }

    const conversation = await prisma.conversation.findFirst({
      where: { id: conversationId, userId },
      select: { id: true }
    })

    if (!conversation) {
      throw new RequestError('Conversation not found', 404)
    }

    const messages = await prisma.message.findMany({
      where: {
        conversationId,
        role: { in: ['user', 'assistant'] },
        content: { not: '' }
      },
      select: { id: true, role: true, content: true, createdAt: true },
      orderBy: { createdAt: 'asc' }
    })

    return res.status(200).json(messages)
  } catch (e) {
    const { message, code } = e as RequestError
    return res.status(code ?? 500).json({ message })
  }
}
