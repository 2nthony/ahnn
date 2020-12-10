import { defaultType, Type } from './Type'
import { CategoryItem, getDefaultCategory } from './Category'
import { AccountName, getDefaultAccountName } from './Account'
import { getToday } from '../utils/date'

export interface Record {
  type: Type
  category: CategoryItem
  cost: number
  /** @example '2020-11-25' */
  date: string
  /** @example '日常账本' */
  account: AccountName
  remark?: string
}

export function getInitRecord(): Record {
  return {
    type: defaultType,
    category: getDefaultCategory(defaultType),
    cost: 0,
    date: getToday(),
    account: getDefaultAccountName(),
  }
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
