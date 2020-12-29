import { Preference } from '@/model/Preference'
import { IDBPDatabase, IDBPTransaction } from 'idb'
import { ensureStore, open } from '.'

export function upgradePreference(
  db: IDBPDatabase,
  transaction: IDBPTransaction,
  _oldVersion?: number,
  _newVersion?: number | null,
) {
  ensureStore(db, transaction, 'preference', {
    autoIncrement: true,
    keyPath: 'id',
  })
}

export async function readPreference() {
  const db = await open()
  return db
    .getAll('preference', undefined, 1)
    .then((res) => res[0])
    .finally(() => db.close())
}

export async function setPreference(preference: Preference) {
  const currentPreference = await readPreference()
  const action = currentPreference ? 'put' : 'add'
  const db = await open()
  return db[action]('preference', {
    ...currentPreference,
    ...preference,
  }).finally(() => db.close())
}
