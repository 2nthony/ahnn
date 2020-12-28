<template>
  <Group :title="title">
    <div class="struct-group" :class="type">
      <Cell
        v-for="(item, index) in structData"
        :key="index"
        :title="item.categoryName"
        :rightText="toFixed(item.cost)"
      >
        <template #title-icon>
          <div class="icon-wrapper" :class="type">
            <RemixIcon :icon="item.categoryIcon" />
          </div>
        </template>

        <template #description>
          <div class="ratio-group">
            <Text>{{ toPercentage(item.cost / structTotal) }}%</Text>
            <div
              class="percentage-bar"
              :style="{
                '--percentage-bar-width': `${toPercentage(
                  item.cost / structTotal,
                )}%`,
              }"
            ></div>
          </div>
        </template>
      </Cell>
    </div>
  </Group>
</template>

<script lang="ts">
import { setProps } from '@/utils/setProps'
import Group from '../Group.vue'
import Cell from '../Cell.vue'
import { toFixed, toPercentage } from '@/utils'
import RemixIcon from '../RemixIcon.vue'
import Text from '../ui/Text.vue'

export default {
  components: { Group, Cell, RemixIcon, Text },
  props: {
    title: setProps('string'),
    structData: setProps('array'),
    structTotal: setProps('number'),
    type: setProps('string'),
  },

  setup() {
    return {
      toFixed,
      toPercentage,
    }
  },
}
</script>

<style lang="less" scoped>
.struct-group {
  & .ratio-group {
    display: flex;
    align-items: center;

    & .percentage-bar {
      width: 100%;
      height: 5px;
      margin-left: var(--ahnn-gap-half);
      position: relative;

      &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: var(--percentage-bar-width);
        border-radius: var(--ahnn-radius);
      }
    }
  }

  &.payout {
    & .percentage-bar::after {
      background-color: var(--ahnn-success);
    }
  }
  &.income {
    & .percentage-bar::after {
      background-color: var(--ahnn-warning);
    }
  }
}
</style>
