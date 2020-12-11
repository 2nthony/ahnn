import { RootState } from '@/store'
import { Module } from 'vuex'
import { Getters, getters } from './getters'
import { Mutations, mutations } from './mutations'
import { State, state } from './state'

export const AddRecordModule: Module<State, RootState> = {
  state,
  getters,
  mutations,
}

export { Getters as AddRecordGetters, Mutations as AddRecordMutations }
