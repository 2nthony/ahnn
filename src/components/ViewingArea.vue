<template>
  <div class="viewing-area">
    <slot>
      <div class="title">
        <Heading :size="900">{{ title }}</Heading>
      </div>
    </slot>
  </div>
</template>

<script>
import Heading from '../components/ui/Heading.vue'
import { setProps } from '../utils/setProps'
export default {
  components: { Heading },
  props: {
    title: setProps('string'),
  },
}
</script>

<style lang="less" scoped>
.viewing-area {
  width: 100%;
  height: 230px;
  display: flex;
  align-items: center;
  justify-content: center;

  & .title {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 16px 0;
  }
}
</style>
