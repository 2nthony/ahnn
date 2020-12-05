<template>
  <div class="page-me">
    <ViewingArea title="我"></ViewingArea>

    <cell>
      <cell-item
        title="登录账号"
        :rightText="'去注册'"
        link
      ></cell-item>
      <cell-item
        title="目前方案"
        :rightText="'本地'"
        link
      ></cell-item>
    </cell>

    <cell>
      <cell-item
        title="账本"
        link
      ></cell-item>
      <cell-item
        title="成员"
        link
      ></cell-item>
    </cell>

    <cell>
      <cell-item
        title="设置"
        :link="'/me/setting'"
      ></cell-item>
    </cell>

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
