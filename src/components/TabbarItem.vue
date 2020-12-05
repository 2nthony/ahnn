<template>
  <div class="TabbarItem">
    <slot />
  </div>
</template>

<script>
// import setProps from '../utils/setProps'

export default {
  props: {},
}
</script>

<style lang="less" scoped>
.TabbarItem {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  max-width: 33.33%;
  height: inherit;

  &:active {
    background-color: var(--active-bg-color);
  }
}
</style>
