<template>
  <div class="button-group"><slot /></div>
</template>

<style lang="less">
.button-group {
  & button {
    & + button {
      margin-left: 0 !important;
    }

    &:not(:last-child) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    &:not(:first-child) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}
</style>
