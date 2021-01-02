import { useStore } from '@app/store'

export function eventInitAddRecordFormState() {
  const store = useStore()
  store.dispatch('initAddRecord')
}
