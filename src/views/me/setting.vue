<template>
  <div class="page-setting">
    <ViewingArea title="设置"></ViewingArea>

    <Cell>
      <CellItem
        title="建议与反馈"
        :link="'/me/feedback'"
      ></CellItem>
      <CellItem
        title="关于 Ahnn"
        :link="'/me/about-app'"
        :rightText="'版本 0.0.1'"
      ></CellItem>
    </Cell>

    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Cell from '../../components/Cell.vue'
import CellItem from '../../components/CellItem.vue'
import Tabbar from '../../components/Tabbar.vue'
import ViewingArea from '../../layout/ViewingArea.vue'

export default {
  components: { Tabbar, ViewingArea, Cell, CellItem },
}
</script>
