import { getInitRecord, Record } from '../model/Record'

export interface State {
  records: Record[]
  addRecord: Record
}
export const state: State = {
  records: [],
  addRecord: getInitRecord(),
}
