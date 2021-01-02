<template>
  <Pane class="card" :float="3">
    <div class="title-group" v-if="title || rightText">
      <div class="title">
        <div :class="iconWrapperClass" class="icon-wrapper">
          <RemixIcon :icon="titleIcon" v-if="titleIcon" />
        </div>
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
import { setProps } from '@app/utils/setProps'
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
    iconWrapperClass: setProps(['string', 'array', 'object']),
  },
}
</script>

<style lang="less" scoped>
.card {
  padding: var(--geist-gap);
  background-color: var(--geist-background);
  border-radius: var(--geist-radius);
  cursor: pointer;

  & + .card {
    margin-top: var(--geist-gap);
  }

  &:hover {
    background-color: var(--accents-1);
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

      & .icon-wrapper {
        margin-right: var(--geist-gap-half);
      }
    }

    & .right {
      display: flex;
      align-items: center;
    }
  }

  & .content {
    margin-top: var(--geist-gap);
  }
}
</style>
