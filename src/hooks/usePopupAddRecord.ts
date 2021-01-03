import { useStore } from '@app/store'
import { ref, watch } from 'vue'

/**
 * This hook will do:
 *
 * Reset add record form when `visible` be `false`, e.g. close popup.
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
