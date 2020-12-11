import { State, state } from './state'
import { Getters, getters } from './getters'
import { Mutations, mutations } from './mutations'
import { Module } from 'vuex'
import { RootState } from '@/store'

export const PreferenceModule: Module<State, RootState> = {
  state,
  getters,
  mutations,
}

export { Getters as PreferenceGetters, Mutations as PreferenceMutations }
