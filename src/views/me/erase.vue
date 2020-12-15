<template>
  <div class="clear">
    <ViewingArea title="还原"></ViewingArea>

    <Group>
      <Cell title="抹除所有记账记录" @click="eraseRecord" link></Cell>
      <Cell title="抹除所有钱包" @click="eraseWallet" link></Cell>
    </Group>

    <Tabbar @back="destoryAllToasts"></Tabbar>
  </div>
</template>

<script lang="ts">
import ViewingArea from '@/components/ViewingArea.vue'
import Tabbar from '@/components/Tabbar.vue'
import Group from '@/components/Group.vue'
import Cell from '@/components/Cell.vue'
import { clearRecord } from '@/db'
import 'vercel-toast/dist/vercel-toast.css'
import { createToast, destoryAllToasts } from 'vercel-toast'
import { useStore } from '@/store'
import { isDarkMode } from '@/utils'
import { clearWallet } from '@/db/wallet'
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

    const baseToast = (msg: string, p: Promise<any>, cb: Function) => {
      createToast(`确认抹除所有${msg}吗？`, {
        type: 'error',
        cancel: '取消',
        action: {
          text: '抹除',
          callback: (toast) => {
            p.then(() => {
              toast.destory()
              successToast()
              cb()
            })
          },
        },
      })
    }

    const eraseRecord = () => {
      baseToast('记账记录', clearRecord(), () => {
        store.commit('setRecords', [])
      })
    }

    const eraseWallet = () => {
      baseToast('钱包', clearWallet(), () => {})
    }

    return {
      eraseRecord,
      eraseWallet,
      destoryAllToasts,
    }
  },
}
</script>
