import { Record } from '@app/model/Record'
import { GetterTree } from 'vuex'
import { State } from './state'
import { RootState } from '@app/store'

export type Getters = {
  addRecord(state: State): Record
}

export const getters: GetterTree<State, RootState> & Getters = {
  addRecord: (state) => state.addRecord,
}
