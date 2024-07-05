import { format, isBefore, isSameWeek, isToday, isTomorrow } from 'date-fns'

export function formatDay(date: Date) {
  let prefix = ''
  if (isToday(date)) {
    prefix = 'Today'
  } else if (isTomorrow(date)) {
    prefix = 'Tomorrow'
  } else {
    prefix = format(date, 'eeee')
  }

  return format(date, "dd' 'MMM") + ' - ' + prefix
}

export function getDaySuffix(date: Date) {
  if (isToday(date)) {
    return 'Today'
  } else if (isTomorrow(date)) {
    return 'Tomorrow'
  } else if (!isSameWeek(date, new Date()) || isBefore(date, new Date())) {
    return format(date, "dd' 'MMM")
  }
  return format(date, 'eeee')
}

export function parseForm(date: Date) {
  if (date) {
    return new Date(date).toISOString().split('T')[0]
  }
  return null
}
