<template>
  <div class="page-me">
    <ViewingArea title="我"></ViewingArea>

    <!-- <Group>
      <Cell title="登录账号" :rightText="'去注册'" link></Cell>
      <Cell title="目前方案" :rightText="'本地'" link></Cell>
    </Group> -->

    <!-- <Group>
      <Cell title="账本" link></Cell>
      <Cell title="成员" link></Cell>
    </Group> -->

    <Group>
      <Cell title="钱包" :link="'/me/wallet'"></Cell>
    </Group>

    <Group>
      <Cell title="设置" :link="'/me/setting'"></Cell>
    </Group>

    <HomeTabbar></HomeTabbar>
  </div>
</template>

<script lang="ts">
import Group from '../../components/Group.vue'
import Cell from '../../components/Cell.vue'
import HomeTabbar from '../../components/HomeTabbar.vue'
import ViewingArea from '../../components/ViewingArea.vue'

export default {
  components: { HomeTabbar, Group, Cell, ViewingArea },
}
</script>
