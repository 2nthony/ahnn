import { AddRecordActions } from './add-record'
import { RecordActions } from './record'

export interface StoreActions extends RecordActions, AddRecordActions {}
