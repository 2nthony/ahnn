<template>
  <span
    class="text"
    :style="`--text-color: var(--text-color-${color})`"
    :class="`size-${size}`"
    ><slot
  /></span>
</template>

<script lang="ts">
import { setProps } from '../../utils/setProps'

export default {
  props: {
    size: setProps('number', 400),
    color: setProps('string', 'default'),
  },
}
</script>

<style lang="less" scoped>
.text {
  color: var(--text-color);
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.05px;

  &.size-300 {
    font-size: 12px;
    letter-spacing: 0;
    line-height: 16px;
  }

  &.size-400 {
    font-size: 14px;
  }

  &.size-500 {
    font-size: 16px;
  }
}
</style>
