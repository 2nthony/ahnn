<template>
  <div class="page-wallet">
    <ViewingArea title="钱包">
      <img
        src="/img/illustrations/undraw_wallet_aym5.svg"
        alt="Wallet"
        class="h-full"
      />
    </ViewingArea>

    <Group>
      <Card
        v-for="(wallet, index) in userWallets"
        :key="index"
        :titleIcon="wallet.icon"
        :title="wallet.name"
        :content="`余额：${Number(wallet.balance).toFixed(2)}`"
        @click="handleToDetail(wallet)"
      ></Card>
    </Group>

    <Tabbar
      :mainText="'添加钱包'"
      :mainIcon="'add-circle'"
      @main-click="$router.push('/select/add-wallet-select-wallet')"
    ></Tabbar>
  </div>
</template>

<script lang="ts">
import ViewingArea from '@app/components/ViewingArea.vue'
import Tabbar from '@app/components/Tabbar.vue'
import { defineComponent, onMounted, ref } from 'vue'
import { readWallets } from '@app/db/wallet'
import { Wallet } from '@app/model/Wallet'
import Card from '@app/components/Card.vue'
import { useRouter } from 'vue-router'
import Group from '@app/components/Group.vue'

export default defineComponent({
  components: { ViewingArea, Tabbar, Card, Group },

  setup() {
    const router = useRouter()
    const userWallets = ref<Wallet[]>([])

    readWallets().then((wallets) => {
      userWallets.value = wallets
    })

    const handleToDetail = (wallet: Wallet) => {
      router.push({
        path: '/me/wallet-detail',
        query: { name: wallet.name },
      })
    }

    return {
      userWallets,
      handleToDetail,
    }
  },
})
</script>
