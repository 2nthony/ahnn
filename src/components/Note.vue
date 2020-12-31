<template>
  <div
    :class="[
      'Note',
      'text-foreground',
      'py-gap-half',
      'px-gap',
      type,
      fill && 'fill',
    ]"
  >
    <span class="uppercase inline-block" v-if="label || $slots.title">
      <b v-if="label">{{ label }}: </b>
      <slot v-if="$slots.title" name="title" />
    </span>

    <template v-if="$slots.default">
      <br /><br />

      <slot />
    </template>
  </div>
</template>

<script lang="ts">
import { setProps } from '@/utils/setProps'
export default {
  props: {
    type: setProps('string'),
    fill: setProps('boolean'),
    label: setProps(['boolean', 'string'], 'note'),
  },
}
</script>

<style lang="less" scoped>
.Note {
  border-radius: var(--geist-radius);
  border: 1px solid var(--accents-7);
  color: var(--geist-foreground);

  &.error {
    border-color: var(--geist-error);
    color: var(--geist-error);
  }

  &.warning {
    border-color: var(--geist-warning);
    color: var(--geist-warning);
  }

  &.success {
    border-color: var(--geist-success);
    color: var(--geist-success);
  }

  &.fill {
    &.error {
      background-color: var(--geist-error);
    }

    &.warning {
      background-color: var(--geist-warning);
    }

    &.success {
      background-color: var(--geist-success);
    }
  }
}
</style>
