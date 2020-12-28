<template>
  <Group :title="title">
    <div class="struct-group" :class="[type]">
      <Cell
        v-for="(item, index) in structData"
        :key="index"
        :title="item.categoryName"
        :rightText="toFixed(item.cost)"
      >
        <template #title-icon>
          <div class="icon-wrapper">
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

  & .ratio-group {
    display: flex;
    align-items: center;

    & .percentage-bar {
      width: 100%;
      height: 5px;
      margin-left: var(--inline-gap);
      position: relative;

      &::after {
        content: '';
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
</style>
