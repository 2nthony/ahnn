<template>
  <input
    v-bind="$attrs"
    :type="type"
    :value="modelValue"
    @input="e => $emit('update:modelValue', e.target.value)"
  >
</template>

<script lang="ts">
import setProps from '../../utils/setProps'

export default {
  props: {
    type: setProps('string', 'text'),
    modelValue: setProps('string')
  }
}
</script>

<style lang="less" scoped>
input {
  border: none;
  background-color: var(--button-default-bg-color);
  border: 1px solid var(--button-border-color);
  padding: 0 10px;
  height: 32px;
  border-radius: var(--radius);
  outline: none;
  color: var(--text-color-default);

  &:focus {
    border: 1px solid var(--text-color-selected);
  }
}
</style>
