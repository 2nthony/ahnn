import { readPreference } from '@/db/preference'
import { hooks } from '@/hooks'
import { getInitPreference } from '@/model/Preference'
import { useStore } from '@/store'
import { switchAppreance } from '@/utils/preference/switchAppreance'

export function restorePreference() {
  hooks.add('appBeforeMount', () => {
    const store = useStore()
    readPreference().then((preference) => {
      preference = { ...getInitPreference(), ...preference }
      store.commit('setPreference', preference)
      switchAppreance(preference.appreance)
    })
  })
}
