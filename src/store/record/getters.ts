import { State } from './state'
import { Record } from '../../model/Record'
import { GetterTree } from 'vuex'
import { RootState } from '@/store'

export interface Getters {
  records(state: State): Record[]
}

export const getters: GetterTree<State, RootState> & Getters = {
  records: (state) => state.records,
}
