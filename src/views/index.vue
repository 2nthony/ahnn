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
      <HomeRecordPane
        v-for="(cost, index) in item.costs"
        :key="index"
        :record="cost"
      />
    </Cell>

    <HomeTabbar></HomeTabbar>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import Cell from '../components/Cell.vue'
import CellItem from '../components/CellItem.vue'
import HomeTabbar from '../components/HomeTabbar'
import ViewingArea from '../components/ViewingArea.vue'
import { compatHomeRecords } from '../model/Record'
import Heading from '../components/ui/Heading.vue'
import { readRecord } from '../db/record'
import { getCNDayText, getCurrentMonth, getCurrentYear } from '../utils/date'
import RemixIcon from '@/components/RemixIcon.vue'
import HomeRecordPane from '@/components/HomeRecordPane.vue'

export default {
  components: {
    HomeTabbar,
    ViewingArea,
    Cell,
    CellItem,
    Heading,
    RemixIcon,
    HomeRecordPane,
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
