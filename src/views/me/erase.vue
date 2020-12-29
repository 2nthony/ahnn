<template>
  <div class="clear">
    <ViewingArea title="还原"></ViewingArea>

    <Group>
      <Cell title="抹除所有记账记录" @click="handleEraseRecord" link></Cell>
      <Cell title="还原钱包到初始状态" @click="handleResetWallet" link></Cell>
    </Group>

    <Tabbar @back="destoryAllToasts"></Tabbar>
  </div>
</template>

<script lang="ts">
import ViewingArea from '@/components/ViewingArea.vue'
import Tabbar from '@/components/Tabbar.vue'
import Group from '@/components/Group.vue'
import Cell from '@/components/Cell.vue'
import { clearRecord } from '@/db/record'
import 'vercel-toast/dist/vercel-toast.css'
import { createToast, destoryAllToasts } from 'vercel-toast'
import { useStore } from '@/store'
import { isDarkMode } from '@/utils'
import { resetWallet } from '@/db/wallet'
export default {
  components: { ViewingArea, Tabbar, Group, Cell },

  setup() {
    const store = useStore()

    const successToast = () => {
      createToast('抹除完成', {
        type: isDarkMode ? 'dark' : 'default',
        timeout: 2000,
      })
    }

    const baseToast = (msg: string, p: Function, cb: Function) => {
      createToast(msg, {
        type: 'error',
        cancel: '取消',
        action: {
          text: '抹除',
          callback: (toast) => {
            p().then(() => {
              toast.destory()
              successToast()
              cb()
            })
          },
        },
      })
    }

    const handleEraseRecord = () => {
      baseToast('确认抹除所有记账记录吗？', clearRecord, () => {
        store.commit('setRecords', [])
      })
    }

    const handleResetWallet = () => {
      baseToast(
        '确认还原钱包到初始状态吗，但始终会保留`现金`钱包。',
        resetWallet,
        () => {},
      )
    }

    return {
      handleEraseRecord,
      handleResetWallet,
      destoryAllToasts,
    }
  },
}
</script>
