import { readWallets } from '@app/db/wallet'
import { Wallet } from '@app/model/Wallet'
import { ref } from 'vue'

export function useUserWallets() {
  const userWallets = ref<Wallet[]>([])

  readWallets().then((wallets) => {
    userWallets.value = wallets
  })

  return {
    userWallets,
  }
}
