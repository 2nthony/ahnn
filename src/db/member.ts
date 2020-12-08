import { IDBPDatabase, IDBPTransaction } from 'idb'
import { ensureStore } from '.'

export function upgradeMemberDB(
  db: IDBPDatabase,
  transaction: IDBPTransaction,
) {
  ensureStore(db, transaction, 'member')
}
