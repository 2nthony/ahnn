<template>
  <div class="page-add-record">
    <ViewingArea>
      <template #title>
        <Heading :size="900" @click="handleCalculatorVisible(true)"
          >{{ TypeCNTexts[addRecord.type] }} {{ toFixed(money) }} 元</Heading
        >
      </template>
    </ViewingArea>

    <div class="main-content">
      <div class="switch-type flex">
        <div class="button-wrapper flex-1">
          <Button
            class="w-full"
            :type="addRecord.type === Types.payout ? 'success' : 'secondary'"
            @click="handleSwitchType(Types.payout)"
            >{{ TypeCNTexts[Types.payout] }}</Button
          >
        </div>
        <div class="button-wrapper flex-1">
          <Button
            class="w-full"
            :type="addRecord.type === Types.income ? 'warning' : 'secondary'"
            @click="handleSwitchType(Types.income)"
            >{{ TypeCNTexts[Types.income] }}</Button
          >
        </div>
      </div>

      <div class="info flex">
        <Button
          type="secondary"
          class="select-category flex-1 flex flex-col justify-center items-center p-0"
          @click="$router.push('/select/add-record-select-category')"
        >
          <RemixIcon class="w-6 h-6" :icon="addRecord.category.icon" />
          <Text class="mt-1">
            {{ addRecord.category.name }}
          </Text>
        </Button>

        <div class="select-more flex flex-3 flex-col justify-between">
          <div class="select-more-top flex">
            <div class="select-input-wrapper flex-1">
              <InputDate
                class="w-full"
                :modelValue="addRecord.date"
                @update:modelValue="onDateSelect"
              >
                <template #placeholder>
                  <Button class="w-full cursor-pointer" type="secondary">{{
                    previewDate
                  }}</Button>
                </template>
              </InputDate>
            </div>
            <div class="select-input-wrapper flex-1">
              <Button
                class="w-full cursor-pointer"
                type="secondary"
                @click="$router.push('/select/add-record-select-wallet')"
                >{{ addRecord.wallet }}</Button
              >
            </div>
          </div>
          <div class="select-more-bottom flex">
            <Input
              class="w-full"
              :modelValue="addRecord.remark"
              placeholder="备注信息"
              inputmode="search"
              @update:modelValue="onRemarkInput"
              @focus="calculatorVisible = false"
            />
          </div>
        </div>
      </div>

      <div
        class="calculator-wrapper fixed left-0 right-0 w-full"
        v-show="calculatorVisible"
      >
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
import Tabbar from '../components/Tabbar.vue'
import ViewingArea from '../components/ViewingArea.vue'
import Calculator from '../components/Calculator.vue'
import Button from '../components/ui/Button.vue'
import Input from '../components/ui/Input.vue'
import InputDate from '@/components/InputDate.vue'
import Text from '@/components/ui/Text.vue'
import RemixIcon from '@/components/RemixIcon.vue'
import Heading from '@/components/ui/Heading.vue'
import { addRecordStrategy } from '../strategies/pageAddRecordStrategy'
import { toFixed } from '@/utils'

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
    return {
      ...addRecordStrategy(),
      toFixed,
    }
  },
}
</script>

<style lang="less" scoped>
.main-content {
  & button {
    color: var(--geist-foreground);
  }

  & .switch-type {
    margin-bottom: var(--geist-gap-half);
  }

  & .button-wrapper {
    &:not(:first-child) {
      margin-left: var(--geist-gap-half);
    }
  }

  & .info {
    margin-bottom: var(--geist-gap-half);
  }

  & .select-category {
    width: calc(2 * var(--geist-form-height) + 10px);
    height: calc(2 * var(--geist-form-height) + 10px);
    background-color: var(--geist-background);
    margin-right: var(--geist-gap-half);
  }

  & .select-more-top,
  & .select-more-bottom {
    & > .select-input-wrapper:first-child {
      margin-right: var(--geist-gap-half);
    }
  }
}

.calculator-wrapper {
  bottom: calc(var(--tabbar-height) + env(safe-area-inset-bottom));
}
</style>
