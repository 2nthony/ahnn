import { RecordsQueryDate, State } from './state'
import { Record } from '../../model/Record'
import { GetterTree } from 'vuex'
import { RootState } from '@/store'

export interface Getters {
  recordsQueryDate(state: State): RecordsQueryDate
  records(state: State): Record[]
}

export const getters: GetterTree<State, RootState> & Getters = {
  recordsQueryDate: (state) => state.recordsQueryDate,
  records: (state) => state.records,
}
