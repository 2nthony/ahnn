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
        @edit="popupAddRecordVisible = true"
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

  <PopupAddRecord
    v-model:visible="popupAddRecordVisible"
    @saved="readRecord"
  ></PopupAddRecord>
</template>

<script lang="ts">
import Tabbar from '@app/components/Tabbar.vue'
import ViewingArea from '@app/components/ViewingArea.vue'
import { useRoute, useRouter } from 'vue-router'
import Group from '@app/components/Group.vue'
import HomeRecordCard from '@app/components/HomeRecordCard.vue'
import { onMounted, ref } from 'vue'
import { readRecordByWallet } from '@app/db/record'
import { Record } from '@app/model/Record'
import { quickSortBy } from '@app/utils/quickSort'
import { getCNDayText } from '@app/utils/date'
import { useStore } from '@app/store'
import { compatHomeRecords } from '@app/utils/record'
import { usePopupAddRecord } from '@app/hooks/usePopupAddRecord'
import PopupAddRecord from '@app/components/page-home/PopupAddRecord.vue'

export default {
  components: { Tabbar, ViewingArea, Group, HomeRecordCard, PopupAddRecord },

  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const { visible: popupAddRecordVisible } = usePopupAddRecord()

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
      popupAddRecordVisible.value = true
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
      popupAddRecordVisible,

      handleAddRecord,
      handleEditWallet,
      getCNDayText,

      readRecord,
    }
  },
}
</script>
