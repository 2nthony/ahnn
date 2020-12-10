<template>
  <Pane class="home-record-pane" :evelation="1">
    <div class="top">
      <div class="title">
        <RemixIcon :icon="record.category.icon" />
        <Text>{{ record.category.name }}</Text>
      </div>
      <div class="cost">
        <Text>{{ Number(record.cost).toFixed(2) }}</Text>
      </div>
    </div>

    <div class="bottom" v-if="record.remark">
      <Text class="remark" :color="'muted'">{{ record.remark }}</Text>
    </div>
  </Pane>
</template>

<script lang="ts">
import { setProps } from '@/utils/setProps'
import Pane from './ui/Pane.vue'
import RemixIcon from './RemixIcon.vue'
import Text from './ui/Text.vue'
import Heading from './ui/Heading.vue'
import { TypeCNTexts } from '@/model/Type'

export default {
  components: { Pane, RemixIcon, Text, Heading },

  props: {
    record: setProps('object'),
  },

  setup() {
    return { TypeCNTexts }
  },
}
</script>

<style lang="less" scoped>
.home-record-pane {
  padding: var(--gap);
  background-color: #fff;

  & + .home-record-pane {
    margin-top: var(--gap);
  }

  & .top {
    display: flex;
    justify-content: space-between;
  }

  & .title {
    display: flex;
    align-items: center;

    & svg {
      width: 1.25rem;
      height: 1.25rem;
      margin-right: var(--inline-gap);
    }
  }

  & .bottom {
    margin-top: var(--gap);

    & .remark {
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
    }
  }
}
</style>
