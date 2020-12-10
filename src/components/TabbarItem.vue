<template>
  <div class="tabbar-item">
    <slot />
  </div>
</template>

<style lang="less" scoped>
.tabbar-item {
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

<style lang="less">
.tabbar-item {
  & svg {
    width: 1.5rem;
    height: 1.5rem;
  }
}
</style>
