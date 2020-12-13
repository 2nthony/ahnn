import { IDBPDatabase, IDBPObjectStore, IDBPTransaction, openDB } from 'idb'
import { upgradePreference } from './preference'
import { upgradeRecordDB } from './record'
import { upgradeWallet } from './wallet'

const DB_NAME = 'Ahnn'
export const DB_VERSION = 5

export async function open() {
  return await openDB(DB_NAME, DB_VERSION, {
    upgrade(db, _oldVersion, _newVersion, transaction) {
      const upgraders = [upgradeRecordDB, upgradePreference, upgradeWallet]
      upgraders.forEach((upgrader) => upgrader(db, transaction))
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

export type StoreIndexing = {
  name: string
  keyPath?: string | string[]
}[]
export function ensureCreateIndex(
  store: IDBPObjectStore,
  name: string,
  keyPath?: string | string[],
  options?: IDBIndexParameters,
) {
  if (store.indexNames.contains(name)) return
  keyPath = keyPath || name
  store.createIndex(name, keyPath, options)
}

export * from './record'
