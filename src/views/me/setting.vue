<template>
  <div class="page-setting">
    <ViewingArea title="设置"></ViewingArea>

    <Group>
      <Cell
        title="关于 Ahnn"
        :link="'/me/about-app'"
        :rightText="`版本 ${version}`"
      ></Cell>
      <Cell title="建议与反馈" :link="'/me/feedback'"></Cell>
    </Group>

    <Group>
      <Cell title="还原" :link="'/me/erase'"></Cell>
    </Group>

    <Tabbar></Tabbar>
  </div>
</template>

<script>
/* global __APP_VERSION__ */
import Group from '../../components/Group.vue'
import Cell from '../../components/Cell.vue'
import Tabbar from '../../components/Tabbar.vue'
import ViewingArea from '../../components/ViewingArea.vue'

export default {
  components: { Tabbar, ViewingArea, Group, Cell },

  setup() {
    return {
      version: __APP_VERSION__,
    }
  },
}
</script>
