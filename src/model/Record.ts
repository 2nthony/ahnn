import { defaultType, Type } from './Type'
import { CategoryName, getDefaultCategory } from './Category'
import { WalletName, getDefaultWalletName } from './Wallet'
import { getToday } from '../utils/date'
import { StoreIndexing } from '@/db'

export interface Record {
  id?: number
  type: Type
  category: CategoryName
  cost: number
  /** @example '2020-11-25' */
  date: string
  wallet: WalletName
  remark?: string
  createAt?: number
}

export const recordIndexing: StoreIndexing = [
  {
    name: 'date',
  },
  {
    name: 'wallet',
  },
]

export function getInitRecord(): Record {
  return {
    type: defaultType,
    category: getDefaultCategory(defaultType),
    cost: 0,
    date: getToday(),
    wallet: getDefaultWalletName(),
    remark: '',
  }
}
