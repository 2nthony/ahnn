import { getInitRecord, Record } from '../model/Record'
import { MutationTree } from 'vuex'
import { State } from './state'

export enum MutationTypes {
  initAddRecord = 'initAddRecord',
  setAddRecord = 'setAddRecord',
}

export type Mutations = {
  [MutationTypes.initAddRecord](state: State): void
  [MutationTypes.setAddRecord](
    state: State,
    payload: { [key in keyof Record]?: Record[key] },
  ): void
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.initAddRecord](state) {
    state.addRecord = getInitRecord()
  },
  [MutationTypes.setAddRecord](state, payload) {
    state.addRecord = { ...state.addRecord, ...payload }
  },
}
