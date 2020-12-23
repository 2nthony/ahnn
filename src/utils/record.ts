import { Record } from '@/model/Record'

export function calcRecords(records: Record[]) {
  return records.reduce(
    (res, record) => {
      res[record.type] += record.cost
      return res
    },
    {
      payout: 0,
      income: 0,
    },
  )
}

export function compatHomeRecords(records: Record[]) {
  const res: { [k: string]: Record[] } = {}

  records.forEach((record) => {
    res[record.date] = res[record.date] || []
    res[record.date].push(record)
  })

  return Object.keys(res).map((k) => {
    return {
      date: k,
      costs: res[k],
    }
  })
}
