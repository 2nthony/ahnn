import { getInitPreference, Preference } from '@app/model/Preference'

export interface State {
  preference: Preference
}
export const state: State = {
  preference: getInitPreference(),
}
