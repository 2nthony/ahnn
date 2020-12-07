<template>
  <div class="card"><slot /></div>
</template>

<style lang="less" scoped>
.card {
  border-radius: 10px;
  overflow: hidden;

  & + .card {
    margin-top: var(--inline-gap);
  }
}
</style>
