<template>
  <div class="tabbar">
    <TabbarItem
      :class="{ active: currentPath === '/chart' }"
      @click="switchTab('/chart')"
    >
      <RemixIcon :icon="'bar-chart-box'" />
      <Text :size="300">统计</Text>
    </TabbarItem>

    <TabbarItem
      :class="{ active: currentPath === '/' }"
      @click="switchTab(currentPath === '/' ? '/add-record' : '/')"
    >
      <template v-if="currentPath === '/'">
        <RemixIcon :icon="'quill-pen'" />
        <Text :size="300">记一笔</Text>
      </template>
      <template v-else>
        <RemixIcon :icon="'calendar-2'" />
        <Text :size="300">{{ currentMonth }} 月</Text>
      </template>
    </TabbarItem>

    <TabbarItem
      :class="{ active: currentPath === '/me' }"
      @click="switchTab('/me')"
    >
      <RemixIcon :icon="'user-3'" />
      <Text :size="300">我的</Text>
    </TabbarItem>
  </div>
</template>

<script lang="ts">
import TabbarItem from './TabbarItem.vue'
import { useRoute, useRouter } from 'vue-router'
import Text from './ui/Text.vue'
import { getCurrentMonth } from '../utils/date'
import RemixIcon from './RemixIcon.vue'

export default {
  components: { TabbarItem, Text, RemixIcon },

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
  color: var(--ahnn-link-color);

  & svg {
    fill: var(--ahnn-link-color);
  }
}
</style>
