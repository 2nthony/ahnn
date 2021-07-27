import { useStore } from '@app/store'
import { computed, watch } from 'vue'

export function eventRefreshRecords() {
  const store = useStore()

  const recordsQueryDate = computed(() => store.getters.recordsQueryDate)
  watch(
    recordsQueryDate,
    () => {
      store.dispatch('readRecordsByQueryDate')
    },
    {
      immediate: true,
    },
  )
}
