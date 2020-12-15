import { initWallet } from './initWallet'
import { readRecordsFromDB } from './readRecordsFromDB'
import { restorePreference } from './restorePreference'
import { setupGtag } from './setupGtag'

export function collect() {
  restorePreference()
  readRecordsFromDB()
  initWallet()
  setupGtag()
}
