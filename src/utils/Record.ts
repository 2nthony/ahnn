import { Record } from '../model/Record'

export function convert(records: Record[]) {
  const res: { [k: string]: Record[] } = {}

  records.forEach(record => {
    res[record.date] = res[record.date] || []
    res[record.date].push(record)
  })

  return Object.keys(res).map(k => {
    return {
      date: k,
      costs: res[k]
    }
  })
}
