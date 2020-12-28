import { useStore } from '@/store'
import { computed, watch } from 'vue'

export function eventRefreshRecords() {
  const store = useStore()

  store.dispatch('readRecordsByQueryDate')

  const recordsQueryDate = computed(() => store.getters.recordsQueryDate)
  watch(recordsQueryDate, () => {
    store.dispatch('readRecordsByQueryDate')
  })
}
