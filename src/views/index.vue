<template>
  <div class="page-home">
    <ViewingArea class="viewing-area">
      <Card class="month-summary">
        <Heading :size="900">{{ currentMonth }} 月</Heading>

        <div class="summary">
          <div class="payout">
            <Heading>支出</Heading>
            <Heading :size="800">{{
              toFixed(calcRecordsResult.payout)
            }}</Heading>
          </div>
          <div class="income">
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

    <SelectMonth class="select-month"></SelectMonth>
    <HomeTabbar></HomeTabbar>
  </div>
</template>

<script>
import { computed, watch } from 'vue'
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

    watch(recordsQueryDate, () => store.dispatch('readRecordsByQueryDate'))

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
  & .viewing-area {
    margin: var(--gap) 0;
  }

  & .month-summary {
    --start-color: #007cf0;
    --end-color: #00dfd8;
    background-image: linear-gradient(
      90deg,
      var(--start-color),
      var(--end-color)
    );
    color: var(--ahnn-white);
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & .payout {
      margin-bottom: var(--gap);
    }
  }

  & .select-month {
    position: fixed;
    left: 0;
    right: 0;
    bottom: calc(var(--tabbar-height) + env(safe-area-inset-bottom));
    height: var(--home-select-month-height);
  }
}
</style>
