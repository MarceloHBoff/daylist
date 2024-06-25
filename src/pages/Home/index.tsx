import { api } from '@/lib/axios'
import { daysInWeek } from 'date-fns/constants'
import { addDays, getDay, isSameDay, startOfDay } from 'date-fns'
import { TicketWithTag } from '@/models/ticket'
import TicketList from './TicketList'

export default async function Home() {
  const response = await api.get<TicketWithTag[]>('/tickets')
  const tickets = response.data

  const days = new Array(daysInWeek).fill(0).map((_, index) => ({
    key: getDay(addDays(new Date(), index)) + 1,
    date: startOfDay(addDays(new Date(), index))
  }))

  return (
    <main className="w-full h-full bg-zinc-800">
      <div className="flex w-full h-full pt-32">
        <div className="flex w-full h-full p-5 border-t-2 border-gray-700 overflow-x-auto">
          {days.map(p => (
            <TicketList
              key={p.key}
              date={p.date}
              tickets={tickets.filter(t =>
                isSameDay(new Date(t.date ?? ''), p.date)
              )}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
