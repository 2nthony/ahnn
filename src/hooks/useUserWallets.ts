import { readWallets } from '@/db/wallet'
import { Wallet } from '@/model/Wallet'
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
