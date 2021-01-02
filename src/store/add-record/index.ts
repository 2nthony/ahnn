import { RootState } from '@app/store'
import { Module } from 'vuex'
import { Actions, actions } from './actions'
import { Getters, getters } from './getters'
import { Mutations, mutations } from './mutations'
import { State, state } from './state'

export const AddRecordModule: Module<State, RootState> = {
  state,
  getters,
  mutations,
  actions,
}

export {
  Getters as AddRecordGetters,
  Mutations as AddRecordMutations,
  Actions as AddRecordActions,
}
