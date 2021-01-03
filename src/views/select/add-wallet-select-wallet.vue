<template>
  <PageSelect
    title="钱包"
    :items="supportedWallets"
    @item-click="handleItemClick"
  />
</template>

<script lang="ts">
import { supportedWallets } from '@app/model/Wallet'
import PageSelect from '@app/layout/PageSelect.vue'
import { useRouter } from 'vue-router'

export default {
  components: { PageSelect },
  setup() {
    const router = useRouter()
    const handleItemClick = (index: number) => {
      const selectedWallet = supportedWallets[index]
      router.push({
        path: '/me/add-wallet',
        query: {
          name: selectedWallet.name,
          icon: selectedWallet.icon,
        },
      })
    }

    return {
      supportedWallets,
      handleItemClick,
    }
  },
}
</script>
