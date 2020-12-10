import { getInitRecord, Record } from '../model/Record'
import { MutationTree } from 'vuex'
import { State } from './state'
import { Type } from '@/model/Type'
import { presetCategories } from '@/model/Category'
import { Preference } from '@/model/Preference'

export enum MutationTypes {
  initAddRecord = 'initAddRecord',
  setAddRecord = 'setAddRecord',
  switchAddRecordType = 'switchAddRecordType',
  setPreference = 'setPreference',
}

export type Mutations = {
  [MutationTypes.initAddRecord](state: State): void
  [MutationTypes.setAddRecord](
    state: State,
    payload: { [key in keyof Record]?: Record[key] },
  ): void
  [MutationTypes.switchAddRecordType](state: State, type: Type): void
  [MutationTypes.setPreference](
    state: State,
    payload: { [key in keyof Preference]?: Preference[key] },
  ): void
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
  [MutationTypes.setPreference](state, payload) {
    state.preference = { ...state.preference, ...payload }
  },
}
