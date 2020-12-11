import { State } from './state'
import { Record } from '../../model/Record'
import { MutationTree } from 'vuex'

export interface Mutations {
  setRecords(state: State, payload: Record[]): void
}

export const mutations: MutationTree<State> & Mutations = {
  setRecords(state, payload) {
    state.records = payload
  },
}
