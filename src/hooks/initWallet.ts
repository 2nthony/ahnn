// init wallet data
// if no data from db then add a wallet to db

import { addWallet, readWallets } from '@/db/wallet'
import { presetWallets } from '@/model/Wallet'
import { hooks } from '.'

export function initWallet() {
  hooks.add('appBeforeMount', () => {
    readWallets().then((wallets) => {
      if (!wallets.length) {
        addWallet(presetWallets[0])
      }
    })
  })
}
