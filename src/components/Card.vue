<template>
  <Pane class="card" :float="3">
    <div class="title-group">
      <div class="title">
        <RemixIcon :icon="titleIcon" />
        <Text>{{ title }}</Text>
      </div>
      <div class="right">
        <RemixIcon :icon="rightTextPrefixIcon" v-if="rightTextPrefixIcon" />
        <Text>{{ rightText }}</Text>
      </div>
    </div>

    <div class="content" v-if="content">
      <Text>{{ content }}</Text>
    </div>

    <slot />
  </Pane>
</template>

<script lang="ts">
import { setProps } from '@/utils/setProps'
import Pane from './ui/Pane.vue'
import Text from './ui/Text.vue'
import RemixIcon from './RemixIcon.vue'

export default {
  components: { Pane, Text, RemixIcon },
  props: {
    title: setProps('string'),
    titleIcon: setProps('string'),
    rightTextPrefixIcon: setProps('string'),
    rightText: setProps('string'),
    content: setProps('string'),
  },
}
</script>

<style lang="less" scoped>
.card {
  padding: var(--gap);
  background-color: var(--ahnn-background);
  border-radius: var(--radius);

  & + .card {
    margin-top: var(--gap);
  }

  &:active {
    background-color: var(--accents-2);
  }

  & .title-group {
    display: flex;
    justify-content: space-between;

    & .title {
      display: flex;
      align-items: center;

      & svg {
        width: 1.25rem;
        height: 1.25rem;
        margin-right: var(--inline-gap);
      }
    }

    & .right {
      display: flex;
      align-items: center;
    }
  }

  & .content {
    margin-top: var(--gap);
  }
}
</style>
