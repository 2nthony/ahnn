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

  ensureCreateIndex(store, 'book')
  ensureCreateIndex(store, 'date')
}

// 日期字符串匹配 `startsWith`
type MatchDate = string
type Order = 'desc' | 'asc'
export async function readRecord(date: MatchDate, order: Order = 'asc') {
  const db = await open()
  const records: Record[] = await db.getAllFromIndex('record', 'date')
  db.close()

  if (!date) return records

  const res = records.filter((record) => record.date.startsWith(date))

  if (order === 'desc') {
    return res.sort(() => -1)
  }

  return res
}

export async function addRecord(record: Record) {
  const db = await open()
  db.add('record', record)
  db.close()
}

export async function clearRecord() {
  const db = await open()
  return db.clear('record').finally(() => {
    db.close()
  })
}
