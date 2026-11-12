export const TIME_ZONE = 'America/Sao_Paulo'

const formatter = new Intl.DateTimeFormat('en-US', {
  timeZone: TIME_ZONE,
  hourCycle: 'h23',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
})

export function zonedParts(date: Date) {
  const p = Object.fromEntries(
    formatter.formatToParts(date).map(x => [x.type, Number(x.value)])
  )
  return {
    y: p.year,
    m: p.month,
    d: p.day,
    h: p.hour,
    min: p.minute,
    s: p.second
  }
}

export function zonedDate(y: number, m: number, d: number, h = 0, min = 0) {
  const guess = Date.UTC(y, m - 1, d, h, min)
  const p = zonedParts(new Date(guess))
  const offset = Date.UTC(p.y, p.m - 1, p.d, p.h, p.min, p.s) - guess
  return new Date(guess - offset)
}

export function zonedDayRange(date: Date) {
  const { y, m, d } = zonedParts(date)
  return {
    gte: zonedDate(y, m, d).toISOString(),
    lt: zonedDate(y, m, d + 1).toISOString()
  }
}

export function parseTicketDate(value: Date | string) {
  const naive =
    typeof value === 'string' &&
    value.match(/^(\d{4})-(\d\d)-(\d\d)[T ](\d\d):(\d\d)(?::\d\d(?:\.\d+)?)?$/)
  if (naive) {
    const [, y, m, d, h, min] = naive.map(Number)
    return zonedDate(y, m, d, h, min)
  }
  return new Date(value)
}
