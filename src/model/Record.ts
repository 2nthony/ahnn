import { defaultType, Type } from './Type'
import { CategoryName, getDefaultCategory } from './Category'
import { getToday } from '@app/utils/date'
import { StoreIndexing } from '@app/db'

export interface Record {
  id?: number
  type: Type
  category: CategoryName
  cost: number
  /** @example '2020-11-25' */
  date: string
  remark?: string
  createAt?: number
}

export const recordIndexing: StoreIndexing = [
  {
    name: 'date',
  },
]

export function getInitRecord(): Record {
  return {
    type: defaultType,
    category: getDefaultCategory(defaultType),
    cost: 0,
    date: getToday(),
    remark: '',
  }
}
