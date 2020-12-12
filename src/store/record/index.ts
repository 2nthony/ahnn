import { State, state } from './state'
import { Getters, getters } from './getters'
import { Mutations, mutations } from './mutations'
import { Actions, actions } from './actions'
import { Module } from 'vuex'
import { RootState } from '@/store'

export const RecordModule: Module<State, RootState> = {
  state,
  getters,
  mutations,
  actions,
}

export {
  Getters as RecordGetters,
  Mutations as RecordMutations,
  Actions as RecordActions,
}
