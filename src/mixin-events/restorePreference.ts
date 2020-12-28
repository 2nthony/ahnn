import { readPreference } from '@/db/preference'
import { getInitPreference } from '@/model/Preference'
import { useStore } from '@/store'
import { switchAppreance } from '@/utils/preference/switchAppreance'

export function eventRestorePreference() {
  const store = useStore()
  readPreference().then((preference) => {
    preference = { ...getInitPreference(), ...preference }
    store.commit('setPreference', preference)
    switchAppreance(preference.appreance)
  })
}
