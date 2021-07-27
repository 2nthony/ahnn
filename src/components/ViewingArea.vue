<template>
  <div
    class="
      viewing-area
      flex
      items-center
      justify-center
      w-full
      h-48
      my-gap-half
    "
  >
    <slot>
      <slot name="title">
        <div class="w-full flex justify-center px-4">
          <Heading :size="900">{{ title }}</Heading>
        </div>
      </slot>
    </slot>
  </div>
</template>

<script>
import Heading from '@app/components/ui/Heading.vue'
import { setProps } from '@app/utils/setProps'
export default {
  components: { Heading },
  props: {
    title: setProps('string'),
  },
}
</script>
