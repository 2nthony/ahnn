import { createStore, Store as VuexStore, useStore as baseUseStore } from 'vuex'
import { State, state } from './store/state'
import { getters } from './store/getters'
import { mutations } from './store/mutations'
import { InjectionKey } from 'vue'

export const key: InjectionKey<VuexStore<State>> = Symbol()

export const store = createStore<State>({
  state,
  getters,
  mutations,
})

export function useStore() {
  return baseUseStore(key)
}
