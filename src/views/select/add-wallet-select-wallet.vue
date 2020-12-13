<template>
  <PageSelect
    title="钱包"
    :items="supportedWallets"
    @item-click="handleItemClick"
  />
</template>

<script lang="ts">
import { supportedWallets } from '@/model/Wallet'
import Group from '@/components/Group.vue'
import PageSelect from '@/layout/PageSelect.vue'
import { useRouter } from 'vue-router'

export default {
  components: { Group, PageSelect },
  setup() {
    const router = useRouter()
    const handleItemClick = (index: number) => {
      const selectedWallet = supportedWallets[index]
      router.push({
        path: '/me/add-wallet',
        query: {
          name: selectedWallet.name,
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
