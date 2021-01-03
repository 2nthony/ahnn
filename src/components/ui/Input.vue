<template>
  <input
    v-bind="$attrs"
    :type="type"
    :value="modelValue"
    @input="(e) => $emit('update:modelValue', e.target.value)"
  />
</template>

<script lang="ts">
import { setProps } from '@app/utils/setProps'

export default {
  props: {
    type: setProps('string', 'text'),
    modelValue: setProps(['string', 'number']),
  },
}
</script>

<style lang="less" scoped>
input {
  border: 1px solid var(--accents-2);
  background-color: var(--geist-background);
  padding: 0 var(--geist-gap-half);
  height: var(--geist-form-height);
  border-radius: var(--geist-radius);
  outline: none;
  color: var(--geist-foreground);

  &:focus {
    border: 1px solid var(--geist-foreground);
  }
}
</style>
