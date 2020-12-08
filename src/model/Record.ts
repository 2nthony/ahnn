import { getDefaultBookName, BookName } from './Book'
import { defaultType, Type } from './Type'
import { CategoryItem, getDefaultCategory } from './Category'
import { getDefaultMember, Member } from './Member'
import { AccountName, getDefaultAccountName } from './Account'
import { getToday } from '../utils/date'

export interface Record {
  book: BookName
  type: Type
  category: CategoryItem
  cost: number
  /** @example '2020-11-25' */
  date: string
  /** @example '日常账本' */
  account: AccountName
  member: Member
  remark?: string
}

export function getInitRecord(): Record {
  return {
    book: getDefaultBookName(),
    type: defaultType,
    category: getDefaultCategory(defaultType),
    cost: 0,
    date: getToday(),
    account: getDefaultAccountName(),
    member: getDefaultMember(),
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
