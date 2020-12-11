import { State } from './state'
import { Record } from '../../model/Record'
import { MutationTree } from 'vuex'
import { isFalsy } from '@/utils'

export interface Mutations {
  setRecords(state: State, payload: Record[]): void
  deleteRecord(state: State, id: number): void
}

export const mutations: MutationTree<State> & Mutations = {
  setRecords(state, payload) {
    state.records = payload
  },
  deleteRecord(state, id) {
    if (isFalsy(id)) return

    const index = state.records.findIndex((record) => {
      return record.id === id
    })

    state.records.splice(index, 1)
  },
}
