import { RootState } from '@/store'
import { ActionContext, ActionTree, DispatchOptions } from 'vuex'
import { State } from './state'
import { Mutations } from './mutations'
import { readRecordsByMonth } from '@/db'

export type RecordActionContext = ActionContext<State, RootState> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions,
  ): ReturnType<Actions[K]>
}

export interface Actions {
  readRecordsByQueryDate(ctx: RecordActionContext): void
}

export const actions: ActionTree<State, RootState> & Actions = {
  readRecordsByQueryDate({ state, commit }) {
    const [year, month] = state.recordsQueryDate
    readRecordsByMonth(year, month).then((records) => {
      commit('setRecords', records)
    })
  },
}
