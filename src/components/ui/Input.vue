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
    modelValue: setProps(['string', 'number']),
  },
}
</script>

<style lang="less" scoped>
input {
  border: none;
  background-color: var(--geist-background);
  box-shadow: inset 0 0 0 1px var(--accents-2), inset 0 1px 2px var(--accents-2);
  padding: 0 10px;
  height: var(--geist-form-height);
  border-radius: var(--geist-radius);
  outline: none;
  color: var(--geist-foreground);

  &:focus {
    box-shadow: inset 0 0 0 1px var(--geist-foreground);
  }
}
</style>
