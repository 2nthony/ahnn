<template>
  <div class="pane" :class="`evelation-${evelation}`"><slot /></div>
</template>

<script>
import { setProps } from '@/utils/setProps'
export default {
  props: {
    evelation: setProps('number'),
  },
}
</script>

<style lang="less" scoped>
.pane {
  --shadow-before: var(--shadow-color-default) 0px 0px 1px;

  &.evelation-0 {
    box-shadow: var(--shadow-before);
  }
  &.evelation-1 {
    box-shadow: var(--shadow-before), var(--shadow-color-dark) 0px 2px 4px -2px;
  }
  &.evelation-2 {
    box-shadow: var(--shadow-before), var(--shadow-color-dark) 0px 5px 8px -4px;
  }
  &.evelation-3 {
    box-shadow: var(--shadow-before), var(--shadow-color-dark) 0px 8px 10px -4px;
  }
  &.evelation-4 {
    box-shadow: var(--shadow-before),
      var(--shadow-color-dark) 0px 16px 24px -8px;
  }
}
</style>
