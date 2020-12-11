import { readRecord } from '@/db'
import { useStore } from '@/store'
import { getCurrentMonth, getCurrentYear } from '@/utils/date'
import { hooks } from '.'

export function readRecordsFromDB() {
  hooks.add('appBeforeMount', () => {
    const store = useStore()
    readRecord(`${getCurrentYear()}-${getCurrentMonth()}`, 'desc').then(
      (records) => {
        store.commit('setRecords', records)
      },
    )
  })
}
