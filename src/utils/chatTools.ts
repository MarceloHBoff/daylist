import { Tool } from '@/lib/groq'
import { prisma } from '@/lib/prisma'
import { createTicket } from '@/utils/query'
import { Ticket } from '@prisma/client'
import { endOfDay, startOfDay } from 'date-fns'

const DEFAULT_TAG_COLOR = '#3B82F6'

export const tools: Tool[] = [
  {
    type: 'function',
    function: {
      name: 'create_task',
      description:
        "Creates a new task (ticket) in the user's list. Use it when the user asks to add/create a task.",
      parameters: {
        type: 'object',
        properties: {
          date: {
            type: 'string',
            description:
              'Task date in YYYY-MM-DD format. Resolve expressions like "today" and "tomorrow" to the absolute date based on the provided current date.'
          },
          description: {
            type: 'string',
            description: 'Task description/title.'
          },
          tag: {
            type: 'string',
            description:
              'Name of the task tag/category. Prefer reusing one of the existing tags provided.'
          }
        },
        required: ['date', 'description', 'tag']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'complete_task',
      description:
        "Marks a TODAY's task as completed, searching by description. Only works for today's tasks.",
      parameters: {
        type: 'object',
        properties: {
          description: {
            type: 'string',
            description: "Text identifying today's task to be completed."
          }
        },
        required: ['description']
      }
    }
  }
]

async function resolveTagId(userId: string, tagName: string) {
  const name = tagName.trim().toLocaleUpperCase()

  const existing = await prisma.tag.findFirst({
    where: { userId, description: name }
  })

  if (existing) return existing.id

  const created = await prisma.tag.create({
    data: { description: name, color: DEFAULT_TAG_COLOR, userId }
  })

  return created.id
}

async function createTask(
  userId: string,
  args: { date: string; description: string; tag: string }
) {
  if (!args.date || !args.description || !args.tag) {
    return 'Error: date, description and tag are required to create the task.'
  }

  const tagId = await resolveTagId(userId, args.tag)

  const ticket = await createTicket({
    description: args.description,
    date: new Date(args.date) as unknown as Date,
    tagId,
    userId
  } as Ticket)

  return `Task created successfully: "${ticket.description}" for ${args.date} with the tag ${args.tag.toLocaleUpperCase()}.`
}

async function completeTask(userId: string, args: { description: string }) {
  const now = new Date()

  const todays = await prisma.ticket.findMany({
    where: {
      userId,
      done: false,
      date: { gte: startOfDay(now), lt: endOfDay(now) }
    },
    orderBy: { order: 'asc' }
  })

  const query = (args.description ?? '').trim().toLocaleLowerCase()
  const matches = todays.filter(
    t =>
      t.description.toLocaleLowerCase().includes(query) ||
      query.includes(t.description.toLocaleLowerCase())
  )

  if (matches.length === 0) {
    const list = todays.map(t => `- ${t.description}`).join('\n')
    return todays.length
      ? `No task for today matches "${args.description}". Today's tasks:\n${list}`
      : 'There are no pending tasks for today.'
  }

  if (matches.length > 1) {
    const list = matches.map(t => `- ${t.description}`).join('\n')
    return `More than one task matches "${args.description}". Ask the user to be more specific:\n${list}`
  }

  const target = matches[0]
  await prisma.ticket.update({
    where: { id: target.id, userId },
    data: { done: true }
  })

  return `Task completed: "${target.description}".`
}

export async function runTool(
  userId: string,
  name: string,
  rawArgs: string
): Promise<string> {
  let args: Record<string, string> = {}
  try {
    args = JSON.parse(rawArgs || '{}')
  } catch {
    return `Error: invalid arguments for the ${name} tool.`
  }

  try {
    if (name === 'create_task') {
      return await createTask(
        userId,
        args as { date: string; description: string; tag: string }
      )
    }
    if (name === 'complete_task') {
      return await completeTask(userId, args as { description: string })
    }
    return `Error: unknown tool ${name}.`
  } catch (e) {
    const message = (e as { message?: string })?.message ?? 'unexpected error'
    return `Error running ${name}: ${message}`
  }
}
