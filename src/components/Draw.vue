<template>
  <div class="bottom-0 fixed left-0 right-0">
    <transition name="slide-fade">
      <div v-if="visible" class="draw">
        <slot></slot>
      </div>
    </transition>

    <!-- modal frosted glass -->
    <transition name="fade">
      <div
        v-if="visible"
        class="modal-frosted-glass fixed left-0 top-0 right-0 bottom-0"
        @click.self="$emit('update:visible', false)"
      ></div>
    </transition>
  </div>
</template>

<script lang="ts">
import { setProps } from '@/utils/setProps'

export default {
  props: {
    visible: setProps('boolean'),
  },
}
</script>

<style lang="less" scoped>
.draw {
  padding: var(--geist-gap-half);
  padding-bottom: calc(env(safe-area-inset-bottom) + var(--geist-gap-half));
  z-index: 10;
  // background-color: var(--geist-background);
}

.modal-frosted-glass {
  z-index: -1;
  backdrop-filter: saturate(180%) blur(10px);
  background-color: var(--tabbar-background);
}
</style>

<style lang="less" scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
