<template>
  <div class="TabbarItem">
    <slot />
  </div>
</template>

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
    background-color: var(--accents-2);
  }
}
</style>
