import { Wallet, walletIndexing } from '@/model/Wallet'
import { IDBPDatabase, IDBPTransaction } from 'idb'
import { ensureCreateIndex, ensureStore, open } from '.'

const storeName = 'wallet'

export function upgradeWallet(db: IDBPDatabase, transaction: IDBPTransaction) {
  const store = ensureStore(db, transaction, storeName, {
    autoIncrement: true,
    keyPath: 'id',
  })

  walletIndexing.forEach((indexing) => {
    ensureCreateIndex(store, indexing.name, indexing.keyPath)
  })
}

export async function readWallets(): Promise<Wallet[]> {
  const db = await open()
  return db.getAll(storeName, undefined).finally(() => db.close())
}

export async function addWallet(wallet: Wallet) {
  const db = await open()
  return db.add(storeName, wallet).finally(() => db.close())
}

export async function setWallet(wallet: Wallet) {
  const db = await open()
  const action = wallet.id ? 'put' : 'add'
  return db[action](storeName, wallet).finally(() => db.close())
}

export async function readWalletByName(name: string): Promise<Wallet> {
  const db = await open()
  return db.getFromIndex(storeName, 'name', name).finally(() => db.close())
}
