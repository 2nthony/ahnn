<template>
  <div class="page-home">
    <ViewingArea>
      <Heading :size="900">{{ currentMonth }} 月</Heading>
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
import { compatHomeRecords } from '../model/Record'
import Heading from '../components/ui/Heading.vue'
import { getCNDayText } from '../utils/date'
import HomeRecordCard from '@/components/HomeRecordCard.vue'
import { useStore } from '@/store'
import SelectMonth from '@/components/SelectMonth.vue'

export default {
  components: {
    HomeTabbar,
    ViewingArea,
    Group,
    Heading,
    HomeRecordCard,
    SelectMonth,
  },

  setup() {
    const store = useStore()

    const records = computed(() => {
      return compatHomeRecords(store.getters.records)
    })

    const recordsQueryDate = computed(() => store.getters.recordsQueryDate)

    watch(recordsQueryDate, () => store.dispatch('readRecordsByQueryDate'))

    return {
      currentMonth: computed(() => recordsQueryDate.value[1]),
      records,

      getCNDayText,
    }
  },
}
</script>

<style lang="less" scoped>
.page-home {
  & .select-month {
    position: fixed;
    left: 0;
    right: 0;
    bottom: calc(var(--tabbar-height) + env(safe-area-inset-bottom));
    height: var(--home-select-month-height);
  }
}
</style>
