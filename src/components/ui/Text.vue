<template>
  <span :style="computedStyle"><slot/></span>
</template>

<script lang="ts">
import { computed } from 'vue'
import setProps from '../../utils/setProps'

// 400
const mediumText = {
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '20px',
  letterSpacing: '-0.05px',
}

export default {
  props: {
    size: setProps('number', 400)
  },

  setup(props: { size: number }) {
    const styles: {[k: number]: object} = {
      [300]: { ...mediumText, fontSize: '12px', letterSpacing: 0, lineHeight: '16px' },
      [400]: mediumText,
      [500]: { ...mediumText, fontSize: '16px', },
    }
    const computedStyle = computed(() => styles[props.size])

    return { computedStyle }
  }
}
</script>
