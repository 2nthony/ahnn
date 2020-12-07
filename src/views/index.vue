<template>
  <div class="page-home">
    <ViewingArea>
      <Heading :size="900">{{ currentMonth }} 月</Heading>
    </ViewingArea>

    <Cell v-for="item in data" :key="item.date" :title="item.date">
      <CellItem
        v-for="(cost, k) in item.costs"
        :key="k"
        :title="cost.category.name"
        :rightText="'￥' + Number(cost.cost).toFixed(2)"
      ></CellItem>
    </Cell>

    <HomeTabbar></HomeTabbar>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import Cell from '../components/Cell.vue'
import CellItem from '../components/CellItem.vue'
import HomeTabbar from '../components/HomeTabbar'
import ViewingArea from '../layout/ViewingArea.vue'
import { convert } from '../utils/Record'
import Heading from '../components/ui/Heading.vue'
import { readRecord } from '../db/record'
import { getCurrentMonth, getCurrentYear } from '@/utils/date'

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
    const currentYear = ref(getCurrentYear())
    const currentMonth = ref(getCurrentMonth())

    onMounted(() => {
      readRecord(`${currentYear.value}-${currentMonth.value}`)
        .then(records => {
          data.value = convert(records)
        })
    })

    return {
      currentYear,
      currentMonth,
      data
    }
  }
}
</script>
