import { Record } from '../../model/Record'
import { MutationTree } from 'vuex'
import { State } from './state'
import { Type } from '@/model/Type'
import { presetCategories } from '@/model/Category'

export type Mutations = {
  setAddRecord(
    state: State,
    payload: { [key in keyof Record]?: Record[key] },
  ): void
  switchAddRecordType(state: State, type: Type): void
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
}
