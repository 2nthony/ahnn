<template>
  <h2 class="heading" :class="`size-${size}`"><slot/></h2>
</template>

<script lang="ts">
import setProps from '../../utils/setProps'

export default {
  props: {
    size: setProps('number', 500)
  },
}
</script>

<style lang="less" scoped>
.heading {
  color: #234361;
  font-weight: 500;

  // small
  &.size-100, &.size-200, &.size-300 {
    font-size: 12px;
    font-weight: 600;
    line-height: 16px;
  }
  &.size-100 {
    font-size: 11px;
    font-weight: 400;
    color: #66788a;
  }
  &.size-200 {
    color: #66788a;
  }

  // medium
  &.size-400, &.size-500, &.size-600 {
    line-height: 20px;
    letter-spacing: -0.05px;
  }
  &.size-400 {
    font-size: 14px;
    font-weight: 600;
  }
  &.size-500 {
    font-size: 16px;
  }
  &.size-600 {
    font-size: 20px;
    line-height: 24px;
  }

  // large
  &.size-700, &.size-800 {
    letter-spacing: -0.2px;
  }
  &.size-700 {
    font-size: 24px;
    line-height: 28px;
    letter-spacing: -0.07px;
  }
  &.size-800 {
    font-size: 29px;
    line-height: 32px;
  }
  &.size-900 {
    font-size: 35px;
    line-height: 40px;
  }
}
</style>
