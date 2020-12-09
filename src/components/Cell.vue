<template>
  <div class="cell">
    <div class="title-group" v-if="title || rightText">
      <Heading :size="400" class="title">{{ title }}</Heading>
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
.cell {
  border-radius: var(--radius);

  & + .cell {
    margin-top: var(--gap);
  }

  & .title-group {
    display: flex;
    justify-content: space-between;
    padding: 0 var(--gap);
    margin-bottom: var(--inline-gap);
  }
}
</style>
