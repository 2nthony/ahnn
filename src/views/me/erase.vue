<template>
  <div class="clear">
    <ViewingArea title="还原"></ViewingArea>

    <Group>
      <Cell title="抹除所有记账记录" @click="eraseRecord" link></Cell>
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
export default {
  components: { ViewingArea, Tabbar, Group, Cell },

  setup() {
    const eraseRecord = () => {
      createToast('将会抹除所有记账记录', {
        type: 'error',
        cancel: '取消',
        action: {
          text: '抹除',
          callback: (toast) => {
            toast.destory()
            clearRecord().then(() => {
              createToast('抹除完成', {
                timeout: 2000,
              })
            })
          },
        },
      })
    }

    return {
      eraseRecord,
      destoryAllToasts,
    }
  },
}
</script>
