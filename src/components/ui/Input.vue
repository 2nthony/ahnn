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
  background-color: var(--button-default-bg-color);
  box-shadow: inset 0 0 0 1px var(--shadow-color-default),
    inset 0 1px 2px var(--shadow-color-muted);
  padding: 0 10px;
  height: 32px;
  border-radius: var(--radius);
  outline: none;
  color: var(--text-color-default);

  &:focus {
    box-shadow: inset 0 0 2px var(--shadow-color-muted), inset 0 0 0 1px #579ad9,
      0 0 0 3px rgba(16, 112, 202, 0.14);
  }
}
</style>
