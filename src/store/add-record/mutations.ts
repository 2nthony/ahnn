import { getInitRecord, Record } from '@app/model/Record'
import { MutationTree } from 'vuex'
import { State } from './state'
import { Type } from '@app/model/Type'
import { presetCategories } from '@app/model/Category'

export type Mutations = {
  setAddRecord(state: State, payload: Partial<Record>): void
  switchAddRecordType(state: State, type: Type): void
  initAddRecord(state: State): void
}

export const mutations: MutationTree<State> & Mutations = {
  setAddRecord(state, payload) {
    state.addRecord = { ...state.addRecord, ...payload }
  },
  switchAddRecordType(state, type) {
    state.addRecord = {
      ...state.addRecord,
      type,
      category: presetCategories[type][0],
    }
  },
  initAddRecord(state) {
    state.addRecord = getInitRecord()
  },
}
