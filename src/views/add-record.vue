<template>
  <div class="page-add-record">
    <ViewingArea>
      <template #title>
        <Heading :size="900" @click="handleCalculatorVisible(true)"
          >{{ TypeCNTexts[addRecord.type] }}
          {{ Number(money).toFixed(2) }} 元</Heading
        >
      </template>
    </ViewingArea>

    <div class="main-content">
      <div class="switch-type">
        <div class="button-wrapper">
          <Button type="secondary" @click="handleSwitchType(Types.payout)">{{
            TypeCNTexts[Types.payout]
          }}</Button>
        </div>
        <div class="button-wrapper">
          <Button type="secondary" @click="handleSwitchType(Types.income)">{{
            TypeCNTexts[Types.income]
          }}</Button>
        </div>
      </div>

      <div class="info">
        <Button
          type="secondary"
          class="select-category"
          @click="$router.push('/select/add-record-select-category')"
        >
          <RemixIcon class="icon" :icon="addRecord.category.icon" />
          <Text class="name">
            {{ addRecord.category.name }}
          </Text>
        </Button>

        <div class="select-more">
          <div class="select-more-top">
            <div class="select-input-wrapper">
              <InputDate
                :modelValue="addRecord.date"
                @update:modelValue="onDateSelect"
              >
                <template #placeholder>
                  <Button type="secondary">{{ previewDate }}</Button>
                </template>
              </InputDate>
            </div>
            <div class="select-input-wrapper">
              <Button
                type="secondary"
                @click="$router.push('/select/add-record-select-wallet')"
                >{{ addRecord.wallet }}</Button
              >
            </div>
          </div>
          <div class="select-more-bottom">
            <Input
              :modelValue="addRecord.remark"
              placeholder="备注信息"
              inputmode="search"
              @update:modelValue="onRemarkInput"
              @focus="calculatorVisible = false"
            />
          </div>
        </div>
      </div>

      <div class="calculator-wrapper" v-show="calculatorVisible">
        <Calculator @result="onCalcResult"></Calculator>
      </div>
    </div>

    <Tabbar
      @back="onBack"
      :mainText="'保存'"
      :mainIcon="'check'"
      @main-click="handleSave"
      :rightIcon="'calculator'"
      :rightText="calculatorVisible ? '隐藏' : '显示'"
      @right-click="handleCalculatorVisible"
    ></Tabbar>
  </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import Tabbar from '../components/Tabbar.vue'
import ViewingArea from '../components/ViewingArea.vue'
import Calculator from '../components/Calculator.vue'
import Button from '../components/ui/Button.vue'
import Input from '../components/ui/Input.vue'
import { getToday, getCNDayText } from '../utils/date'
import { deepToRaw } from '../utils'
import { useRouter } from 'vue-router'
import InputDate from '@/components/InputDate.vue'
import Text from '@/components/ui/Text.vue'
import { useStore } from '@/store'
import { Type, TypeCNTexts, Types } from '@/model/Type'
import RemixIcon from '@/components/RemixIcon.vue'
import Heading from '@/components/ui/Heading.vue'
import { setRecord } from '../db'

export default {
  components: {
    Tabbar,
    ViewingArea,
    Calculator,
    Button,
    Input,
    InputDate,
    Text,
    RemixIcon,
    Heading,
  },

  setup() {
    const store = useStore()
    const router = useRouter()

    const addRecord = computed(() => store.getters.addRecord)
    const money = ref<number>(addRecord.value.cost || 0)
    const previewDate = computed(() => getCNDayText(addRecord.value.date))
    const calculatorVisible = ref<boolean>(true)

    const handleSave = () => {
      setRecord(deepToRaw(addRecord.value)).then(() => {
        router.push('/')
        store.commit('initAddRecord')
        store.dispatch('readRecordsByQueryDate')
      })
    }

    const handleSwitchType = (type: Type) => {
      store.commit('switchAddRecordType', type)
    }

    const handleCalculatorVisible = (bool: boolean) => {
      calculatorVisible.value = bool || !calculatorVisible.value
    }

    const onDateSelect = (val: string) => {
      store.commit('setAddRecord', {
        date: val || getToday(),
      })
    }
    const onRemarkInput = (val: string) => {
      store.commit('setAddRecord', {
        remark: val,
      })
    }
    const onCalcResult = (val: number) => {
      money.value = val
      store.commit('setAddRecord', {
        cost: val,
      })
    }

    const onBack = () => store.commit('initAddRecord')

    return {
      money,
      addRecord,
      previewDate,
      calculatorVisible,

      handleSave,
      handleSwitchType,
      handleCalculatorVisible,
      onDateSelect,
      onRemarkInput,
      onCalcResult,
      onBack,

      TypeCNTexts,
      Types,
    }
  },
}
</script>

<style lang="less" scoped>
.main-content {
  margin-bottom: 300px;
  & button {
    color: var(--ahnn-foreground);
  }

  & .switch-type {
    display: flex;
    margin-bottom: var(--inline-gap);
  }

  & .button-wrapper {
    flex: 1;

    & button {
      width: 100%;
    }
  }

  & .info {
    display: flex;
    margin-bottom: var(--inline-gap);
  }

  & .select-category {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
    width: calc(2 * var(--ahnn-form-height) + 10px);
    height: calc(2 * var(--ahnn-form-height) + 10px);
    background-color: var(--ahnn-background);
    margin-right: var(--inline-gap);

    & .icon {
      width: 1.5rem;
      height: 1.5rem;
    }

    & .name {
      margin-top: 0.25rem;
    }
  }

  & .select-more,
  & .select-more-top,
  & .select-more-bottom {
    display: flex;
  }
  & .select-more {
    flex: 3;
    flex-direction: column;
    justify-content: space-between;

    & button {
      width: 100%;
      cursor: pointer;
    }

    & input {
      width: 100%;
    }
  }
  & .select-input-wrapper {
    flex: 1;
  }
  & .select-more-top,
  & .select-more-bottom {
    & > .select-input-wrapper:first-child {
      margin-right: var(--inline-gap);
    }
  }
}

.calculator-wrapper {
  position: fixed;
  left: 0;
  right: 0;
  bottom: calc(var(--tabbar-height) + env(safe-area-inset-bottom));
  width: 100%;
}
</style>
