import { openDB as open } from 'idb'

export async function openDB() {
  return await open('Ahnn', 1, {
    upgrade(db) {
      const recordStore = db.createObjectStore('record', {
        autoIncrement: true,
        keyPath: 'id'
      })

      recordStore.createIndex('book', 'book')
      recordStore.createIndex('date', 'date')
    }
  })
}
