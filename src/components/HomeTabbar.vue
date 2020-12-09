<template>
  <div class="tabbar">
    <TabbarItem
      :class="{ active: currentPath === '/chart' }"
      @click="switchTab('/chart')"
    >
      <RiPieChartLine />
      <Text :size="300">报表</Text>
    </TabbarItem>

    <TabbarItem
      :class="{ active: currentPath === '/' }"
      @click="switchTab(currentPath === '/' ? '/add-record' : '/')"
    >
      <template v-if="currentPath === '/'">
        <RiQuillPenLine />
        <Text :size="300">记一笔</Text>
      </template>
      <template v-else>
        <RiCalendar2Line />
        <Text :size="300">{{ currentMonth }} 月</Text>
      </template>
    </TabbarItem>

    <TabbarItem
      :class="{ active: currentPath === '/me' }"
      @click="switchTab('/me')"
    >
      <RiUserLine />
      <Text :size="300">我的</Text>
    </TabbarItem>
  </div>
</template>

<script lang="ts">
import TabbarItem from './TabbarItem.vue'
import { useRoute, useRouter } from 'vue-router'
import Text from './ui/Text.vue'
import { getCurrentMonth } from '../utils/date'
import {
  RiPieChartLine,
  RiUserLine,
  RiCalendar2Line,
  RiQuillPenLine,
} from 'vue-remix-icons'

export default {
  components: {
    TabbarItem,
    Text,
    RiPieChartLine,
    RiUserLine,
    RiCalendar2Line,
    RiQuillPenLine,
  },

  setup() {
    const router = useRouter()
    const route = useRoute()
    const currentMonth = getCurrentMonth()

    const switchTab = (url: string) => {
      router.push(url)
    }

    return {
      currentMonth,
      switchTab,
      currentPath: route.path,
    }
  },
}
</script>

<style lang="less" scoped src="./styles/Tabbar.less"></style>

<style lang="less" scoped>
.active {
  color: var(--text-color-selected);

  & svg {
    fill: var(--text-color-selected);
  }
}
</style>
