<template>
  <component
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
    icon: setProps('string', '', {
      required: true,
    }),
    fill: setProps('boolean'),
  },
}
</script>
