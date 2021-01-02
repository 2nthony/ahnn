<template>
  <PageSelect
    title="钱包"
    :items="userAddedWallets"
    @item-click="handleItemClick"
  />
</template>

<script lang="ts">
import { Wallet } from '@app/model/Wallet'
import PageSelect from '@app/layout/PageSelect.vue'
import { useRouter } from 'vue-router'
import { useStore } from '@app/store'
import { onMounted, ref } from 'vue'
import { readWallets } from '@app/db/wallet'

export default {
  components: { PageSelect },
  setup() {
    const store = useStore()
    const router = useRouter()
    const userAddedWallets = ref<Wallet[]>([])

    onMounted(() => {
      readWallets().then((wallets) => {
        userAddedWallets.value = wallets
      })
    })

    const handleItemClick = (index: number) => {
      const selectedWallet = userAddedWallets.value[index]
      store.commit('setAddRecord', {
        wallet: selectedWallet.name,
      })
      router.back()
    }

    return {
      userAddedWallets,
      handleItemClick,
    }
  },
}
</script>
