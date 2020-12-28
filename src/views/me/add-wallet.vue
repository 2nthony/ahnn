<template>
  <div class="page-add-wallet">
    <ViewingArea :title="title"></ViewingArea>

    <form class="input-wallet-form">
      <Input v-model="form.name" class="input-name" placeholder="钱包名称" />
      <Input
        v-model="form.balance"
        type="number"
        inputmode="decimal"
        placeholder="钱包余额"
      />
    </form>

    <Tabbar
      :backDeep="backDeep"
      :mainText="'保存'"
      :mainIcon="'check'"
      @main-click="handleSave"
      :rightIcon="rightTabbar.rightIcon"
      :rightText="rightTabbar.rightText"
      @right-click="rightTabbar.rightClick"
    ></Tabbar>
  </div>
</template>

<script lang="ts">
import ViewingArea from '@/components/ViewingArea.vue'
import Tabbar from '@/components/Tabbar.vue'
import Input from '@/components/ui/Input.vue'
import { addWalletStrategy } from '@/strategies/pageAddWalletStrategy'

export default {
  components: { ViewingArea, Tabbar, Input },

  setup() {
    return addWalletStrategy()
  },
}
</script>

<style lang="less" scoped>
.input-wallet-form {
  display: flex;
  flex-direction: column;

  & .input-name {
    margin-bottom: var(--geist-gap-half);
  }
}
</style>
