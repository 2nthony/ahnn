import { initAddRecordFormState } from './initAddRecordFormState'
import { initWallet } from './initWallet'
import { readRecordsFromDB } from './readRecordsFromDB'
import { restorePreference } from './restorePreference'

export function collect() {
  const fns = [
    restorePreference,
    readRecordsFromDB,
    initWallet,
    initAddRecordFormState,
  ]

  fns.forEach((hook) => hook())
}
