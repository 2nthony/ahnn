import { readWallets } from '@/db/wallet'
import { Wallet } from '@/model/Wallet'
import { ref } from 'vue'

export function useUserWallets() {
  // FIXME set a non-empty array to prevent oldChildren empty
  // https://github.com/vuejs/vue-next/issues/2804
  const userWallets = ref<Wallet[]>([
    {
      name: '',
      icon: '',
      balance: null,
    },
  ])

  readWallets().then((wallets) => {
    userWallets.value = wallets
  })

  return {
    userWallets,
  }
}
