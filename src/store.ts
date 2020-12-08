import {
  CommitOptions,
  createStore,
  Store as VuexStore,
  useStore as baseUseStore,
} from 'vuex'
import { State, state } from './store/state'
import { Getters, getters } from './store/getters'
import { Mutations, mutations } from './store/mutations'
import { InjectionKey } from 'vue'

export const key: InjectionKey<VuexStore<State>> = Symbol()

export const store = createStore<State>({
  state,
  getters,
  mutations,
})

export function useStore() {
  return baseUseStore(key) as Store
}

export type Store = Omit<
  VuexStore<State>,
  'getters' | 'commit' | 'dispatch'
> & {
  getters: {
    [k in keyof Getters]: ReturnType<Getters[k]>
  }
} & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions,
  ): ReturnType<Mutations[K]>
}
