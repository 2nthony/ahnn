<template>
  <div class="select" :class="{ small }">
    <select
      v-bind="$attrs"
      @input="(e) => $emit('update:modelValue', e.target.value)"
    >
      <slot />
    </select>

    <div class="arrow">
      <RemixIcon :icon="'arrow-down-s'" line />
    </div>
  </div>
</template>

<script lang="ts">
import { setProps } from '@/utils/setProps'
import RemixIcon from '../RemixIcon.vue'
export default {
  components: { RemixIcon },
  props: {
    small: setProps('boolean'),
    modelValue: setProps(['string', 'number']),
  },
}
</script>

<style lang="less" scoped>
.select {
  appearance: none;
  color: var(--ahnn-foreground);
  background: var(--ahnn-background);
  display: inline-flex;
  outline: none;
  border: 1px solid var(--accents-2);
  text-transform: uppercase;
  user-select: none;
  font-weight: 100;
  position: relative;
  overflow: hidden;
  transition: border 0.2s ease 0s, color 0.2s ease-out 0s,
    box-shadow 0.2s ease 0s;
  border-radius: var(--ahnn-radius);
  white-space: nowrap;
  line-height: 0;
  height: calc(9 * var(--ahnn-space));
  width: auto;
  min-width: 160px;

  & select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    height: 100%;
    border: none;
    box-shadow: none;
    background: transparent;
    background-image: none;
    color: currentColor;
    font-size: 14px;
    margin-right: -20px;
    width: calc(100% + 20px);
    padding: 0 var(--ahnn-gap-half);
    text-transform: none;
    &:-moz-focusring {
      color: transparent;
      text-shadow: 0 0 0 #000;
    }
    &:focus {
      outline: none;
    }
  }

  & .arrow {
    background: var(--ahnn-background);
    width: 30px;
    height: 100%;
    position: absolute;
    right: 0px;
    pointer-events: none;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    transition: border 0.2s ease 0s;
  }

  &:hover,
  &:focus-within {
    border-color: var(--accents-5);
  }

  &.small {
    min-width: 105px;
    height: var(--ahnn-gap);

    & select {
      font-size: 12px;
    }

    & .arrow {
      width: 25px;
    }
  }
}
</style>
