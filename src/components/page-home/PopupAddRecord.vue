<template>
  <Draw :visible="visible" @update:visible="(v) => $emit('update:visible', v)">
    <div class="flex justify-between items-center mb-gap-half">
      <div>
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
      </div>

      <div class="flex">
        <InputDate
          :modelValue="addRecord.date"
          @update:modelValue="onDateSelect"
          class="input-date"
        >
          <template #placeholder>
            <Button :size="'small'" type="secondary" class="w-full">{{
              previewDate
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
    <div class="overflow-x-scroll flex mb-gap-half">
      <div
        class="flex flex-col items-center w-14 flex-none"
        v-for="(category, index) in categories"
        :key="index"
        @click="handleSelectCategory(index)"
      >
        <div
          class="icon-wrapper circle mb-2 category-icon-wrapper"
          :class="{ [addRecord.type]: index === selectedCategoryIndex }"
        >
          <RemixIcon :icon="categoryNameIconMapping[category]" />
        </div>
        <Text :size="300">{{ category }}</Text>
      </div>
    </div>

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
import Input from '../ui/Input.vue'
import Button from '../ui/Button.vue'
import InputDate from '../InputDate.vue'
import Select from '../ui/Select.vue'
import { computed, defineComponent, ref, watch } from 'vue'
import Heading from '../ui/Heading.vue'
import RemixIcon from '../RemixIcon.vue'
import Text from '../ui/Text.vue'
import { TypeCNTexts, Types } from '@/model/Type'
import { categoryNameIconMapping, presetCategories } from '@/model/Category'
import { useStore } from '@/store'
import { addRecordStrategy } from '@/strategies/pageAddRecordStrategy'
import { Record } from '@/model/Record'
import { getCNDayText } from '@/utils/date'
import Tabbar from '../Tabbar.vue'
import Draw from '../Draw.vue'
import { useUserWallets } from '@/hooks/useUserWallets'
import ButtonGroup from '../ButtonGroup.vue'
import { toFixed } from '@/utils'
import Textarea from '../ui/Textarea.vue'

export default defineComponent({
  components: {
    Calculator,
    Input,
    Button,
    InputDate,
    Select,
    Heading,
    RemixIcon,
    Text,
    Tabbar,
    Draw,
    ButtonGroup,
    Textarea,
  },
  emits: ['update:visible', 'saved'],
  props: {
    visible: setProps('boolean'),
  },

  setup(props, { emit }) {
    const store = useStore()
    const remarkPopupVisible = ref(false)
    const selectedCategoryIndex = ref(0)
    const { userWallets } = useUserWallets()

    const {
      addRecord,
      handleSwitchType: origHandleSwitchType,
      handleSave: origHandleSave,
      onDateSelect,
    } = addRecordStrategy()
    const previewDate = computed(() => getCNDayText(addRecord.value.date))
    const categories = computed(() => {
      return presetCategories[addRecord.value.type]
    })

    // highlight category and
    // reset selected category index to `0`
    watch(addRecord, (val) => {
      selectedCategoryIndex.value = categories.value.findIndex((category) => {
        return category === val.category
      })
    })

    function handleSelectWallet(wallet: Record['wallet']) {
      store.commit('setAddRecord', { wallet })
    }

    function onCalcResult(cost: Record['cost']) {
      store.commit('setAddRecord', { cost })
    }

    function handleSelectCategory(index: number) {
      store.commit('setAddRecord', {
        category: categories.value[index],
      })
      selectedCategoryIndex.value = index
    }

    function handleSwitchType(type: Record['type']) {
      origHandleSwitchType(type)
      selectedCategoryIndex.value = 0
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
      selectedCategoryIndex,
      Types,
      TypeCNTexts,
      categories,
      addRecord,
      previewDate,
      categoryNameIconMapping,
      handleSwitchType,
      handleSelectWallet,
      onDateSelect,
      onCalcResult,
      handleSelectCategory,
      onInputRemark,
      handleSave,

      remarkPopupVisible,
      toFixed,
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

.category-icon-wrapper {
  @apply w-8 h-8;

  & .remixicon {
    @apply w-5 h-5;
  }
}
</style>
