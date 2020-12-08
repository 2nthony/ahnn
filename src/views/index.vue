<template>
  <div class="page-home">
    <ViewingArea>
      <Heading :size="900">{{ currentMonth }} 月</Heading>
    </ViewingArea>

    <Cell
      v-for="item in data"
      :key="item.date"
      :title="getCNDayText(item.date)"
    >
      <CellItem
        v-for="(cost, k) in item.costs"
        :key="k"
        :title="cost.category.name"
        :rightText="'￥' + Number(cost.cost).toFixed(2)"
      >
        <template #icon>{{ cost.category.icon }}</template>
      </CellItem>
    </Cell>

    <HomeTabbar></HomeTabbar>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import Cell from '../components/Cell.vue'
import CellItem from '../components/CellItem.vue'
import HomeTabbar from '../components/HomeTabbar'
import ViewingArea from '../layout/ViewingArea.vue'
import { compatHomeRecords } from '../model/Record'
import Heading from '../components/ui/Heading.vue'
import { readRecord } from '../db/record'
import { getCNDayText, getCurrentMonth, getCurrentYear } from '../utils/date'

export default {
  components: {
    HomeTabbar,
    ViewingArea,
    Cell,
    CellItem,
    Heading,
  },

  setup() {
    const data = ref([])
    const currentYear = ref(getCurrentYear())
    const currentMonth = ref(getCurrentMonth())

    onMounted(() => {
      readRecord(`${currentYear.value}-${currentMonth.value}`, 'desc').then(
        (records) => {
          data.value = compatHomeRecords(records)
        },
      )
    })

    return {
      currentYear,
      currentMonth,
      data,

      getCNDayText,
    }
  },
}
</script>
