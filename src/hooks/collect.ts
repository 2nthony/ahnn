import { initAddRecordFormState } from './initAddRecordFormState'
import { initWallet } from './initWallet'
import { readRecordsFromDB } from './readRecordsFromDB'
import { restorePreference } from './restorePreference'
import { setupGtag } from './setupGtag'

export function collect() {
  const fns = [
    restorePreference,
    readRecordsFromDB,
    initWallet,
    setupGtag,
    initAddRecordFormState,
  ]

  fns.forEach((hook) => hook())
}
