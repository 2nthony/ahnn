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
import ViewingArea from '@app/components/ViewingArea.vue'
import Tabbar from '@app/components/Tabbar.vue'
import Group from '@app/components/Group.vue'
import Cell from '@app/components/Cell.vue'
import { clearRecord } from '@app/db/record'
import 'vercel-toast/dist/vercel-toast.css'
import { createToast, destoryAllToasts } from 'vercel-toast'
import { useStore } from '@app/store'
import { isDarkMode } from '@app/utils'
import { resetWallet } from '@app/db/wallet'
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
