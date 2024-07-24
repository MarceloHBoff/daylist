export function groupBy<T>(array: T[], fn: (data: T) => string | number) {
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

export function reorder(list: any[], startIndex: number, endIndex: number) {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}
