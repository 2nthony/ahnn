import { RootState } from '@app/store'
import { ActionContext, ActionTree, DispatchOptions } from 'vuex'
import { State } from './state'
import { Mutations } from './mutations'
import { readWallets } from '@app/db/wallet'
import { getInitRecord } from '@app/model/Record'

export type AddRecordActionContext = ActionContext<State, RootState> & {
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
  initAddRecord(ctx: AddRecordActionContext): void
}

export const actions: ActionTree<State, RootState> & Actions = {
  initAddRecord({ commit }) {
    readWallets().then((wallets) => {
      const firstWallet = wallets[0] || {}
      const value = { ...getInitRecord(), wallet: firstWallet.name }
      commit('setAddRecord', value)
    })
  },
}
