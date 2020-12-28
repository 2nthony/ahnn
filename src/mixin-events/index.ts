import { eventInitAddRecordFormState } from './initAddRecordFormState'
import { eventInitWallet } from './initWallet'
import { eventRefreshRecords } from './refreshRecords'
import { eventRestorePreference } from './restorePreference'

export function runMixinEvents() {
  eventRefreshRecords()
  eventRestorePreference()
  eventInitWallet()
  eventInitAddRecordFormState()
}
