<template>
  <Draw :visible="visible" @update:visible="(v) => $emit('update:visible', v)">
    <div class="flex justify-between items-center mb-gap-half">
      <ButtonGroup>
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

      <div class="flex">
        <InputDate
          :modelValue="addRecord.date"
          @update:modelValue="onDateSelect"
          class="input-date"
        >
          <template #placeholder>
            <Button :size="'small'" type="secondary" class="w-full">{{
              getCNDayText(addRecord.date)
            }}</Button>
          </template>
        </InputDate>
      </div>
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
    <PopupAddRecordCategories />

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

  <Draw v-model:visible="remarkPopupVisible">
    <Textarea
      class="w-full"
      placeholder="填写备注"
      :modelValue="addRecord.remark"
      @update:modelValue="onInputRemark"
    ></Textarea>
  </Draw>
</template>

<script lang="ts">
import { setProps } from '@/utils/setProps'
import Calculator from '../Calculator.vue'
import Button from '../ui/Button.vue'
import InputDate from '../InputDate.vue'
import Select from '../ui/Select.vue'
import { defineComponent, ref } from 'vue'
import Heading from '../ui/Heading.vue'
import Text from '../ui/Text.vue'
import { TypeCNTexts, Types } from '@/model/Type'
import { useStore } from '@/store'
import { addRecordStrategy } from '@/strategies/pageAddRecordStrategy'
import { Record } from '@/model/Record'
import { getCNDayText } from '@/utils/date'
import Draw from '../Draw.vue'
import { useUserWallets } from '@/hooks/useUserWallets'
import ButtonGroup from '../ButtonGroup.vue'
import { toFixed } from '@/utils'
import Textarea from '../ui/Textarea.vue'
import PopupAddRecordCategories from './PopupAddRecordCategories.vue'

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
    PopupAddRecordCategories,
  },
  emits: ['update:visible', 'saved'],
  props: {
    visible: setProps('boolean'),
  },

  setup(_, { emit }) {
    const store = useStore()
    const remarkPopupVisible = ref(false)
    const { userWallets } = useUserWallets()

    const {
      addRecord,
      handleSwitchType,
      handleSave: origHandleSave,
      onDateSelect,
    } = addRecordStrategy()

    function handleSelectWallet(wallet: Record['wallet']) {
      store.commit('setAddRecord', { wallet })
    }

    function onCalcResult(cost: Record['cost']) {
      store.commit('setAddRecord', { cost })
    }

    function onInputRemark(remark: Record['remark']) {
      store.commit('setAddRecord', { remark })
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
      onInputRemark,
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
