<template>
  <div class="textarea-wrapper">
    <textarea
      ref="el"
      autocapitalize="off"
      autocomplete="off"
      autocorrect="off"
      spellcheck="false"
      :placeholder="placeholder"
      :value="modelValue"
      @input="(e) => $emit('update:modelValue', e.target.value)"
    ></textarea>
  </div>
</template>

<script lang="ts">
import { useHTMLEl } from '@app/hooks/useHTMLEl'
import { setProps } from '@app/utils/setProps'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  props: {
    modelValue: setProps('string'),
    placeholder: setProps('string'),
  },

  setup() {
    const { el } = useHTMLEl<HTMLTextAreaElement>()

    return {
      el,
    }
  },
})
</script>

<style lang="less" scoped>
.textarea-wrapper {
  align-items: center;
  border-radius: 5px;
  border: 1px solid var(--accents-2);
  display: inline-flex;
  position: relative;
  transition: border 0.2s ease 0s, color 0.2s ease 0s;
  vertical-align: middle;
  background: var(--geist-background);

  & textarea {
    background-color: transparent;
    border-radius: 0px;
    border: none;
    box-shadow: none;
    box-sizing: border-box;
    display: block;
    font-family: var(--font-sans);
    line-height: 1.7;
    height: 100%;
    min-height: 100px;
    outline: 0px;
    padding: 7px 10px;
    resize: none;
    width: 100%;
    color: var(--geist-foreground);
  }
}
</style>
