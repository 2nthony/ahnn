<template>
  <div class="page-wallet">
    <ViewingArea title="钱包"></ViewingArea>

    <!--
      TODO should use `Group` to wrap cards but with
      issue: https://github.com/vuejs/vue-next/issues/2804
    -->
    <Card
      v-for="(wallet, index) in wallets"
      :key="index"
      :titleIcon="wallet.icon"
      :title="wallet.name"
      :content="`余额：${Number(wallet.balance).toFixed(2)}`"
      @click="handleToDetail(wallet)"
    ></Card>

    <Tabbar
      :mainText="'添加'"
      :mainIcon="'add-circle'"
      @main-click="$router.push('/select/add-wallet-select-wallet')"
    ></Tabbar>
  </div>
</template>

<script lang="ts">
import ViewingArea from '@/components/ViewingArea.vue'
import Tabbar from '@/components/Tabbar.vue'
import RemixIcon from '@/components/RemixIcon.vue'
import { computed, defineComponent, onMounted, ref } from 'vue'
import { readWallets } from '@/db/wallet'
import { Wallet } from '@/model/Wallet'
import Card from '@/components/Card.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: { ViewingArea, Tabbar, RemixIcon, Card },

  setup() {
    const router = useRouter()
    const wallets = ref<Wallet[]>([])

    onMounted(() => {
      readWallets().then((data) => {
        wallets.value = data
      })
    })

    const handleToDetail = (wallet: Wallet) => {
      router.push({
        path: '/me/wallet-detail',
        query: { name: wallet.name },
      })
    }

    return {
      wallets,
      handleToDetail,
    }
  },
})
</script>
