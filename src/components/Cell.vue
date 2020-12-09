<template>
  <div class="cell" @click="handleClick">
    <div class="left">
      <div v-if="$slots.icon" class="icon">
        <slot name="icon"></slot>
      </div>

      <Text :size="500" class="title">
        <slot name="title">{{ title }}</slot>
      </Text>
    </div>

    <div v-if="rightText || link" class="right">
      <small v-if="rightText" class="text">{{ rightText }}</small>
      <RemixIcon :icon="'arrow-right-s'" class="link-icon" v-if="link" />
    </div>
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
    title: setProps('string'),
    rightText: setProps('string'),
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
  background-color: #fff;

  & + .cell {
    border-top: none;
  }

  &:active {
    background-color: var(--active-bg-color);
  }

  & .left,
  & .right {
    display: flex;
    align-items: center;
  }

  & .right {
    position: relative;

    & .text {
      color: var(--text-color-muted);
    }
  }

  & .icon {
    margin-right: 8px;
  }

  & .link-icon {
    margin-left: 8px;
  }
}
</style>
