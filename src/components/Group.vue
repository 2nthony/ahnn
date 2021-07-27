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
import { setProps } from '@app/utils/setProps'
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
  border-radius: var(--geist-radius);

  & + .group {
    margin-top: var(--geist-gap);
  }

  & .title-group {
    display: flex;
    justify-content: space-between;
    padding: 0 var(--geist-gap);
    margin-bottom: var(--geist-gap-half);
  }
}
</style>
