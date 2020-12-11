import { readRecordsFromDB } from './readRecordsFromDB'
import { restorePreference } from './restorePreference'

export function collect() {
  restorePreference(), readRecordsFromDB()
}
