<template>
  <div class="page-chart">
    <Group title="月度对比" class="comparison-group">
      <div class="year-chart-wrapper">
        <div class="year-chart" ref="yearChartEl"></div>
      </div>
    </Group>

    <StructGroup
      title="支出构成"
      :type="'payout'"
      :structData="payoutStruct"
      :structTotal="payoutStructTotal"
    ></StructGroup>

    <StructGroup
      title="收入构成"
      :type="'income'"
      :structData="incomeStruct"
      :structTotal="incomeStructTotal"
    ></StructGroup>
  </div>

  <SelectMonth></SelectMonth>
  <HomeTabbar></HomeTabbar>
</template>

<script lang="ts">
import HomeTabbar from '@app/components/HomeTabbar.vue'
import AxisChart from '@modules/frappe-charts/charts/AxisChart'
import '@modules/frappe-charts/charts.less'
import { computed, onMounted, ref, watch } from 'vue'
import SelectMonth from '@app/components/SelectMonth.vue'
import { useStore } from '@app/store'
import Group from '@app/components/Group.vue'
import Cell from '@app/components/Cell.vue'
import RemixIcon from '@app/components/RemixIcon.vue'
import { splitRecordsByType } from '@app/utils/record'
import { sortByCategory } from '@app/utils/chart'
import { calcByKey } from '@app/utils'
import Text from '@app/components/ui/Text.vue'
import { readRecordsByYear } from '@app/db/record'
import { Types } from '@app/model/Type'
import { monthsInYear } from '@app/utils/date'
import StructGroup from '@app/components/page-chart/StructGroup.vue'

export default {
  components: {
    HomeTabbar,
    SelectMonth,
    Group,
    Cell,
    RemixIcon,
    Text,
    StructGroup,
  },

  setup() {
    const store = useStore()
    const yearChartEl = ref(null)

    const records = computed(() => store.getters.records)

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
      const recordsQueryDate = computed(() => store.getters.recordsQueryDate)
      const queryDateYear = computed(() => recordsQueryDate.value[0])
      watch(
        queryDateYear,
        (y) => {
          readRecordsByYear(y).then((yearRecords) => {
            new AxisChart(yearChartEl.value, {
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
        },
        {
          immediate: true,
        },
      )
    })

    return {
      yearChartEl,
      payoutStruct,
      incomeStruct,
      payoutStructTotal,
      incomeStructTotal,
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
      background-color: var(--geist-foreground);

      & .title,
      & .data-point-list,
      & .data-point-list strong {
        color: var(--geist-background);
      }

      & .svg-pointer {
        border-top-color: var(--geist-foreground);
      }
    }

    & .axis,
    & .chart-label,
    & .legend-dataset-text {
      fill: var(--geist-foreground);
    }
  }
}
</style>

<style lang="less" scoped>
.page-chart {
  & .comparison-group {
    margin-top: var(--geist-gap);
  }

  & .year-chart-wrapper {
    min-height: 203px;
    margin-bottom: var(--geist-gap);

    & .year-chart {
      position: relative;
      left: 10px;
    }
  }
}
</style>
