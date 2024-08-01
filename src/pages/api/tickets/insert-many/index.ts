import type { NextApiRequest, NextApiResponse } from 'next'

import RequestError from '@/error/requestError'
import auth from '@/utils/auth'
import { createTicket } from '@/utils/query'
import { Ticket } from '@prisma/client'
import {
  addDays,
  addWeeks,
  differenceInDays,
  differenceInMonths,
  differenceInWeeks,
  endOfYear,
  setDay
} from 'date-fns'

type Params = {
  type: number
  description: string
  tagId: string
  initialDate?: Date
  finalDate?: Date
  dayOnMonth?: number
  dayOnWeek?: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userId = await auth(req, res)

    const { body } = req

    const {
      type,
      dayOnMonth,
      dayOnWeek,
      initialDate,
      finalDate,
      description,
      tagId
    } = JSON.parse(body) as Params

    const ticket = { description, tagId } as Ticket
    ticket.userId = userId

    const startDate = initialDate ? new Date(initialDate) : new Date()
    const endDate = finalDate ? new Date(finalDate) : endOfYear(new Date())

    if (type === 0) {
      const days = differenceInDays(endDate, startDate)

      for (let index = 0; index < days + 1; index++) {
        const date = addDays(startDate, index + 1)

        await createTicket({ ...ticket, date })
      }
    } else if (type === 1) {
      const days = differenceInMonths(endDate, startDate)

      const date = new Date(new Date().setDate(dayOnMonth ?? 0))

      for (let index = 0; index < days + 1; index++) {
        await createTicket({
          ...ticket,
          date: new Date(date.setMonth(new Date().getMonth() + index))
        })
      }
    } else if (type === 2) {
      const days = differenceInWeeks(endDate, startDate)

      let date = setDay(new Date(), dayOnWeek ?? 0, { weekStartsOn: 0 })

      for (let index = 0; index < days + 1; index++) {
        await createTicket({ ...ticket, date: addWeeks(date, index) })
      }
    }

    return res.status(204).send('')
  } catch (e) {
    const { message, code } = e as RequestError
    return res.status(code ?? 500).json({ message })
  }
}
