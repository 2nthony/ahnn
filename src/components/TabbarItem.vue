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
  cursor: pointer;
  width: 100%;
  height: 100%;

  &:hover {
    backdrop-filter: saturate(180%) blur(10px);
  }

  &:active {
    background-color: var(--tabbar-background);
    backdrop-filter: saturate(180%) blur(20px);
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
