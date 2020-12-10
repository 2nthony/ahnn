<template>
  <div class="pane" :data-float="float">
    <slot />
  </div>
</template>

<script>
import { setProps } from '@/utils/setProps'

export default {
  props: {
    float: setProps('number'),
  },
}
</script>

<style lang="less" scoped>
.pane {
  box-shadow: var(--float-level);

  &[data-float='1'] {
    --float-level: var(--float-1);
  }
  &[data-float='2'] {
    --float-level: var(--float-2);
  }
  &[data-float='3'] {
    --float-level: var(--float-3);
  }
  &[data-float='4'] {
    --float-level: var(--float-4);
  }
  &[data-float='5'] {
    --float-level: var(--float-5);
  }
}
</style>
