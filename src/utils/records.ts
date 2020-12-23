import { Record } from '@/model/Record'
import { Types } from '@/model/Type'

type CalcResult = {
  [Types.payout]: number
  [Types.income]: number
}

export function calcRecords(records: Record[]): CalcResult {
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
