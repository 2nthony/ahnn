<template>
  <div class="page-changelog">
    <ViewingArea title="历史更新"></ViewingArea>
    <ChangelogApp></ChangelogApp>
    <Tabbar></Tabbar>
  </div>
</template>

<script lang="ts">
import ViewingArea from '@/components/ViewingArea.vue'
import Tabbar from '../../components/Tabbar.vue'
import ChangelogApp from '../../../changelog-app.md'

export default {
  components: { Tabbar, ViewingArea, ChangelogApp },
}
</script>
