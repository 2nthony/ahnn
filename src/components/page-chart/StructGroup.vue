<template>
  <Group :title="title">
    <div class="struct-group" :class="type">
      <img
        v-if="!structData.length"
        src="/img/illustrations/undraw_void_3ggu.svg"
        alt="Struct"
        class="mt-gap px-gap w-1/2 mx-auto"
      />

      <Cell
        v-for="(item, index) in structData"
        :key="index"
        :title="item.category"
        :rightText="toFixed(item.cost)"
      >
        <template #title-icon>
          <div class="icon-wrapper circle" :class="type">
            <RemixIcon :icon="categoryNameIconMapping[item.category]" />
          </div>
        </template>

        <template #description>
          <div class="flex items-center">
            <Text>{{ toPercentage(item.cost / structTotal) }}%</Text>
            <div
              class="percentage-bar relative w-full h-1 ml-gap-half"
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
import { setProps } from '@app/utils/setProps'
import Group from '@app/components/Group.vue'
import Cell from '@app/components/Cell.vue'
import { toFixed, toPercentage } from '@app/utils'
import RemixIcon from '@app/components/RemixIcon.vue'
import Text from '@app/components/ui/Text.vue'
import { categoryNameIconMapping } from '@app/model/Category'

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
      categoryNameIconMapping,
      toFixed,
      toPercentage,
    }
  },
}
</script>

<style lang="less" scoped>
.struct-group {
  & .percentage-bar {
    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: var(--percentage-bar-width);
      border-radius: var(--geist-radius);
    }
  }

  &.payout {
    & .percentage-bar::after {
      background-color: var(--geist-success);
    }
  }
  &.income {
    & .percentage-bar::after {
      background-color: var(--geist-warning);
    }
  }
}
</style>
