import { useStore } from '@/store'

export function eventInitAddRecordFormState() {
  const store = useStore()
  store.dispatch('initAddRecord')
}
