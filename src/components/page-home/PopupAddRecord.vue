<template>
  <Draw :visible="visible" @update:visible="(v) => $emit('update:visible', v)">
    <div class="flex justify-between items-center mb-gap-half">
      <ButtonGroup class="flex-3">
        <Button
          :size="'small'"
          :type="addRecord.type === Types.payout ? 'success' : 'secondary'"
          @click="handleSwitchType(Types.payout)"
          >{{ TypeCNTexts[Types.payout] }}</Button
        >
        <Button
          :size="'small'"
          :type="addRecord.type === Types.income ? 'warning' : 'secondary'"
          @click="handleSwitchType(Types.income)"
          >{{ TypeCNTexts[Types.income] }}</Button
        >
      </ButtonGroup>

      <InputDate
        :modelValue="addRecord.date"
        @update:modelValue="onDateSelect"
        class="input-date flex-1"
      >
        <template #placeholder>
          <Button :size="'small'" type="secondary" class="w-full">{{
            getCNDayText(addRecord.date)
          }}</Button>
        </template>
      </InputDate>
    </div>

    <div class="flex items-center mb-gap-half">
      <div class="flex items-center flex-3">
        <Heading :size="800" class="mr-2">¥</Heading>
        <Heading :size="900" class="w-full">{{
          toFixed(addRecord.cost)
        }}</Heading>
      </div>

      <Select
        class="select-wallet w-full flex-1"
        small
        :placeholder="'选择钱包'"
        :modelValue="addRecord.wallet"
        @update:modelValue="handleSelectWallet"
        :showArrow="false"
      >
        <option v-for="(wallet, index) in userWallets" :key="index">
          {{ wallet.name }}
        </option>
      </Select>
    </div>

    <!-- categories -->
    <AddRecordCategories />

    <Button
      type="secondary"
      class="w-full small flex items-center mb-gap-half"
      @click="remarkPopupVisible = true"
    >
      <Text
        class="inline-block w-full text-left whitespace-nowrap overflow-hidden overflow-ellipsis"
        >{{ addRecord.remark || '填写备注' }}</Text
      >
    </Button>

    <Calculator class="mb-gap-half" @result="onCalcResult"></Calculator>

    <div class="text-right">
      <Button type="secondary" @click="$emit('update:visible', false)"
        >关闭</Button
      >
      <Button
        @click="handleSave"
        :type="addRecord.type === Types.payout ? 'success' : 'warning'"
        >保存</Button
      >
    </div>
  </Draw>

  <PopupAddRecordRemark v-model:visible="remarkPopupVisible" />
</template>

<script lang="ts">
import { setProps } from '@app/utils/setProps'
import Calculator from '@app/components/Calculator.vue'
import Button from '@app/components/ui/Button.vue'
import InputDate from '@app/components/InputDate.vue'
import Select from '@app/components/ui/Select.vue'
import { defineComponent, ref } from 'vue'
import Heading from '@app/components/ui/Heading.vue'
import Text from '@app/components/ui/Text.vue'
import { TypeCNTexts, Types } from '@app/model/Type'
import { useStore } from '@app/store'
import { addRecordStrategy } from '@app/strategies/pageAddRecordStrategy'
import { Record } from '@app/model/Record'
import { getCNDayText, getToday } from '@app/utils/date'
import Draw from '@app/components/Draw.vue'
import { useUserWallets } from '@app/hooks/useUserWallets'
import ButtonGroup from '@app/components/ButtonGroup.vue'
import { toFixed } from '@app/utils'
import Textarea from '@app/components/ui/Textarea.vue'
import AddRecordCategories from './AddRecordCategories.vue'
import dayjs from 'dayjs'
import PopupAddRecordRemark from './PopupAddRecordRemark.vue'

export default defineComponent({
  components: {
    Calculator,
    Button,
    InputDate,
    Select,
    Heading,
    Text,
    Draw,
    ButtonGroup,
    Textarea,
    AddRecordCategories,
    PopupAddRecordRemark,
  },
  emits: ['update:visible', 'saved'],
  props: {
    visible: setProps('boolean'),
  },

  setup(_, { emit }) {
    const store = useStore()
    const remarkPopupVisible = ref(false)
    const { userWallets } = useUserWallets()

    const { addRecord, handleSave: origHandleSave } = addRecordStrategy()

    function handleSelectWallet(wallet: Record['wallet']) {
      store.commit('setAddRecord', { wallet })
    }

    const handleSwitchType = (type: Record['type']) => {
      store.commit('switchAddRecordType', type)
    }

    function onCalcResult(cost: Record['cost']) {
      store.commit('setAddRecord', { cost })
    }

    function onDateSelect(date: string) {
      store.commit('setAddRecord', {
        date: dayjs(date).format('YYYY-MM-DD') || getToday(),
      })
    }

    function handleSave() {
      origHandleSave().then(() => {
        store.dispatch('initAddRecord')
        store.dispatch('readRecordsByQueryDate')

        emit('update:visible', false)
        emit('saved')
      })
    }

    return {
      userWallets,
      Types,
      TypeCNTexts,
      addRecord,
      handleSwitchType,
      handleSelectWallet,
      onDateSelect,
      onCalcResult,
      handleSave,

      remarkPopupVisible,
      toFixed,
      getCNDayText,
    }
  },
})
</script>

<style lang="less" scoped>
.input-date,
.select-wallet {
  min-width: var(--geist-space-32x);
}

.input-date button {
  color: var(--geist-foreground);
}
</style>
