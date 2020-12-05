<template>
  <div class="page-feedback">
    <ViewingArea title="建议与反馈"></ViewingArea>

    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '../../components/Tabbar.vue';
import ViewingArea from "../../layout/ViewingArea.vue";

export default {
  components: { ViewingArea, Tabbar },
}
</script>
