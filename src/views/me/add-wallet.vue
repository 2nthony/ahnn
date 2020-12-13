<template>
  <div class="page-add-wallet">
    <ViewingArea title="添加到钱包"></ViewingArea>

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
      :mainText="'保存'"
      :mainIcon="'check'"
      @main-click="handleSave"
    ></Tabbar>
  </div>
</template>

<script lang="ts">
import ViewingArea from '@/components/ViewingArea.vue'
import Tabbar from '@/components/Tabbar.vue'
import { ref } from 'vue'
import Input from '@/components/ui/Input.vue'
import { useRoute, useRouter } from 'vue-router'
import 'vercel-toast/dist/vercel-toast.css'
import { addWallet, readWalletByName } from '@/db/wallet'
import { deepToRaw } from '@/utils'
import { createToast } from 'vercel-toast'

export default {
  components: { ViewingArea, Tabbar, Input },

  setup() {
    const route = useRoute()
    const router = useRouter()
    const { name, icon } = route.query

    const form = ref({
      name,
      icon,
      balance: null,
    })

    const checkIsExisting = async () => {
      return readWalletByName(form.value.name as string)
    }
    const handleSave = async () => {
      if (await checkIsExisting()) {
        createToast(
          `相同名称钱包已存在，是否同意更改为\`${form.value.name}1\`并且保存？`,
          {
            type: 'error',
            action: {
              callback(toast) {
                form.value.name = form.value.name + '1'
                toast.destory()
                handleSave()
              },
              text: '同意',
            },
            cancel: '取消',
          },
        )
        return
      }

      addWallet(
        deepToRaw({ ...form.value, balance: Number(form.value.balance || 0) }),
      ).then(() => {
        router.push('/me/wallet')
      })
    }

    return {
      form,
      handleSave,
    }
  },
}
</script>

<style lang="less" scoped>
.input-wallet-form {
  display: flex;
  flex-direction: column;

  & .input-name {
    margin-bottom: var(--inline-gap);
  }
}
</style>
