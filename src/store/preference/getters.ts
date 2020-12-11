import { GetterTree } from 'vuex'
import { State } from './state'
import { Preference } from '@/model/Preference'
import { RootState } from '@/store'

export interface Getters {
  preference(state: State): Preference
}

export const getters: GetterTree<State, RootState> & Getters = {
  preference: (state) => state.preference,
}
