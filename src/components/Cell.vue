<template>
  <div class="cell" @click="handleClick">
    <div class="content-group">
      <div class="title-group">
        <div class="left">
          <div v-if="titleIcon || $slots['title-icon']" class="title-icon">
            <RemixIcon v-if="titleIcon" :icon="titleIcon" />
            <slot v-if="$slots['title-icon']" name="title-icon"></slot>
          </div>

          <slot name="title">
            <Text :size="500" class="title">{{ title }}</Text>
          </slot>
        </div>

        <div v-if="rightText || link || $slots['right-text']" class="right">
          <small v-if="rightText || $slots['right-text']" class="text">
            <slot name="right-text">{{ rightText }}</slot>
          </small>
        </div>
      </div>

      <div v-if="description || $slots.description" class="description">
        <slot name="description">
          <Text v-if="description">{{ description }}</Text>
        </slot>
      </div>
    </div>

    <RemixIcon :icon="'arrow-right-s'" class="link-icon" v-if="link" />
  </div>
</template>

<script>
import { setProps } from '../utils/setProps'
import { useRouter } from 'vue-router'
import Text from './ui/Text.vue'
import RemixIcon from './RemixIcon.vue'

export default {
  components: {
    RemixIcon,
    Text,
  },

  props: {
    titleIcon: setProps('string'),
    title: setProps('string'),
    rightText: setProps('string'),
    description: setProps('string'),
    link: setProps(['boolean', 'string']),
  },

  setup(props) {
    const router = useRouter()

    const handleClick = () => {
      if (typeof props.link === 'string') {
        router.push(props.link)
      }
    }

    return {
      handleClick,
    }
  },
}
</script>

<style lang="less" scoped>
.cell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px var(--gap);
  position: relative;
  background-color: var(--ahnn-background);
  cursor: pointer;

  & + .cell {
    border-top: none;
  }

  &:hover {
    background-color: var(--accents-1);
  }

  &:active {
    background-color: var(--accents-2);
  }

  & .content-group {
    display: flex;
    flex-direction: column;
    width: 100%;

    & .title-group {
      display: flex;
      align-items: center;
      justify-content: space-between;
      & .left,
      & .right {
        display: flex;
        align-items: center;
      }

      & .right {
        position: relative;

        & .text {
          color: var(--ahnn-secondary-dark);
        }
      }

      & .title-icon {
        display: flex;
        margin-right: 8px;
      }
    }

    & .description {
      margin-top: var(--inline-gap);
    }
  }

  & .link-icon {
    margin-left: 8px;
  }
}
</style>
