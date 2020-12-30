import { useStore } from '@/store'
import { ref, watch } from 'vue'

/**
 * This hook will do:
 *
 * reset add record form when `visible` be `false`
 */
export function usePopupAddRecord() {
  const store = useStore()
  const visible = ref(false)

  watch(visible, (bool) => {
    if (!bool) store.dispatch('initAddRecord')
  })

  return {
    visible,
  }
}
