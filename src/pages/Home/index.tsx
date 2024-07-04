import { api } from '@/lib/axios'
import {
  addDays,
  addWeeks,
  differenceInDays,
  endOfWeek,
  getDay,
  isSameDay,
  startOfDay,
  startOfWeek
} from 'date-fns'
import { TicketWithTag } from '@/models/ticket'
import TicketList from './TicketList'
import DropDown from '@/components/DropDown'
import Container from '../Container'
import Link from 'next/link'
import Image from 'next/image'
import { formatDay } from '@/utils/date'

type HomeProps = {
  week: number
}

export default async function Home({ week }: HomeProps) {
  const initialDate =
    week > 0 ? startOfWeek(addWeeks(new Date(), week)) : new Date()
  const finalDate = endOfWeek(initialDate)

  const response = await api.get<TicketWithTag[]>(
    `/tickets?initialDate=${initialDate}&finalDate=${finalDate}`
  )
  const tickets = response.data

  const daysInWeek = differenceInDays(finalDate, initialDate) + 1

  const days = new Array(daysInWeek).fill(0).map((_, index) => ({
    key: getDay(addDays(initialDate, index)) + 1,
    date: startOfDay(addDays(initialDate, index))
  }))

  return (
    <Container path="/">
      <div className="m-10 flex items-center justify-between">
        <DropDown />

        <div className="flex mr-6 -mb-16">
          {Number(week) > 0 && (
            <Link
              href={`/${Number(week) - 1}`}
              className="border-2 rounded-xl px-3 py-1 mr-4 border-zinc-500 transition-opacity hover:opacity-70"
            >
              <Image src="left.svg" alt="left" height={26} width={26} />
            </Link>
          )}
          <Link
            href={`/${Number(week) + 1}`}
            className="border-2 rounded-xl px-3 py-1 border-zinc-500 transition-opacity hover:opacity-70"
          >
            <Image src="right.svg" alt="left" height={26} width={26} />
          </Link>
        </div>
      </div>

      <div className="flex w-full">
        <div className="flex w-full p-5 border-t-2 border-gray-700 overflow-x-auto">
          {days.map(p => (
            <TicketList
              key={p.key}
              title={formatDay(p.date)}
              defaultValues={{ date: p.date }}
              tickets={tickets.filter(t =>
                isSameDay(new Date(t.date ?? ''), p.date)
              )}
            />
          ))}
        </div>
      </div>
    </Container>
  )
}
