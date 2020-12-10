import { IDBPDatabase, IDBPObjectStore, IDBPTransaction, openDB } from 'idb'
import { upgradePreference } from './preference'
import { upgradeRecordDB } from './record'

const DB_NAME = 'Ahnn'
export const DB_VERSION = 1

export async function open() {
  return await openDB(DB_NAME, DB_VERSION, {
    upgrade(db, _oldVersion, _newVersion, transaction) {
      upgradeRecordDB(db, transaction)
      upgradePreference(db, transaction)
    },
  })
}

export function ensureStore(
  db: IDBPDatabase,
  transaction: IDBPTransaction,
  name: string,
  opts?: IDBObjectStoreParameters,
) {
  if (!db.objectStoreNames.contains(name)) {
    return db.createObjectStore(name, opts)
  }

  return transaction?.objectStore(name)
}

export function ensureCreateIndex(
  store: IDBPObjectStore,
  name: string,
  keyPath?: string,
) {
  if (store.indexNames.contains(name)) return
  keyPath = keyPath || name
  store.createIndex(name, keyPath)
}

export * from './record'
