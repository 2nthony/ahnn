<template>
  <div class="Tabbar">
    <TabbarItem @click="handleBack">
      <chevron-left />
      <Text :size="300">{{ leftText }}</Text>
    </TabbarItem>

    <TabbarItem v-if="$slots['main-icon']" @click="$emit('main-click')">
      <slot name="main-icon"></slot>
      <Text :size="300">{{ mainText }}</Text>
    </TabbarItem>

    <TabbarItem v-if="$slots['right-icon']" @click="$emit('right-click')">
      <slot name="right-icon"></slot>
      <Text :size="300">{{ rightText }}</Text>
    </TabbarItem>
  </div>
</template>

<script>
import setProps from '../utils/setProps'
import TabbarItem from './TabbarItem.vue'
import ChevronLeft from '../feather/chevron-left.svg'
import Text from './ui/Text.vue'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: { TabbarItem, ChevronLeft, Text },
  props: {
    leftText: setProps('string', '返回'),
    mainText: setProps('string'),
    rightText: setProps('string'),
  },

  setup(_props, { emit }) {
    const router = useRouter()
    const handleBack = () => {
      router.back()
      emit('back')
    }

    return { handleBack }
  },
})
</script>

<style lang="less" scoped src="./styles/Tabbar.less"></style>
