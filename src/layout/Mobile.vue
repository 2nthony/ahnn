<template>
  <div class="mobile">
    <ViewingArea
      v-if="title || $slots.title"
    ></ViewingArea>

    <slot></slot>
  </div>
</template>

<script>
import setProps from '../utils/setProps'
import ViewingArea from './ViewingArea.vue'
export default {
  components: { ViewingArea },
  props: {
    title: setProps('string')
  }
}
</script>
