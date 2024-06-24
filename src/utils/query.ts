export function getDateFilter(date: Date | null) {
  const currentDate = new Date(date ?? '')

  return {
    gte: new Date(currentDate.setUTCHours(0, 0, 0, 0)),
    lt: new Date(currentDate.setUTCHours(24, 0, 0, 0))
  }
}
