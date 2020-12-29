import { Record, recordIndexing } from '../model/Record'
import { IDBPDatabase, IDBPTransaction } from 'idb'
import { ensureCreateIndex, ensureStore, open } from '.'
import dayjs from 'dayjs'
import { Wallet, WalletName } from '@/model/Wallet'
import { monthsInYear } from '@/utils/date'
import { updateRecordCategory } from './migrations/updateRecordCategory'

export function upgradeRecordDB(
  db: IDBPDatabase,
  transaction: IDBPTransaction,
  oldVersion?: number,
  _newVersion?: number | null,
) {
  const store = ensureStore(db, transaction, 'record', {
    autoIncrement: true,
    keyPath: 'id',
  })

  recordIndexing.forEach((indexing) => {
    ensureCreateIndex(store, indexing.name, indexing.keyPath)
  })

  transaction.oncomplete = () => {
    updateRecordCategory(db, oldVersion)
  }
}

export async function setRecord(record: Record) {
  const action = record.id ? 'put' : 'add'
  const db = await open()
  return db[action]('record', record).finally(() => db.close())
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

/**
 * @description Read all records by year
 */
export async function readRecordsByYear(year: number) {
  return Promise.all(
    monthsInYear.map((month) => {
      return readRecordsByMonth(year, month).then((records) => {
        return {
          year,
          month,
          records,
        }
      })
    }),
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
