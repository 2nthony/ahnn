<template>
  <div class="page-about-app">
    <ViewingArea title="Ahnn"></ViewingArea>

    <Group>
      <CellItem title="历史更新" :link="'/me/changelog'"></CellItem>
    </Group>

    <Tabbar></Tabbar>
  </div>
</template>

<script lang="ts">
import Group from '../../components/Group.vue'
import CellItem from '../../components/CellItem.vue'
import Tabbar from '../../components/Tabbar.vue'
import ViewingArea from '../../components/ViewingArea.vue'

export default {
  components: {
    Tabbar,
    ViewingArea,
    Group,
    CellItem,
  },
}
</script>
