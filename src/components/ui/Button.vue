<template>
  <button :class="type"><slot /></button>
</template>

<script lang="ts">
import { setProps } from '../../utils/setProps'
export default {
  props: {
    type: setProps('string'),
  },
}
</script>

<style lang="less" scoped>
button {
  --themed-fg: var(--ahnn-background);
  --themed-bg: var(--ahnn-foreground);
  color: var(--themed-fg, var(--ahnn-foreground));
  border-radius: var(--radius);
  padding: 0 16px;
  height: 32px;
  line-height: 32px;
  outline: none;
  cursor: pointer;
  border: none;
  box-shadow: inset 0 0 0 1px var(--themed-border, var(--themed-bg)),
    inset 0 -1px 1px 0 var(--themed-border, var(--themed-bg));
  background-color: var(--themed-bg);

  & + button {
    margin-left: 16px;
  }

  &:hover {
    color: var(--themed-bg, var(--themed-fg));
    background-color: transparent;
  }
  &:active {
    background-color: var(--accents-2);
  }

  &.secondary {
    --themed-fg: var(--ahnn-secondary);
    --themed-bg: var(--ahnn-background);
    --themed-border: var(--accents-2);

    &:hover {
      --themed-fg: var(--ahnn-foreground);
      --themed-border: var(--ahnn-foreground);
      color: var(--ahnn-foreground);
    }
  }

  &.success {
    --themed-fg: #fff;
    --themed-bg: var(--ahnn-success);
  }

  &.warning {
    --themed-fg: #fff;
    --themed-bg: var(--ahnn-warning);
  }

  &.error {
    --themed-fg: #fff;
    --themed-bg: var(--ahnn-error);
  }
}
</style>
