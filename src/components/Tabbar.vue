<template>
  <div class="tabbar">
    <TabbarItem @click="handleBack">
      <RemixIcon :icon="'arrow-left-s'" />
      <Text :size="300">{{ leftText }}</Text>
    </TabbarItem>

    <TabbarItem v-if="mainIcon" @click="$emit('main-click')">
      <RemixIcon :icon="mainIcon" />
      <Text :size="300">{{ mainText }}</Text>
    </TabbarItem>

    <TabbarItem v-if="rightIcon" @click="$emit('right-click')">
      <RemixIcon :icon="rightIcon" />
      <Text :size="300">{{ rightText }}</Text>
    </TabbarItem>
  </div>
</template>

<script>
import { setProps } from '@app/utils/setProps'
import TabbarItem from './TabbarItem.vue'
import Text from './ui/Text.vue'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import RemixIcon from './RemixIcon.vue'

export default defineComponent({
  components: { TabbarItem, Text, RemixIcon },
  props: {
    leftText: setProps('string', '返回'),
    mainIcon: setProps('string'),
    mainText: setProps('string'),
    rightIcon: setProps('string'),
    rightText: setProps('string'),
    backDeep: setProps('number', -1),
  },

  setup(props, { emit }) {
    const router = useRouter()
    const handleBack = () => {
      router.go(props.backDeep)
      emit('back')
    }

    return { handleBack }
  },
})
</script>

<style lang="less" scoped src="./styles/Tabbar.less"></style>
