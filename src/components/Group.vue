<template>
  <div class="group">
    <div class="title-group" v-if="title || rightText">
      <Heading class="title">{{ title }}</Heading>
      <Heading :size="300" class="right-text">{{ rightText }}</Heading>
    </div>

    <slot></slot>
  </div>
</template>

<script>
import { setProps } from '../utils/setProps'
import Heading from './ui/Heading.vue'
export default {
  components: { Heading },
  props: {
    title: setProps('string'),
    rightText: setProps('string'),
  },
}
</script>

<style lang="less" scoped>
.group {
  border-radius: var(--ahnn-radius);

  & + .group {
    margin-top: var(--ahnn-gap);
  }

  & .title-group {
    display: flex;
    justify-content: space-between;
    padding: 0 var(--ahnn-gap);
    margin-bottom: var(--ahnn-gap-half);
  }
}
</style>
