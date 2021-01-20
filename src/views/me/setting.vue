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
        :link="'/me/about-app'"
        :rightText="`版本 ${version}`"
      ></Cell>
      <Cell title="建议与反馈" :link="'/me/feedback'"></Cell>
    </Group>

    <Group>
      <Cell title="备份还原" :link="'/me/backup-restore'"></Cell>
    </Group>

    <Group>
      <Cell title="外观" :link="'/preference/appreance'"></Cell>
    </Group>

    <!-- <Group>
      <Cell title="还原" :link="'/me/erase'"></Cell>
    </Group> -->

    <Tabbar></Tabbar>
  </div>
</template>

<script>
/* global __APP_VERSION__ */
import Group from '@app/components/Group.vue'
import Cell from '@app/components/Cell.vue'
import Tabbar from '@app/components/Tabbar.vue'
import ViewingArea from '@app/components/ViewingArea.vue'

export default {
  components: { Tabbar, ViewingArea, Group, Cell },

  setup() {
    return {
      version: __APP_VERSION__,
    }
  },
}
</script>
