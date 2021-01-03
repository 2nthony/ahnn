import { Record } from '@app/model/Record'

export function sortByCategory(records: Record[]) {
  const res: { [k: string]: number } = {}

  records.forEach((record) => {
    res[record.category] = res[record.category] || 0
    res[record.category] += record.cost
  })

  return Object.keys(res)
    .map((k) => {
      return {
        category: k,
        cost: res[k],
      }
    })
    .sort((a, b) => b.cost - a.cost)
}
