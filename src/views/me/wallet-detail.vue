<template>
  <div class="page-wallet-detail">
    <ViewingArea :title="title"></ViewingArea>

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

    <Tabbar></Tabbar>
  </div>
</template>

<script lang="ts">
import Tabbar from '@/components/Tabbar.vue'
import ViewingArea from '@/components/ViewingArea.vue'
import { useRoute } from 'vue-router'
import Group from '@/components/Group.vue'
import HomeRecordCard from '@/components/HomeRecordCard.vue'
import { onMounted, ref } from 'vue'
import { readRecordByWallet } from '@/db'
import { WalletName } from '@/model/Wallet'
import { compatHomeRecords, Record } from '@/model/Record'
import { quickSort, quickSortBy } from '@/utils/quickSort'
import dayjs from 'dayjs'
import { getCNDayText } from '@/utils/date'

export default {
  components: { Tabbar, ViewingArea, Group, HomeRecordCard },

  setup() {
    const route = useRoute()

    const { name } = route.query
    const records = ref<any>([])

    onMounted(() => {
      readRecordByWallet(name as WalletName).then((data) => {
        records.value = compatHomeRecords(
          quickSortBy<Record>(data, 'date', 'desc'),
        )
      })
    })

    return {
      title: name,
      records,

      getCNDayText,
    }
  },
}
</script>
