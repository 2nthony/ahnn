<template>
  <div class="page-changelog">
    <ViewingArea title="历史更新">
      <img
        src="/img/illustrations/undraw_Online_information_re_erks.svg"
        alt="Changelog"
        class="h-full"
      />
    </ViewingArea>
    <ChangelogApp class="changelog-content"></ChangelogApp>
    <Tabbar></Tabbar>
  </div>
</template>

<script lang="ts">
import ViewingArea from '@app/components/ViewingArea.vue'
import Tabbar from '@app/components/Tabbar.vue'
import ChangelogApp from '../../../changelog-app.md'

export default {
  components: { Tabbar, ViewingArea, ChangelogApp },
}
</script>

<style lang="less">
.page-changelog .changelog-content {
  & h2:not(:first-child) {
    margin-top: var(--geist-space-small);
  }

  & ul {
    padding: 0;
    margin-left: 15px;
    list-style-type: none;

    & li {
      line-height: 24px;

      &::before {
        content: '-';
        display: inline-block;
        position: absolute;
        margin-left: -15px;
      }
    }
  }
}
</style>
