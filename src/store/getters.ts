import { Record } from '../model/Record'
import { GetterTree } from 'vuex'
import { State } from './state'

export type Getters = {
  addRecord(state: State): Record
}

export const getters: GetterTree<State, State> & Getters = {
  addRecord: (state) => state.addRecord,
}
