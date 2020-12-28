<template>
  <div class="page-oss-license">
    <Pane class="dep" v-for="(dep, index) in dependencies" :key="index">
      <span>----------------------------------</span>
      <Heading>{{ dep.name }}</Heading>
      <span>----------------------------------</span>
      <Heading v-if="dep.homepage">{{ dep.homepage }}</Heading>
      <Heading class="license">Licensed under {{ dep.license }}</Heading>
    </Pane>

    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar.vue'
import Heading from '@/components/ui/Heading.vue'
import Pane from '@/components/ui/Pane.vue'
/* global __DEPENDENCIES__ */
export default {
  components: { Tabbar, Heading, Pane },
  setup() {
    return {
      dependencies: __DEPENDENCIES__,
    }
  },
}
</script>

<style lang="less" scoped>
.page-oss-license {
  & .dep {
    margin-bottom: var(--ahnn-gap);

    & .license {
      margin-top: var(--ahnn-gap-half);
    }
  }
}
</style>
