<template>
  <div class="clear">
    <ViewingArea title="清空记账记录"></ViewingArea>

    <Group title="确认清空后将会清空所有记账记录！">
      <Cell title="清空记账记录" @click="clear" link></Cell>
    </Group>

    <Tabbar></Tabbar>
  </div>
</template>

<script lang="ts">
import ViewingArea from '@/components/ViewingArea.vue'
import Tabbar from '@/components/Tabbar.vue'
import Group from '@/components/Group.vue'
import Cell from '@/components/Cell.vue'
import { clearRecord } from '@/db'
import 'vercel-toast/dist/vercel-toast.css'
import { createToast } from 'vercel-toast'
export default {
  components: { ViewingArea, Tabbar, Group, Cell },

  setup() {
    const clear = () => {
      createToast('确认清除记账记录吗？', {
        cancel: '取消',
        action: {
          text: '确认',
          callback: (toast) => {
            toast.destory()
            clearRecord().then(() => {
              createToast('清空完成', {
                timeout: 2000,
              })
            })
          },
        },
      })
    }

    return {
      clear,
    }
  },
}
</script>
