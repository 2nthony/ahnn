import { RecordMutations } from './record'
import { PreferenceMutations } from './preference'
import { AddRecordMutations } from './add-record'

export interface StoreMutations
  extends RecordMutations,
    AddRecordMutations,
    PreferenceMutations {}
