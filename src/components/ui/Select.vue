<template>
  <div class="select" :class="{ small }">
    <Text class="selected-value">{{ innerSelected }}</Text>

    <select v-model="innerSelected" class="cursor-pointer">
      <option value="" disabled v-if="placeholder">
        {{ placeholder }}
      </option>
      <slot />
    </select>

    <div class="arrow" v-if="showArrow">
      <RemixIcon :icon="'arrow-down-s'" line />
    </div>
  </div>
</template>

<script lang="ts">
import { setProps } from '@app/utils/setProps'
import RemixIcon from '@app/components/RemixIcon.vue'
import { defineComponent, ref, watch } from 'vue'
import Text from './Text.vue'

export default defineComponent({
  components: { RemixIcon, Text },
  props: {
    small: setProps('boolean'),
    modelValue: setProps(['string', 'number']),
    placeholder: setProps('string'),
    showArrow: setProps('boolean', true),
  },

  setup(props, { emit }) {
    const innerSelected = ref(props.modelValue)
    watch(innerSelected, (v) => emit('update:modelValue', v))

    return {
      innerSelected,
    }
  },
})
</script>

<style lang="less" scoped>
.select {
  appearance: none;
  color: var(--geist-foreground);
  background: var(--geist-background);
  display: inline-flex;
  outline: none;
  border: 1px solid var(--accents-2);
  text-transform: uppercase;
  user-select: none;
  font-weight: 100;
  position: relative;
  overflow: hidden;
  transition: border 0.2s ease 0s, color 0.2s ease-out 0s,
    box-shadow 0.2s ease 0s;
  border-radius: var(--geist-radius);
  white-space: nowrap;
  line-height: 0;
  height: var(--geist-form-height);
  // min-width: 160px;
  position: relative;

  & select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    height: 100%;
    border: none;
    box-shadow: none;
    background: transparent;
    background-image: none;
    color: currentColor;
    font-size: 14px;
    margin-right: -20px;
    width: 100%;
    padding: 0 var(--geist-gap-half);
    text-transform: none;
    position: relative;
    &:-moz-focusring {
      color: transparent;
      text-shadow: 0 0 0 #000;
    }
    &:focus {
      outline: none;
    }
  }

  & .selected-value {
    position: absolute;
    // left: var(--geist-gap-half);
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  & .arrow {
    background: var(--geist-background);
    width: 30px;
    height: 100%;
    position: absolute;
    right: 0px;
    pointer-events: none;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    transition: border 0.2s ease 0s;
  }

  &:hover,
  &:focus-within {
    border-color: var(--accents-5);
  }

  &.small {
    // min-width: 105px;
    height: var(--geist-form-small-height);

    & select {
      font-size: 12px;
    }

    & .arrow {
      width: 25px;
    }
  }
}
</style>
