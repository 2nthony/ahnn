import {
  CommitOptions,
  createStore,
  DispatchOptions,
  ModuleTree,
  Store as VuexStore,
  useStore as baseUseStore,
} from 'vuex'
import { StoreGetters } from './store/getters'
import { StoreMutations } from './store/mutations'
import { RecordModule } from './store/record'
import { PreferenceModule } from './store/preference'
import { AddRecordModule } from './store/add-record'
import { StoreActions } from './store/actions'

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
    [K in keyof StoreGetters]: ReturnType<StoreGetters[K]>
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
} & {
  dispatch<
    K extends keyof StoreActions,
    P extends Parameters<StoreActions[K]>[1]
  >(
    key: K,
    payload?: P,
    options?: DispatchOptions,
  ): ReturnType<StoreActions[K]>
}
