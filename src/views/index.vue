<template>
  <div class="page-home">
    <ViewingArea>
      <Heading :size="900">12 月</heading>
    </ViewingArea>

    <cell v-for="item in data" :key="item.date" :title="item.date">
      <cell-item
        v-for="(cost, k) in item.costs"
        :key="k"
        :title="cost.category.name"
        :rightText="'￥' + Number(cost.cost).toFixed(2)"
      ></cell-item>
    </cell>

    <HomeTabbar></HomeTabbar>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import Cell from '../components/Cell.vue'
import CellItem from '../components/CellItem.vue'
import HomeTabbar from '../components/HomeTabbar'
import ViewingArea from '../layout/ViewingArea.vue'
import { convert } from '../utils/Record'

import { HomeRecords } from '../mocks/home'
import Heading from '../components/ui/Heading.vue'

export default {
  components: {
    HomeTabbar,
    ViewingArea,
    Cell,
    CellItem,
    Heading
  },

  setup() {
    const data = ref([])

    onMounted(() => {
      data.value = convert(HomeRecords)
    })

    return {
      data
    }
  }
}
</script>
