import { useStore } from '@/store'
import { hooks } from '.'

export function readRecordsFromDB() {
  hooks.add('appBeforeMount', () => {
    const store = useStore()
    store.dispatch('readRecordsByQueryDate')
  })
}
