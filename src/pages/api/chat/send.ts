import type { NextApiRequest, NextApiResponse } from 'next'

import RequestError from '@/error/requestError'
import { ChatMessage, chatCompletion } from '@/lib/groq'
import { prisma } from '@/lib/prisma'
import auth from '@/utils/auth'
import { runTool, tools } from '@/utils/chatTools'
import { Prisma } from '@prisma/client'
import { format } from 'date-fns'

const MAX_TOOL_ROUNDS = 5

async function buildSystemPrompt(userId: string) {
  const tags = await prisma.tag.findMany({
    where: { userId },
    select: { description: true }
  })

  const today = new Date()
  const tagList = tags.map(t => t.description).join(', ') || '(none)'

  return [
    'You are the Day List assistant, a daily task list app.',
    `Today is ${format(today, 'yyyy-MM-dd')} (${format(today, 'EEEE')}).`,
    "You can create tasks (create_task) and complete today's tasks (complete_task).",
    "When creating a task, convert relative dates (today, tomorrow) to the YYYY-MM-DD format based on today's date.",
    'complete_task only works for tasks scheduled for today.',
    `User's existing tags: ${tagList}. Reuse one of these whenever it makes sense.`,
    'Always reply in English, briefly and objectively. Confirm the actions performed.'
  ].join(' ')
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userId = await auth(req, res)

    const { conversationId, message } = JSON.parse(req.body) as {
      conversationId?: string
      message: string
    }

    if (!message?.trim()) {
      throw new RequestError('Empty message', 400)
    }

    let conversation = conversationId
      ? await prisma.conversation.findFirst({
          where: { id: conversationId, userId }
        })
      : null

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: { userId, title: message.slice(0, 60) }
      })
    }

    await prisma.message.create({
      data: { conversationId: conversation.id, role: 'user', content: message }
    })

    const history = await prisma.message.findMany({
      where: { conversationId: conversation.id },
      orderBy: { createdAt: 'asc' }
    })

    const llmMessages: ChatMessage[] = [
      { role: 'system', content: await buildSystemPrompt(userId) },
      ...history.map(m => ({
        role: m.role as ChatMessage['role'],
        content: m.content,
        ...(m.toolCalls
          ? { tool_calls: m.toolCalls as unknown as ChatMessage['tool_calls'] }
          : {}),
        ...(m.toolCallId ? { tool_call_id: m.toolCallId } : {})
      }))
    ]

    for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
      const reply = await chatCompletion(llmMessages, tools)

      if (reply.tool_calls?.length) {
        await prisma.message.create({
          data: {
            conversationId: conversation.id,
            role: 'assistant',
            content: reply.content ?? '',
            toolCalls: reply.tool_calls as unknown as Prisma.InputJsonValue
          }
        })
        llmMessages.push(reply)

        for (const call of reply.tool_calls) {
          const result = await runTool(
            userId,
            call.function.name,
            call.function.arguments
          )

          await prisma.message.create({
            data: {
              conversationId: conversation.id,
              role: 'tool',
              content: result,
              toolCallId: call.id
            }
          })
          llmMessages.push({
            role: 'tool',
            content: result,
            tool_call_id: call.id
          })
        }
        continue
      }

      const content = reply.content ?? ''
      await prisma.message.create({
        data: {
          conversationId: conversation.id,
          role: 'assistant',
          content
        }
      })

      await prisma.conversation.update({
        where: { id: conversation.id },
        data: { updatedAt: new Date() }
      })

      return res.status(200).json({
        conversationId: conversation.id,
        reply: content
      })
    }

    return res.status(200).json({
      conversationId: conversation.id,
      reply:
        "I couldn't complete the action. Please try rephrasing your request."
    })
  } catch (e) {
    const { message, code } = e as RequestError
    return res.status(code ?? 500).json({ message })
  }
}
