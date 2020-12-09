import { getInitRecord, Record } from '../model/Record'
import { MutationTree } from 'vuex'
import { State } from './state'
import { Type } from '@/model/Type'
import { presetCategories } from '@/model/Category'

export enum MutationTypes {
  initAddRecord = 'initAddRecord',
  setAddRecord = 'setAddRecord',
  switchAddRecordType = 'switchAddRecordType',
}

export type Mutations = {
  [MutationTypes.initAddRecord](state: State): void
  [MutationTypes.setAddRecord](
    state: State,
    payload: { [key in keyof Record]?: Record[key] },
  ): void
  [MutationTypes.switchAddRecordType](state: State, type: Type): void
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.initAddRecord](state) {
    state.addRecord = getInitRecord()
  },
  [MutationTypes.setAddRecord](state, payload) {
    state.addRecord = { ...state.addRecord, ...payload }
  },
  [MutationTypes.switchAddRecordType](state, type) {
    state.addRecord = {
      ...state.addRecord,
      type,
      category: presetCategories[type][0],
    }
  },
}
