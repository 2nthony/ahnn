import { Record } from '@/model/Record'
import { pinnedWallets, Wallet, walletIndexing } from '@/model/Wallet'
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

export async function deleteWallet(wallet: Wallet) {
  if (!wallet.id) return
  const db = await open()
  return db.delete(storeName, wallet.id).finally(() => {
    db.close()
  })
}

export async function clearWallet() {
  const db = await open()
  return db.clear(storeName).finally(() => {
    db.close()
  })
}

export async function readWalletByName(name: string): Promise<Wallet> {
  const db = await open()
  return db.getFromIndex(storeName, 'name', name).finally(() => db.close())
}

export async function returnCostToWallet(name: string, cost: Record['cost']) {
  const wallet = await readWalletByName(name)
  return setWallet({
    ...wallet,
    balance: (wallet.balance as number) + cost,
  })
}

export async function resetWallet() {
  const wallets = await readWallets()

  const db = await open()

  const fns: Promise<any>[] = []

  const willDeleteWallets = wallets.filter((wallet) => {
    return pinnedWallets.indexOf(wallet.name) === -1
  })

  willDeleteWallets.forEach((wallet) => {
    if (!wallet.id) return
    fns.push(db.delete(storeName, wallet.id))
  })

  // 重置`现金`钱包
  fns.push(
    readWalletByName('现金').then((cashWallet) => {
      return setWallet({ ...cashWallet, balance: 0 })
    }),
  )

  return Promise.all(fns).then(() => {
    db.close()
  })
}
