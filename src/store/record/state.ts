import { getCurrentMonth, getCurrentYear } from '@/utils/date'
import { Record } from '../../model/Record'

export type RecordsQueryDate = [number, number]
export interface State {
  recordsQueryDate: RecordsQueryDate
  records: Record[]
}
export const state: State = {
  recordsQueryDate: [getCurrentYear(), getCurrentMonth()],
  records: [],
}
