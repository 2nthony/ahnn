<template>
  <div class="input-date-wrapper">
    <slot name="placeholder" />
    <Input
      :modelValue="modelValue"
      :type="type"
      class="input-date"
      :class="{ transparent: $slots.placeholder }"
      @update:modelValue="(val) => $emit('update:modelValue', val)"
    />
  </div>
</template>

<script lang="ts">
import { setProps } from '../utils/setProps'
import Input from './ui/Input.vue'

export default {
  components: { Input },
  props: {
    type: setProps('string', 'date'),
    modelValue: setProps('string'),
  },
}
</script>

<style lang="less" scoped>
.input-date-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.input-date {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &.transparent {
    opacity: 0;
  }

  &::-webkit-calendar-picker-indicator {
    outline: none;
    background: none;
    color: transparent;
    height: auto;
    width: auto;
    position: absolute;
    bottom: 0;
    // 不知道它有多长
    left: -50%;
    right: 0;
    top: 0;
    cursor: pointer;
  }
}
</style>
