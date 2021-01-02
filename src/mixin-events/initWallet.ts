// init wallet data
// if no data from db then add a wallet to db

import { setWallet, readWallets } from '@app/db/wallet'
import { presetWallets } from '@app/model/Wallet'

export function eventInitWallet() {
  readWallets().then((wallets) => {
    if (!wallets.length) {
      setWallet(presetWallets[0])
    }
  })
}
