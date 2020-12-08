import { createStore } from 'vuex'
import { getInitRecord, Record } from './model/Record'

export interface State {
  records: Record[]

  addRecord: Record

  books?: string[]
  members?: string[]
}

export const store = createStore<State>({
  state: {
    records: [],
    addRecord: getInitRecord(),
  },

  getters: {
    addRecord: (state) => state.addRecord,
  },

  mutations: {
    initAddRecord(state) {
      state.addRecord = getInitRecord()
    },

    setAddRecord(state, payload) {
      state.addRecord = { ...state.addRecord, ...payload }
    },
  },
})
