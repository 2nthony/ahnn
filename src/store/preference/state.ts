import { getInitPreference, Preference } from '@/model/Preference'

export interface State {
  preference: Preference
}
export const state: State = {
  preference: getInitPreference(),
}
