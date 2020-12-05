<template>
  <h2 :style="computedStyle"><slot/></h2>
</template>

<script lang="ts">
import { computed } from 'vue'
import setProps from '../../utils/setProps'

// 200
const smallHeading = {
  fontSize: '12px',
  fontWeight: 600,
  lineHeight: '16px',
  letterSpacing: 0,
  color: '#66788a',
}

// 400
const mediumHeading = {
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '20px',
  letterSpacing: '-0.05px',
  color: '#234361',
}

// 800
const largeHeading = {
  fontSize: '29px',
  fontWeight: 500,
  lineHeight: '32px',
  letterSpacing: '-0.2px',
  color: '#234361',
}

export default {
  props: {
    size: setProps('number', 500)
  },

  setup(props: { size: number }) {
    const styles: {[k: number]: object} = {
      [100]: { ...smallHeading, fontSize: '11px', fontWeight: 400 },
      [200]: smallHeading,
      [300]: { ...smallHeading, color: '#234361' },
      [400]: mediumHeading,
      [500]: { ...mediumHeading, fontSize: '16px', fontWeight: 500, },
      [600]: { ...mediumHeading, fontSize: '20px', fontWeight: 500, lineHeight: '24px', },
      [700]: { ...largeHeading, fontSize: '24px', lineHeight:'28px', letterSpacing: '-0.07px' },
      [800]: largeHeading,
      [900]: { ...largeHeading, fontSize: '35px', lineHeight:'40px', letterSpacing: '-0.2px', },
    }
    const computedStyle = computed(() => styles[props.size])

    return { computedStyle }
  }
}
</script>
