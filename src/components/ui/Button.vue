<template>
  <button :class="appearance"><slot/></button>
</template>

<script>
import setProps from '../../utils/setProps'
export default {
  props: {
    appearance: setProps('string', 'default')
  }
}
</script>

<style lang="less" scoped>
button {
  color: #fff;
  background-color: var(--button-default-bg-color);
  border-radius: var(--radius);
  padding: 0 16px;
  height: 32px;
  line-height: 32px;
  outline: none;
  cursor: pointer;
  border: solid 1px var(--button-border-color);

  & + button {
    margin-left: 16px;
  }

  &:hover {
    background-color: var(--button-default-hover-color);
  }
  &:active {
    background-color: var(--button-default-active-color);
  }
  &.default {
    color: var(--text-color-default);
  }

  &.primary {
    background-color: var(--button-primary-bg-color);

    &:hover {
      background-color: var(--button-primary-hover-color);
    }

    &:active {
      background-color: var(--button-primary-active-color);
    }
  }

  &.success {
    background-color: var(--button-success-bg-color);

    &:hover {
      background-color: var(--button-success-hover-color);
    }

    &:active {
      background-color: var(--button-success-active-color);
    }
  }

  &.warning {
    background-color: var(--button-warning-bg-color);

    &:hover {
      background-color: var(--button-warning-hover-color);
    }

    &:active {
      background-color: var(--button-warning-active-color);
    }
  }

  &.danger {
    background-color: var(--button-danger-bg-color);

    &:hover {
      background-color: var(--button-danger-hover-color);
    }

    &:active {
      background-color: var(--button-danger-active-color);
    }
  }
}
</style>
