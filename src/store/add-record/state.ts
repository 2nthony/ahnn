import { getInitRecord, Record } from '../../model/Record'

export interface State {
  addRecord: Record
}
export const state: State = {
  addRecord: getInitRecord(),
}
