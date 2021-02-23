import { eventInitAddRecordFormState } from './initAddRecordFormState'
import { eventRefreshRecords } from './refreshRecords'
import { eventRestorePreference } from './restorePreference'

export function runMixinEvents() {
  eventRefreshRecords()
  eventRestorePreference()
  eventInitAddRecordFormState()
}
