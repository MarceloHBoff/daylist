import type { NextApiRequest, NextApiResponse } from 'next'

import RequestError from '@/error/requestError'
import { Ticket } from '@/models/ticket'
import auth from '@/utils/auth'
import { createTicket } from '@/utils/query'
import { zonedDate, zonedParts } from '@/utils/timezone'

type Params = {
  type: number
  time: string
  description: string
  tagId: string
  initialDate?: string
  finalDate?: string
  dayOnMonth?: string
  dayOnWeek?: string
}

const DAY = 86_400_000

const calendarDay = (y: number, m: number, d: number) => Date.UTC(y, m - 1, d)
const toTicketDate = (day: number, hh: number, mm: number) => {
  const c = new Date(day)
  return zonedDate(
    c.getUTCFullYear(),
    c.getUTCMonth() + 1,
    c.getUTCDate(),
    hh,
    mm
  )
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
      time,
      dayOnMonth,
      dayOnWeek,
      initialDate,
      finalDate,
      description,
      tagId
    } = JSON.parse(body) as Params

    const ticket = { description, tagId } as Ticket
    ticket.userId = userId

    const [hh, mm] = time.split(':').map(Number)
    const today = zonedParts(new Date())
    const parseDay = (value?: string) =>
      value
        ? calendarDay(
            ...(value.split('-').map(Number) as [number, number, number])
          )
        : null

    const startDay =
      parseDay(initialDate) ?? calendarDay(today.y, today.m, today.d)
    const endDay = parseDay(finalDate) ?? calendarDay(today.y, 12, 31)

    const dates: Date[] = []

    if (type === 0 || type === 1) {
      for (let day = startDay; day <= endDay; day += DAY) {
        const weekday = new Date(day).getUTCDay()
        if (type === 1 && (weekday === 0 || weekday === 6)) continue
        dates.push(toTicketDate(day, hh, mm))
      }
    } else if (type === 2) {
      for (let m = today.m; m <= 12; m++) {
        dates.push(
          toTicketDate(calendarDay(today.y, m, Number(dayOnMonth)), hh, mm)
        )
      }
    } else if (type === 3) {
      const todayDay = calendarDay(today.y, today.m, today.d)
      const first =
        todayDay + (Number(dayOnWeek) - new Date(todayDay).getUTCDay()) * DAY
      for (
        let day = first;
        day <= calendarDay(today.y, 12, 31);
        day += 7 * DAY
      ) {
        dates.push(toTicketDate(day, hh, mm))
      }
    }

    for (const date of dates) {
      await createTicket({ ...ticket, date })
    }

    return res.status(204).send('')
  } catch (e) {
    const { message, code } = e as RequestError
    return res.status(code ?? 500).json({ message })
  }
}
