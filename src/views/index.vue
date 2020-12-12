<template>
  <div class="page-home">
    <ViewingArea>
      <Heading :size="900">{{ currentMonth }} 月</Heading>
    </ViewingArea>

    <Group
      v-for="item in data"
      :key="item.date"
      :title="getCNDayText(item.date)"
    >
      <HomeRecordCard
        v-for="(cost, index) in item.costs"
        :key="index"
        :record="cost"
      />
    </Group>

    <HomeTabbar></HomeTabbar>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import Group from '../components/Group.vue'
import HomeTabbar from '../components/HomeTabbar'
import ViewingArea from '../components/ViewingArea.vue'
import { compatHomeRecords } from '../model/Record'
import Heading from '../components/ui/Heading.vue'
import { getCNDayText, getCurrentMonth, getCurrentYear } from '../utils/date'
import HomeRecordCard from '@/components/HomeRecordCard.vue'
import { useStore } from '@/store'

export default {
  components: {
    HomeTabbar,
    ViewingArea,
    Group,
    Heading,
    HomeRecordCard,
  },

  setup() {
    const store = useStore()

    const currentYear = ref(getCurrentYear())
    const currentMonth = ref(getCurrentMonth())

    const data = computed(() => {
      return compatHomeRecords(store.getters.records)
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
