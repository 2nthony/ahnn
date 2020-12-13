<template>
  <PageSelect
    title="选择钱包"
    :items="supportedWallets"
    @item-click="handleItemClick"
  />
</template>

<script lang="ts">
import { supportedWallets } from '@/model/Wallet'
import Group from '@/components/Group.vue'
import PageSelect from '@/layout/PageSelect.vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'

export default {
  components: { Group, PageSelect },
  setup() {
    const store = useStore()
    const router = useRouter()
    const handleItemClick = (index: number) => {
      const selectedWallet = supportedWallets[index]
      store.commit('setAddRecord', {
        wallet: selectedWallet.name,
      })
      router.back()
    }

    return {
      supportedWallets,
      handleItemClick,
    }
  },
}
</script>
