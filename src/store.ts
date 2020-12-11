import {
  CommitOptions,
  createStore,
  ModuleTree,
  Store as VuexStore,
  useStore as baseUseStore,
} from 'vuex'
import { StoreGetters } from './store/getters'
import { StoreMutations } from './store/mutations'
import { RecordModule } from './store/record'
import { PreferenceModule } from './store/preference'
import { AddRecordModule } from './store/add-record'

export type RootState = {}

const modules: ModuleTree<RootState> = {
  RecordModule,
  AddRecordModule,
  PreferenceModule,
}

export const store = createStore<RootState>({
  modules,
})

export function useStore() {
  return baseUseStore() as Store
}

export type Store = Omit<
  VuexStore<RootState>,
  'getters' | 'commit' | 'dispatch'
> & {
  getters: {
    [k in keyof StoreGetters]: ReturnType<StoreGetters[k]>
  }
} & {
  commit<
    K extends keyof StoreMutations,
    P extends Parameters<StoreMutations[K]>[1]
  >(
    key: K,
    payload?: P,
    options?: CommitOptions,
  ): ReturnType<StoreMutations[K]>
}
