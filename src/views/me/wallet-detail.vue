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
        @deleted="readRecord"
      />
    </Group>

    <Tabbar
      :mainIcon="'quill-pen'"
      :mainText="'记一笔'"
      @main-click="handleAddRecord"
      :rightIcon="'wallet-3'"
      :rightText="'设置钱包'"
      @right-click="handleEditWallet"
    ></Tabbar>
  </div>
</template>

<script lang="ts">
import Tabbar from '@/components/Tabbar.vue'
import ViewingArea from '@/components/ViewingArea.vue'
import { useRoute, useRouter } from 'vue-router'
import Group from '@/components/Group.vue'
import HomeRecordCard from '@/components/HomeRecordCard.vue'
import { onMounted, ref } from 'vue'
import { readRecordByWallet } from '@/db'
import { compatHomeRecords, Record } from '@/model/Record'
import { quickSort, quickSortBy } from '@/utils/quickSort'
import dayjs from 'dayjs'
import { getCNDayText } from '@/utils/date'
import { useStore } from '@/store'

export default {
  components: { Tabbar, ViewingArea, Group, HomeRecordCard },

  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const name = route.query.name as Record['wallet']
    const records = ref<any>([])

    const readRecord = () => {
      readRecordByWallet(name).then((data) => {
        records.value = compatHomeRecords(
          quickSortBy<Record>(data, 'date', 'desc'),
        )
      })
    }

    onMounted(readRecord)

    const handleAddRecord = () => {
      store.commit('setAddRecord', {
        wallet: name,
      })
      router.push('/add-record')
    }

    const handleEditWallet = () => {
      router.push({
        path: '/me/edit-wallet',
        query: {
          name,
        },
      })
    }

    return {
      title: name,
      records,

      handleAddRecord,
      handleEditWallet,
      getCNDayText,

      readRecord,
    }
  },
}
</script>
