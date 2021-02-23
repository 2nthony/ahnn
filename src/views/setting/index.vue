<template>
  <div class="page-setting">
    <ViewingArea title="设置">
      <img
        class="h-full"
        src="/img/illustrations/undraw_settings_ii2j.svg"
        alt="Setting"
      />
    </ViewingArea>

    <Group>
      <Cell
        title="关于 Ahnn"
        :link="'/setting/about-app'"
        :rightText="`版本 ${version}`"
      ></Cell>
      <Cell title="建议与反馈" :link="'/setting/feedback'"></Cell>
    </Group>

    <Group>
      <Cell title="备份还原" :link="'/setting/backup-restore'"></Cell>
    </Group>

    <Group>
      <Cell title="外观" :link="'/setting/appreance'"></Cell>
    </Group>

    <!-- <Group>
      <Cell title="还原" :link="'/setting/erase'"></Cell>
    </Group> -->

    <HomeTabbar></HomeTabbar>
  </div>
</template>

<script>
/* global __APP_VERSION__ */
import Group from '@app/components/Group.vue'
import Cell from '@app/components/Cell.vue'
import ViewingArea from '@app/components/ViewingArea.vue'
import HomeTabbar from '@app/components/HomeTabbar.vue'

export default {
  components: { ViewingArea, Group, Cell, HomeTabbar },

  setup() {
    return {
      version: __APP_VERSION__,
    }
  },
}
</script>
