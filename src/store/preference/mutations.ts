import { State } from './state'
import { Preference } from '@/model/Preference'
import { MutationTree } from 'vuex'

export interface Mutations {
  setPreference(
    state: State,
    payload: { [key in keyof Preference]?: Preference[key] },
  ): void
}

export const mutations: MutationTree<State> & Mutations = {
  setPreference(state, payload) {
    state.preference = { ...state.preference, ...payload }
  },
}
