import { Record } from '../../model/Record'

export interface State {
  records: Record[]
}
export const state: State = {
  records: [],
}
