<template>
  <div class="page-oss-license">
    <ViewingArea title="开源软件许可">
      <img
        src="/img/illustrations/undraw_open_source_1qxw.svg"
        alt="OSS-License"
        class="h-full"
      />
    </ViewingArea>

    <Pane class="dep" v-for="(dep, index) in dependencies" :key="index">
      <Card
        :title="dep.name"
        :rightText="`${dep.license} licensed`"
        :content="dep.homepage"
      ></Card>
    </Pane>

    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@app/components/Tabbar.vue'
import Heading from '@app/components/ui/Heading.vue'
import Pane from '@app/components/ui/Pane.vue'
import ViewingArea from '@app/components/ViewingArea.vue'
import Card from '@app/components/Card.vue'
/* global __DEPENDENCIES__ */
export default {
  components: { Tabbar, Heading, Pane, ViewingArea, Card },
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
    margin-bottom: var(--geist-gap);

    & .license {
      margin-top: var(--geist-gap-half);
    }
  }
}
</style>
