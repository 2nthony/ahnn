<template>
  <div class="page-me">
    <ViewingArea title="我"></ViewingArea>

    <Group>
      <CellItem title="登录账号" :rightText="'去注册'" link></CellItem>
      <CellItem title="目前方案" :rightText="'本地'" link></CellItem>
    </Group>

    <Group>
      <CellItem title="账本" link></CellItem>
      <CellItem title="成员" link></CellItem>
    </Group>

    <Group>
      <CellItem title="设置" :link="'/me/setting'"></CellItem>
    </Group>

    <HomeTabbar></HomeTabbar>
  </div>
</template>

<script lang="ts">
import Group from '../../components/Group.vue'
import CellItem from '../../components/CellItem.vue'
import HomeTabbar from '../../components/HomeTabbar.vue'
import ViewingArea from '../../components/ViewingArea.vue'

export default {
  components: { HomeTabbar, Group, CellItem, ViewingArea },
}
</script>
