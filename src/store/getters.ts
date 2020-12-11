import { RecordGetters } from './record'
import { PreferenceGetters } from './preference'
import { AddRecordGetters } from './add-record'

export interface StoreGetters
  extends RecordGetters,
    AddRecordGetters,
    PreferenceGetters {}
