<template>
  <div class="page-chart">
    <Group title="月度对比">
      <div class="year-chart-wrapper">
        <div class="year-chart" ref="yearChartEl"></div>
      </div>
    </Group>

    <Group title="支出构成">
      <div class="payout struct-group">
        <Cell
          v-for="(payout, index) in payoutStruct"
          :key="index"
          :title="payout.categoryName"
          :rightText="toFixed(payout.cost)"
        >
          <template #title-icon>
            <div class="icon-wrapper">
              <RemixIcon :icon="payout.categoryIcon" />
            </div>
          </template>

          <template #description>
            <div class="ratio-group">
              <Text>{{ toPercentage(payout.cost / payoutStructTotal) }}%</Text>
              <div
                class="percentage-bar"
                :style="{
                  '--percentage-bar-width': `${toPercentage(
                    payout.cost / payoutStructTotal,
                  )}%`,
                }"
              ></div>
            </div>
          </template>
        </Cell>
      </div>
    </Group>

    <Group title="收入构成">
      <div class="income struct-group">
        <Cell
          v-for="(income, index) in incomeStruct"
          :key="index"
          :title="income.categoryName"
          :rightText="toFixed(income.cost)"
        >
          <template #title-icon>
            <div class="icon-wrapper">
              <RemixIcon :icon="income.categoryIcon" />
            </div>
          </template>

          <template #description>
            <div class="ratio-group">
              <Text>{{ toPercentage(income.cost / incomeStructTotal) }}%</Text>
              <div
                class="percentage-bar"
                :style="{
                  '--percentage-bar-width': `${toPercentage(
                    income.cost / incomeStructTotal,
                  )}%`,
                }"
              ></div>
            </div>
          </template>
        </Cell>
      </div>
    </Group>
  </div>

  <SelectMonth></SelectMonth>
  <HomeTabbar></HomeTabbar>
</template>

<script lang="ts">
import HomeTabbar from '../components/HomeTabbar.vue'
import { Chart } from 'frappe-charts/dist/frappe-charts.esm'
import 'frappe-charts/dist/frappe-charts.min.css'
import { computed, onMounted, ref, watch } from 'vue'
import SelectMonth from '@/components/SelectMonth.vue'
import { useStore } from '@/store'
import Group from '@/components/Group.vue'
import Cell from '@/components/Cell.vue'
import RemixIcon from '@/components/RemixIcon.vue'
import { splitRecordsByType } from '@/utils/record'
import { sortByCategory } from '@/utils/chart'
import { calcByKey, toFixed, toPercentage } from '@/utils'
import Text from '@/components/ui/Text.vue'
import { readRecordsByYear } from '@/db'
import { Types } from '@/model/Type'
import { monthsInYear } from '@/utils/date'

export default {
  components: {
    HomeTabbar,
    SelectMonth,
    Group,
    Cell,
    RemixIcon,
    Text,
  },

  setup() {
    const store = useStore()
    const yearChartEl = ref(null)

    const records = computed(() => store.getters.records)
    const recordsQueryDate = computed(() => store.getters.recordsQueryDate)
    watch(recordsQueryDate, () => store.dispatch('readRecordsByQueryDate'))

    const splitedRecords = computed(() => splitRecordsByType(records.value))
    const payoutStruct = computed(() =>
      sortByCategory(splitedRecords.value.payoutRecords),
    )
    const payoutStructTotal = computed(() =>
      calcByKey(splitedRecords.value.payoutRecords, 'cost'),
    )
    const incomeStruct = computed(() =>
      sortByCategory(splitedRecords.value.incomeRecords),
    )
    const incomeStructTotal = computed(() =>
      calcByKey(splitedRecords.value.incomeRecords, 'cost'),
    )

    onMounted(() => {
      readRecordsByYear(2020).then((yearRecords) => {
        new Chart(yearChartEl.value, {
          data: {
            labels: yearRecords.map((item) => item.month + '月'),
            datasets: [
              {
                chartType: 'bar',
                name: '支出',
                values: yearRecords.map((item) => {
                  return calcByKey(
                    item.records.filter(
                      (record) => record.type === Types.payout,
                    ),
                    'cost',
                  )
                }),
              },
              {
                chartType: 'bar',
                name: '收入',
                values: yearRecords.map((item) => {
                  return calcByKey(
                    item.records.filter(
                      (record) => record.type === Types.income,
                    ),
                    'cost',
                  )
                }),
              },
            ],
          },
          height: 200,
          // theme.less: success, warning
          colors: ['#0070f3', '#f5a623'],
          axisOptions: {
            xAxisMode: 'tick',
            yAxisMode: 'tick',
          },
        })
      })
    })

    return {
      yearChartEl,
      payoutStruct,
      incomeStruct,
      payoutStructTotal,
      incomeStructTotal,

      toFixed,
      toPercentage,
    }
  },
}
</script>

<style lang="less">
.page-chart {
  & .chart-container {
    & .graph-svg-tip {
      // 禁止上定位
      top: auto !important;
      bottom: 150px;
    }
  }
}
</style>

<style lang="less" scoped>
.page-chart {
  & .year-chart-wrapper {
    min-height: 203px;
    margin-bottom: var(--gap);
  }

  & .icon-wrapper {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    & svg {
      fill: var(--ahnn-white);
    }
  }

  & .struct-group {
    & .ratio-group {
      display: flex;
      align-items: center;

      & .percentage-bar {
        width: 100%;
        height: 5px;
        margin-left: var(--inline-gap);
        position: relative;

        &::after {
          content: ' ';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: var(--percentage-bar-width);
          border-radius: var(--radius);
        }
      }
    }

    &.payout {
      & .icon-wrapper {
        background-color: var(--ahnn-success);
      }

      & .percentage-bar::after {
        background-color: var(--ahnn-success);
      }
    }
    &.income {
      & .icon-wrapper {
        background-color: var(--ahnn-warning);
      }

      & .percentage-bar::after {
        background-color: var(--ahnn-warning);
      }
    }
  }
}
</style>
