import { GetterTree } from 'vuex'
import { State } from './state'
import { Preference } from '@app/model/Preference'
import { RootState } from '@app/store'

export interface Getters {
  preference(state: State): Preference
}

export const getters: GetterTree<State, RootState> & Getters = {
  preference: (state) => state.preference,
}
