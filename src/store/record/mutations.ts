import { RecordsQueryDate, State } from './state'
import { Record } from '@app/model/Record'
import { MutationTree } from 'vuex'
import { isFalsy } from '@app/utils'

export interface Mutations {
  setRecordsQueryDate(state: State, payload: RecordsQueryDate): void
  setRecords(state: State, payload: Record[]): void
  deleteRecord(state: State, id: number): void
}

export const mutations: MutationTree<State> & Mutations = {
  setRecordsQueryDate(state, payload) {
    state.recordsQueryDate = payload
  },
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
