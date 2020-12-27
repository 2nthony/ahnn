import { categoryNameIconMapping } from '@/model/Category'
import { Record } from '@/model/Record'

export function sortByCategory(records: Record[]) {
  const res: { [k: string]: number } = {}

  records.forEach((record) => {
    res[record.category.name] = res[record.category.name] || 0
    res[record.category.name] += record.cost
  })

  return Object.keys(res)
    .map((k) => {
      return {
        categoryName: k,
        categoryIcon: categoryNameIconMapping[k],
        cost: res[k],
      }
    })
    .sort((a, b) => b.cost - a.cost)
}
