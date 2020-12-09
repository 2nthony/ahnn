<template>
  <div class="changelog">
    <ViewingArea title="Changelog"></ViewingArea>

    <Tabbar></Tabbar>
  </div>
</template>

<script lang="ts">
import ViewingArea from '@/components/ViewingArea.vue'
import Tabbar from '../../components/Tabbar.vue'
export default {
  components: { Tabbar, ViewingArea },
}
</script>
