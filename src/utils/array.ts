export function groupBy<T>(array: T[], fn: (data: T) => string) {
  const reduced = array.reduce((acc, p) => {
    const groupByField = fn(p)

    if (!acc[groupByField]) {
      acc[groupByField] = []
    }
    acc[groupByField].push(p)
    return acc
  }, {} as { [key: string]: T[] })

  return Object.keys(reduced).map(p => ({
    key: p,
    data: reduced[p]
  }))
}
