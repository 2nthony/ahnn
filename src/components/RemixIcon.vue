<template>
  <component
    v-if="icon"
    :is="
      require(`vue-remix-icons/icons/ri-${icon}-${line ? 'line' : 'fill'}.js`)
        .default
    "
  />
</template>

<script lang="ts">
import { setProps } from '@app/utils/setProps'
export default {
  props: {
    icon: setProps('string'),
    line: setProps('boolean', false),
  },
}
</script>
