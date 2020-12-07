<template>
  <div class="Tabbar">
    <TabbarItem
      :class="{ active: currentPath === '/chart' }"
      @click="switchTab('/chart')"
    >
      <pie-chart-icon></pie-chart-icon>
      <Text :size="300">报表</Text>
    </TabbarItem>

    <TabbarItem
      :class="{ active: currentPath === '/' }"
      @click="switchTab(currentPath === '/' ? '/add-record' : '/')"
    >
      <template v-if="currentPath === '/'">
        <edit3-icon></edit3-icon>
        <Text :size="300">记一笔</Text>
      </template>
      <template v-else>
        <calendar-icon></calendar-icon>
        <Text :size="300">{{ currentMonth }} 月</Text>
      </template>
    </TabbarItem>

    <TabbarItem
      :class="{ active: currentPath === '/me' }"
      @click="switchTab('/me')"
    >
      <user-icon></user-icon>
      <Text :size="300">我的</Text>
    </TabbarItem>
  </div>
</template>

<script lang="ts">
import TabbarItem from './TabbarItem.vue'
import PieChartIcon from '../feather/pie-chart.svg'
import CalendarIcon from '../feather/calendar.svg'
import UserIcon from '../feather/user.svg'
import Edit3Icon from '../feather/edit-3.svg'
import { useRoute, useRouter } from 'vue-router'
import Text from './ui/Text.vue'
import { getCurrentMonth } from '../utils/date'

export default {
  components: { TabbarItem, PieChartIcon, CalendarIcon, UserIcon, Edit3Icon, Text },

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
      currentPath: route.path
    }
  }
}
</script>

<style lang="less" scoped src="./styles/Tabbar.less"></style>

<style lang="less" scoped>
.active {
  color: var(--text-color-selected);
}
</style>
