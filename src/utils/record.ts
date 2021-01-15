import { Record } from '@app/model/Record'
import { Types } from '@app/model/Type'

export function calcRecords(records: Record[]) {
  const model: { [k: string]: number } = {}
  Object.keys(Types).forEach((k) => (model[k] = 0))

  return records.reduce((res, record) => {
    res[record.type] += record.cost
    return res
  }, model)
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
    }
    if (record.type === Types.income) {
      incomeRecords.push(record)
    }
  })

  return {
    payoutRecords,
    incomeRecords,
  }
}
