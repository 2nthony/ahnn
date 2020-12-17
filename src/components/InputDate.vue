<template>
  <div class="input-date-wrapper">
    <slot name="placeholder" />
    <Input
      :modelValue="modelValue"
      v-bind="$attrs"
      :type="type"
      class="input-date"
      :class="{ 'has-placeholder': $slots.placeholder }"
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
}

.input-date {
  &.has-placeholder {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
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
