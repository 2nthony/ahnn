<template>
  <div class="page-about-app">
    <ViewingArea title="Ahnn"></ViewingArea>

    <Cell>
      <CellItem
        title="历史更新"
        :link="'/me/changelog'"
      ></CellItem>
    </Cell>

    <Tabbar></Tabbar>
  </div>
</template>

<script lang="ts">
import Cell from '../../components/Cell.vue'
import CellItem from '../../components/CellItem.vue'
import Tabbar from '../../components/Tabbar.vue'
import ViewingArea from '../../layout/ViewingArea.vue'

export default {
  components: {
    Tabbar,
    ViewingArea,
    Cell,
    CellItem
  }
}
</script>
