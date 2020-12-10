<template>
  <input
    v-bind="$attrs"
    :type="type"
    :value="modelValue"
    @input="(e) => $emit('update:modelValue', e.target.value)"
  />
</template>

<script lang="ts">
import { setProps } from '../../utils/setProps'

export default {
  props: {
    type: setProps('string', 'text'),
    modelValue: setProps('string'),
  },
}
</script>

<style lang="less" scoped>
input {
  border: none;
  background-color: var(--ahnn-background);
  box-shadow: inset 0 0 0 1px var(--accents-2), inset 0 1px 2px var(--accents-2);
  padding: 0 10px;
  height: 32px;
  border-radius: var(--radius);
  outline: none;
  color: var(--ahnn-foreground);

  &:focus {
    box-shadow: inset 0 0 0 1px var(--ahnn-foreground);
  }
}
</style>
