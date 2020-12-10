import { getInitPreference, Preference } from '@/model/Preference'
import { getInitRecord, Record } from '../model/Record'

export interface State {
  records: Record[]
  addRecord: Record
  preference: Preference
}
export const state: State = {
  records: [],
  addRecord: getInitRecord(),
  preference: getInitPreference(),
}
