import { Record, recordIndexing } from '../model/Record'
import { IDBPDatabase, IDBPTransaction } from 'idb'
import { ensureCreateIndex, ensureStore, open } from '.'
import dayjs from 'dayjs'
import { Wallet, WalletName } from '@/model/Wallet'

export function upgradeRecordDB(
  db: IDBPDatabase,
  transaction: IDBPTransaction,
) {
  const store = ensureStore(db, transaction, 'record', {
    autoIncrement: true,
    keyPath: 'id',
  })

  recordIndexing.forEach((indexing) => {
    ensureCreateIndex(store, indexing.name, indexing.keyPath)
  })
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

export async function readRecordsByMonth(
  year: number,
  month: number,
): Promise<Record[]> {
  const db = await open()

  // YYYY-MM-DD []
  const dates = Array.from({
    length: dayjs()
      .year(year)
      .month(month - 1)
      .day(1)
      .daysInMonth(),
  }).map((_, i) => `${year}-${month}-${i + 1}`)

  const readers = dates.map((date) => {
    return db.getAllFromIndex('record', 'date', date)
  })

  return (
    Promise.all(readers)
      .then((res) => res.flat())
      // desc
      .then((records) => records.sort(() => -1))
      .finally(() => {
        db.close()
      })
  )
}

export async function readRecordByWallet(
  walletName: WalletName,
): Promise<Record[]> {
  const db = await open()
  return db.getAllFromIndex('record', 'wallet', walletName).finally(() => {
    db.close()
  })
}

export async function deleteAllRecordByWallet(walletName: Wallet['name']) {
  const db = await open()
  const records = await db.getAllFromIndex('record', 'wallet', walletName)

  Promise.all(
    records.map((record) => {
      return db.delete('record', record.id)
    }),
  ).finally(() => db.close())
}
