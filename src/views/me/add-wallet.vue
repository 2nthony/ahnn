<template>
  <div class="page-add-wallet">
    <ViewingArea :title="title"></ViewingArea>

    <form class="input-wallet-form">
      <Input v-model="form.name" class="input-name" placeholder="钱包名称" />
      <Input
        ref="inputBalanceEl"
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
import ViewingArea from '@app/components/ViewingArea.vue'
import Tabbar from '@app/components/Tabbar.vue'
import Input from '@app/components/ui/Input.vue'
import { addWalletStrategy } from '@app/strategies/pageAddWalletStrategy'
import { ComponentPublicInstance, nextTick, onMounted, ref } from 'vue'

export default {
  components: { ViewingArea, Tabbar, Input },

  setup() {
    const inputBalanceEl = ref<ComponentPublicInstance<
      HTMLInputElement,
      { el: any }
    > | null>(null)

    onMounted(() => {
      nextTick(() => inputBalanceEl.value?.el.focus())
    })

    return {
      inputBalanceEl,
      ...addWalletStrategy(),
    }
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
