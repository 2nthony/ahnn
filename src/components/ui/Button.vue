<template>
  <button :class="[type, size]"><slot /></button>
</template>

<script lang="ts">
import { setProps } from '@app/utils/setProps'
export default {
  props: {
    type: setProps('string'),
    size: setProps('string'),
  },
}
</script>

<style lang="less" scoped>
button {
  --themed-fg: var(--geist-background);
  --themed-bg: var(--geist-foreground);
  color: var(--themed-fg, var(--geist-foreground));
  border-radius: var(--geist-radius);
  padding: 0 var(--geist-gap-half);
  font-size: var(--geist-form-font);
  height: var(--geist-form-height);
  line-height: var(--geist-form-inline-height);
  outline: none;
  cursor: pointer;
  border: 1px solid var(--themed-border, var(--themed-bg));
  background-color: var(--themed-bg);

  & + button {
    margin-left: var(--geist-gap-half);
  }

  // size
  &.small {
    font-size: var(--geist-form-small-font);
    height: var(--geist-form-small-height);
    line-height: var(--geist-form-small-inline-height);
  }
  &.large {
    font-size: var(--geist-form-large-font);
    height: var(--geist-form-large-height);
    line-height: var(--geist-form-large-inline-height);
  }

  // type
  &:hover {
    color: var(--themed-bg, var(--themed-fg));
    background-color: transparent;
  }
  &:active {
    background-color: var(--accents-2);
  }

  &.secondary {
    --themed-fg: var(--geist-secondary);
    --themed-bg: var(--geist-background);
    --themed-border: var(--accents-2);

    &:hover {
      --themed-fg: var(--geist-foreground);
      --themed-border: var(--geist-foreground);
      color: var(--geist-foreground);
    }
  }

  &.success {
    --themed-fg: #fff;
    --themed-bg: var(--geist-success);
  }

  &.warning {
    --themed-fg: #fff;
    --themed-bg: var(--geist-warning);
  }

  &.error {
    --themed-fg: #fff;
    --themed-bg: var(--geist-error);
  }

  &[disabled] {
    background: var(--accents-1);
    color: var(--accents-3);
    border-color: var(--accents-2);
    cursor: not-allowed;
  }
}
</style>
