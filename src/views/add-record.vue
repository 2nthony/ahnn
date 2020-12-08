<template>
  <div class="page-add-record">
    <ViewingArea :title="`${Number(money).toFixed(2)} 元`"></ViewingArea>

    <div class="main-content">
      <div class="switch-type">
        <div class="button-wrapper">
          <Button>支出</Button>
        </div>
        <div class="button-wrapper">
          <Button>收入</Button>
        </div>
      </div>

      <div class="info">
        <Button class="select-category">
          {{ addRecord.category.name }}
        </Button>

        <div class="select-more">
          <div class="select-more-top">
            <div class="select-input-wrapper select-date-wrapper">
              <Button>{{ previewDate }}</Button>
              <Input
                :modelValue="addRecord.date"
                type="date"
                class="date-selector"
                @update:modelValue="onDateSelect"
              />
            </div>
            <div class="select-input-wrapper">
              <Button>{{ addRecord.book }}</Button>
            </div>
          </div>
          <div class="select-more-bottom">
            <div class="select-input-wrapper">
              <Button>{{ addRecord.member }}</Button>
            </div>
            <div class="select-input-wrapper">
              <Button>{{ addRecord.account }}</Button>
            </div>
          </div>
        </div>
      </div>

      <div class="placeholder">
        <Input
          :modelValue="addRecord.remark"
          placeholder="备注信息"
          @update:modelValue="onRemarkInput"
        />
      </div>

      <Calculator @result="onCalcResult"></Calculator>
    </div>

    <Tabbar
      @back="$store.commit('initAddRecord')"
      :mainText="'保存'"
      @main-click="handleSave"
    >
      <template #main-icon>
        <check-icon />
      </template>
    </Tabbar>
  </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import Tabbar from '../components/Tabbar.vue'
import ViewingArea from '../layout/ViewingArea.vue'
import CheckIcon from '../feather/check.svg'
import Calculator from '../components/Calculator.vue'
import Button from '../components/ui/Button.vue'
import Input from '../components/ui/Input.vue'
import { getToday, getCNDayText } from '../utils/date'
import { useStore } from 'vuex'
import { HomeRecords } from '../mocks/home'
import * as db from '../db'
import { deepToRaw } from '../utils'
import { useRouter } from 'vue-router'

export default {
  components: { Tabbar, ViewingArea, CheckIcon, Calculator, Button, Input },

  setup() {
    const store = useStore()
    const money = ref<number>(0)
    const router = useRouter()

    const addRecord = computed(() => store.getters.addRecord)
    const previewDate = computed(() => getCNDayText(addRecord.value.date))

    const handleSave = () => {
      db.addRecord(deepToRaw(addRecord.value)).then(() => {
        router.push('/')
        store.commit('initAddRecord')
      })
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

    return {
      money,
      addRecord,
      previewDate,

      handleSave,
      onDateSelect,
      onRemarkInput,
      onCalcResult,
    }
  },
}
</script>

<style lang="less" scoped>
.main-content {
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
    padding: 0;
    flex: 1;
    width: 80px;
    height: 80px;
    border-radius: var(--radius);
    background-color: #fff;
    margin-right: var(--inline-gap);
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
      height: 36px;
      cursor: pointer;
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

  & .placeholder {
    width: 100%;

    & input {
      width: 100%;
    }
  }
}

// HACK: 透明日期选择器
.select-date-wrapper {
  position: relative;
}
.date-selector {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &::-webkit-calendar-picker-indicator {
    outline: none;
    background: none;
    color: transparent;
    height: auto;
    width: auto;
    position: absolute;
    bottom: 0;
    // 不知道它有多长
    left: -50%;
    right: 0;
    top: 0;
    cursor: pointer;
  }
}
</style>
