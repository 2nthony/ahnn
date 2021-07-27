import { computed } from 'vue'
import { deepToRaw } from '@app/utils'
import { useStore } from '@app/store'
import { setRecord } from '@app/db/record'

export function addRecordStrategy() {
  const store = useStore()

  const addRecord = computed(() => store.getters.addRecord)

  const handleSave = () => setRecord(deepToRaw(addRecord.value))

  return {
    addRecord,

    handleSave,
  }
}
