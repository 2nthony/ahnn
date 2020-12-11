import { Record } from '../model/Record'
import { IDBPDatabase, IDBPTransaction } from 'idb'
import { ensureCreateIndex, ensureStore, open } from '.'

export function upgradeRecordDB(
  db: IDBPDatabase,
  transaction: IDBPTransaction,
) {
  const store = ensureStore(db, transaction, 'record', {
    autoIncrement: true,
    keyPath: 'id',
  })

  ensureCreateIndex(store, 'date')
}

// 日期字符串匹配 `startsWith`
type MatchDate = string
type Order = 'desc' | 'asc'
export async function readRecord(date: MatchDate, order: Order = 'asc') {
  const db = await open()

  return db
    .getAllFromIndex('record', 'date')
    .then((records) => {
      if (order === 'desc') {
        records = records.sort(() => -1)
      }

      if (!date) return records

      return records.filter((record) => record.date.startsWith(date))
    })
    .finally(() => {
      db.close()
    })
}

export async function addRecord(record: Record) {
  const db = await open()
  return db.add('record', record).finally(() => {
    db.close()
  })
}

export async function updateRecord(record: Record) {
  const db = await open()
  return db.put('record', record).finally(() => db.close())
}

export async function setRecord(record: Record) {
  if (record.id) return updateRecord(record)
  else return addRecord(record)
}

export async function deleteRecord(record: Record) {
  if (!record.id) return
  const db = await open()
  return db.delete('record', record.id).finally(() => db.close())
}

export async function clearRecord() {
  const db = await open()
  return db.clear('record').finally(() => {
    db.close()
  })
}
