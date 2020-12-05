<template>
  <div class="cell">
    <div class="title-group">
      <Heading :size="400" class="title">{{ title }}</heading>
    </div>

    <slot></slot>
  </div>
</template>

<script>
import setProps from '../utils/setProps'
import Heading from './ui/Heading.vue'
export default {
  components: { Heading },
  props: {
    title: setProps('string')
  }
}
</script>

<style lang="less" scoped>
.cell {
  border-radius: var(--radius);

  & + .cell {
    margin-top: 14px;
  }

  & .title-group {
    display: flex;
    justify-content: space-between;
    padding: 0 var(--gap);
  }
}
</style>
