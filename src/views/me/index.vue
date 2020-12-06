<template>
  <div class="page-me">
    <ViewingArea title="我"></ViewingArea>

    <Cell>
      <CellItem
        title="登录账号"
        :rightText="'去注册'"
        link
      ></CellItem>
      <CellItem
        title="目前方案"
        :rightText="'本地'"
        link
      ></CellItem>
    </Cell>

    <Cell>
      <CellItem
        title="账本"
        link
      ></CellItem>
      <CellItem
        title="成员"
        link
      ></CellItem>
    </Cell>

    <Cell>
      <CellItem
        title="设置"
        :link="'/me/setting'"
      ></CellItem>
    </Cell>

    <HomeTabbar></HomeTabbar>
  </div>
</template>

<script lang="ts">
import Cell from '../../components/Cell.vue'
import CellItem from '../../components/CellItem.vue'
import HomeTabbar from "../../components/HomeTabbar.vue"
import ViewingArea from '../../layout/ViewingArea.vue'

export default {
  components: { HomeTabbar, Cell, CellItem, ViewingArea },
}
</script>
