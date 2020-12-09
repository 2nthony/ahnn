<template>
  <div class="card"><slot /></div>
</template>

<style lang="less" scoped>
.card {
  border-radius: 20px;
  overflow: hidden;
  border: solid 1px var(--button-border-color);
}
</style>
