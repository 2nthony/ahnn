import { getInitRecord, Record } from '@app/model/Record'

export interface State {
  addRecord: Record
}
export const state: State = {
  addRecord: getInitRecord(),
}
