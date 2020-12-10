<template>
  <button :class="appearance"><slot /></button>
</template>

<script>
import { setProps } from '../../utils/setProps'
export default {
  props: {
    appearance: setProps('string', 'default'),
  },
}
</script>

<style lang="less" scoped>
button {
  color: #fff;
  background-image: linear-gradient(to bottom, var(--lg-start), var(--lg-end));
  border-radius: var(--button-radius);
  padding: 0 16px;
  height: 32px;
  line-height: 32px;
  outline: none;
  cursor: pointer;
  border: none;
  box-shadow: inset 0 0 0 1px var(--shadow-color-default),
    inset 0 -1px 1px 0 rgba(67, 90, 111, 0.06);

  & + button {
    margin-left: 16px;
  }

  &:hover {
    background-image: linear-gradient(
      to bottom,
      var(--lg-start),
      var(--lg-end)
    );
  }
  &:active {
    background-image: linear-gradient(
      to bottom,
      var(--active-color),
      var(--active-color)
    );
  }
  &:focus {
    box-shadow: 0 0 0 3px var(--shadow-color-main),
      inset 0 0 0 1px var(--shadow-color-default),
      inset 0 -1px 1px 0 var(--shadow-color-mute);
  }

  &.default {
    --lg-start: #ffffff;
    --lg-end: #f4f5f7;
    color: var(--text-color-default);
    &:hover {
      --lg-start: #fafbfb;
      --lg-end: #eaecee;
    }
    &:active {
      background-image: none;
      background-color: rgba(16, 112, 202, 0.09);
    }
    &:focus {
      --shadow-color-main: rgba(16, 112, 202, 0.14);
    }
  }

  &.primary {
    --lg-start: #0788de;
    --lg-end: #116ab8;
    &:hover {
      --lg-start: #0679c5;
      --lg-end: #0f5da1;
    }
    &:active {
      --active-color: #0f5da1;
    }
    &:focus {
      --shadow-color-main: rgba(7, 136, 222, 0.4);
    }
  }

  &.success {
    --lg-start: #23c277;
    --lg-end: #399d6c;
    &:hover {
      --lg-start: #1fac6a;
      --lg-end: #328a5f;
    }
    &:active {
      --active-color: #328a5f;
    }
    &:focus {
      --shadow-color-main: rgba(35, 194, 119, 0.4);
    }
  }

  &.warning {
    --lg-start: #ee9913;
    --lg-end: #d9822b;
    &:hover {
      --lg-start: #d88a10;
      --lg-end: #c77524;
    }
    &:active {
      --active-color: #c77524;
    }
    &:focus {
      --shadow-color-main: rgba(238, 153, 19, 0.4);
    }
  }

  &.danger {
    --lg-start: #ec4c47;
    --lg-end: #d64540;
    &:hover {
      --lg-start: #ea3530;
      --lg-end: #d0322d;
    }
    &:active {
      --active-color: #d0322d;
    }
    &:focus {
      --shadow-color-main: rgba(236, 76, 71, 0.4);
    }
  }
}
</style>
