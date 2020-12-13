<template>
  <PageSelect
    title="钱包"
    :items="userAddedWallets"
    @item-click="handleItemClick"
  />
</template>

<script lang="ts">
import { Wallet } from '@/model/Wallet'
import Group from '@/components/Group.vue'
import PageSelect from '@/layout/PageSelect.vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import { onMounted, ref } from 'vue'
import { readWallets } from '@/db/wallet'

export default {
  components: { Group, PageSelect },
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
