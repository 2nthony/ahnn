import { Record } from '@/model/Record'
import { Types } from '@/model/Type'

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

export function splitRecordsByType(records: Record[]) {
  const payoutRecords: Record[] = []
  const incomeRecords: Record[] = []

  records.forEach((record) => {
    if (record.type === Types.payout) {
      payoutRecords.push(record)
    } else {
      incomeRecords.push(record)
    }
  })

  return {
    payoutRecords,
    incomeRecords,
  }
}
