<template>
  <div class="page-home">
    <ViewingArea class="my-gap">
      <Card class="month-summary flex flex-col w-full h-full justify-between">
        <Heading :size="900">{{ currentMonth }} 月</Heading>

        <div>
          <div class="mb-gap">
            <Heading>支出</Heading>
            <Heading :size="800">{{
              toFixed(calcRecordsResult.payout)
            }}</Heading>
          </div>
          <div>
            <Heading>收入 {{ toFixed(calcRecordsResult.income) }}</Heading>
          </div>
        </div>
      </Card>
    </ViewingArea>

    <Group
      v-for="record in records"
      :key="record.date"
      :title="getCNDayText(record.date)"
    >
      <HomeRecordCard
        v-for="(cost, index) in record.costs"
        :key="index"
        :record="cost"
      />
    </Group>

    <SelectMonth></SelectMonth>
    <HomeTabbar></HomeTabbar>
  </div>
</template>

<script>
import { computed } from 'vue'
import Group from '../components/Group.vue'
import HomeTabbar from '../components/HomeTabbar'
import ViewingArea from '../components/ViewingArea.vue'
import Heading from '../components/ui/Heading.vue'
import { getCNDayText } from '../utils/date'
import HomeRecordCard from '@/components/HomeRecordCard.vue'
import { useStore } from '@/store'
import SelectMonth from '@/components/SelectMonth.vue'
import Card from '@/components/Card.vue'
import { calcRecords, compatHomeRecords } from '@/utils/record'
import { toFixed } from '@/utils'

export default {
  components: {
    HomeTabbar,
    ViewingArea,
    Group,
    Heading,
    HomeRecordCard,
    SelectMonth,
    Card,
  },

  setup() {
    const store = useStore()

    const records = computed(() => {
      return compatHomeRecords(store.getters.records)
    })
    const calcRecordsResult = computed(() => {
      return calcRecords(store.getters.records)
    })

    const recordsQueryDate = computed(() => store.getters.recordsQueryDate)

    return {
      currentMonth: computed(() => recordsQueryDate.value[1]),
      records,

      calcRecordsResult,

      getCNDayText,
      toFixed,
    }
  },
}
</script>

<style lang="less" scoped>
.page-home {
  & .month-summary {
    --start-color: #007cf0;
    --end-color: #00dfd8;
    background-image: linear-gradient(
      90deg,
      var(--start-color),
      var(--end-color)
    );
    color: var(--geist-white);
  }
}
</style>
