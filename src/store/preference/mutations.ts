import { State } from './state'
import { Preference } from '@app/model/Preference'
import { MutationTree } from 'vuex'

export interface Mutations {
  setPreference(state: State, payload: Partial<Preference>): void
}

export const mutations: MutationTree<State> & Mutations = {
  setPreference(state, payload) {
    state.preference = { ...state.preference, ...payload }
  },
}
