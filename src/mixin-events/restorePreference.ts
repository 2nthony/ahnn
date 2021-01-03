import { readPreference } from '@app/db/preference'
import { getInitPreference } from '@app/model/Preference'
import { useStore } from '@app/store'
import { switchAppreance } from '@app/utils/preference/switchAppreance'

export function eventRestorePreference() {
  const store = useStore()
  readPreference().then((preference) => {
    preference = { ...getInitPreference(), ...preference }
    store.commit('setPreference', preference)
    switchAppreance(preference.appreance)
  })
}
