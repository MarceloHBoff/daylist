import { supabase, unwrap } from '@/lib/supabase'
import { Ticket } from '@/models/ticket'

import { parseTicketDate, zonedDayRange } from './timezone'

export async function countTicketsOnDay(userId: string, date: Date) {
  const { gte, lt } = zonedDayRange(date)
  const { count, error } = await supabase
    .from('tickets')
    .select('*', { count: 'exact', head: true })
    .eq('userId', userId)
    .gte('date', gte)
    .lt('date', lt)
  unwrap({ data: null, error })
  return count ?? 0
}

export async function createTicket(data: Ticket) {
  data.done = false
  if (data.date) {
    data.date = parseTicketDate(data.date)
  }

  if (!data.tagId) {
    data.tagId = null
  }

  if (data.date) {
    data.order = 1 + (await countTicketsOnDay(data.userId, data.date))
  }

  return unwrap<Ticket>(
    await supabase.from('tickets').insert(data).select().single()
  )
}
