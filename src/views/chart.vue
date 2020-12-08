<template>
  <div class="page-chart">
    <ViewingArea title="Chart"></ViewingArea>

    <HomeTabbar></HomeTabbar>
  </div>
</template>

<script>
import ViewingArea from '@/layout/ViewingArea.vue'
import HomeTabbar from '../components/HomeTabbar.vue'

export default {
  components: { HomeTabbar, ViewingArea },
}
</script>
