<template>
  <component
    v-if="icon"
    :is="
      require(`vue-remix-icons/icons/ri-${icon}-${fill ? 'fill' : 'line'}.js`)
        .default
    "
  />
</template>

<script lang="ts">
import { setProps } from '@/utils/setProps'
export default {
  props: {
    icon: setProps('string'),
    fill: setProps('boolean'),
  },
}
</script>
