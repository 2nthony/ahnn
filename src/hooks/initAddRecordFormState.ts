import { useStore } from '@/store'
import { hooks } from '.'

export function initAddRecordFormState() {
  hooks.add('appMounted', () => {
    const store = useStore()
    store.dispatch('initAddRecord')
  })
}
