<template>
  <div class="page-chart">
    <div class="category-chart-wrapper">
      <div class="category-chart" ref="categoryChartEl"></div>
    </div>

    <Group title="支出构成" class="payout struct-group">
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
    </Group>

    <Group title="收入构成" class="income struct-group">
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
    const categoryChartEl = ref(null)

    const records = computed(() => store.getters.records)
    const recordsQueryDate = computed(() => store.getters.recordsQueryDate)
    watch(recordsQueryDate, () => store.dispatch('readRecordsByQueryDate'))

    const splitedRecords = computed(() => splitRecordsByType(records.value))
    const payoutStruct = computed(() =>
      sortByCategory(splitedRecords.value.payoutRecords),
    )
    const payoutStructTotal = calcByKey(
      splitedRecords.value.payoutRecords,
      'cost',
    )
    const incomeStruct = computed(() =>
      sortByCategory(splitedRecords.value.incomeRecords),
    )
    const incomeStructTotal = calcByKey(
      splitedRecords.value.incomeRecords,
      'cost',
    )

    // TODO 换报表数据
    onMounted(() => {
      new Chart(categoryChartEl.value, {
        data: {
          labels: [
            '餐饮',
            '医药',
            '健康',
            '通用',
            '交通',
            '旅游',
            '投资',
            '购物',
            '住房',
            '礼物',
            '话费',
            '娱乐',
          ],
          datasets: [
            {
              chartType: 'bar',
              name: '支出',
              values: [
                1800,
                5000,
                3000,
                3500,
                201,
                938,
                114,
                872,
                1450,
                230,
                0,
                0,
              ],
            },
            {
              chartType: 'bar',
              name: '收入',
              values: [
                2800,
                3400,
                1000,
                2500,
                321,
                438,
                314,
                172,
                450,
                530,
                0,
                0,
              ],
            },
          ],
        },
        height: 200,
        colors: ['#0070f3', '#f5a623'],
        axisOptions: {
          xAxisMode: 'tick',
          yAxisMode: 'tick',
        },
      })
    })

    return {
      categoryChartEl,
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
      bottom: 100px;
    }
  }
}
</style>

<style lang="less" scoped>
.page-chart {
  & .category-chart-wrapper {
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
