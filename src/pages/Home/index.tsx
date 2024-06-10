import { api } from '@/lib/axios'
import CardList from '@/components/CardList'
import { daysInWeek } from 'date-fns/constants'
import {
  addDays,
  format,
  getDay,
  isSameDay,
  isThisWeek,
  isToday,
  isTomorrow
} from 'date-fns'
import { TicketWithTag } from '@/models/ticket'

export default async function Home() {
  const response = await api.get<TicketWithTag[]>('/tickets')
  const tickets = response.data

  const dayOfWeek = getDay(new Date())

  function formatDate(date: Date) {
    let prefix = ''
    if (isToday(date)) {
      prefix = 'Today'
    } else if (isTomorrow(date)) {
      prefix = 'Tomorrow'
    } else if (isThisWeek(date, { weekStartsOn: 1 })) {
      prefix = format(date, 'eeee')
    }

    return format(date, "dd' 'MMM") + ' - ' + prefix
  }

  const days = new Array(daysInWeek).fill(0).map((_, index) => ({
    key: index + 1,
    date: addDays(new Date(), index)
  }))

  return (
    <main className="w-full h-full bg-zinc-800">
      <div className="flex w-full h-full pt-32">
        <div className="flex w-full h-full p-5 border-t-2 border-gray-700 overflow-x-auto">
          {days
            .filter(p => p.key >= dayOfWeek)
            .map(p => (
              <CardList
                key={p.key}
                title={formatDate(p.date)}
                tickets={tickets.filter(t =>
                  isSameDay(addDays(new Date(t.date ?? ''), 1), p.date)
                )}
              />
            ))}
        </div>
      </div>
    </main>
  )
}
