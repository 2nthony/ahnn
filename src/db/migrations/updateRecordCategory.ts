import { IDBPDatabase } from 'idb'
import { setRecord } from '../record'

export function updateRecordCategory(db: IDBPDatabase, oldVersion: number = 1) {
  // `category: {name, icon}` to `category: name`
  if (oldVersion === 5) {
    db.getAll('record').then((records) => {
      Promise.all(
        records.map((record) => {
          setRecord({
            ...record,
            category: record.category.name,
          })
        }),
      ).then(() => {
        window.location.reload()
      })
    })
  }
}
