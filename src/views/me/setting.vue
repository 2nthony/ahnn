<template>
  <div class="page-setting">
    <ViewingArea title="设置"></ViewingArea>

    <Group>
      <CellItem title="建议与反馈" :link="'/me/feedback'"></CellItem>
      <CellItem
        title="关于 Ahnn"
        :link="'/me/about-app'"
        :rightText="`版本 ${version}`"
      ></CellItem>
    </Group>

    <Tabbar></Tabbar>
  </div>
</template>

<script>
/* global __APP_VERSION__ */
import Group from '../../components/Group.vue'
import CellItem from '../../components/CellItem.vue'
import Tabbar from '../../components/Tabbar.vue'
import ViewingArea from '../../components/ViewingArea.vue'

export default {
  components: { Tabbar, ViewingArea, Group, CellItem },

  setup() {
    return {
      version: __APP_VERSION__,
    }
  },
}
</script>
