import { Record } from '../model/Record'
import { GetterTree } from 'vuex'
import { State } from './state'
import { Preference } from '@/model/Preference'

export type Getters = {
  addRecord(state: State): Record
  preference(state: State): Preference
}

export const getters: GetterTree<State, State> & Getters = {
  addRecord: (state) => state.addRecord,
  preference: (state) => state.preference,
}
