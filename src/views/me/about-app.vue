<template>
  <div class="page-about-app">
    <ViewingArea title="Ahnn"></ViewingArea>

    <Group>
      <Cell title="历史更新" :link="'/me/changelog'"></Cell>
      <Cell title="开源软件许可" :link="'/me/oss-license'"></Cell>
    </Group>

    <Tabbar></Tabbar>
  </div>
</template>

<script lang="ts">
import Group from '@app/components/Group.vue'
import Cell from '@app/components/Cell.vue'
import Tabbar from '@app/components/Tabbar.vue'
import ViewingArea from '@app/components/ViewingArea.vue'

export default {
  components: {
    Tabbar,
    ViewingArea,
    Group,
    Cell,
  },
}
</script>
