<template>
  <Draw :visible="visible" @update:visible="(v) => $emit('update:visible', v)">
    <Textarea
      ref="textareaEl"
      class="w-full mb-gap-half"
      placeholder="填写备注"
      v-model="inputRemark"
    ></Textarea>

    <div class="text-right">
      <Button type="secondary" @click="$emit('update:visible', false)"
        >关闭</Button
      >
      <Button :type="'success'" @click="handleSaveRemark">保存</Button>
    </div>
  </Draw>
</template>

<script lang="ts">
import { useHTMLEl } from '@app/hooks/useHTMLEl'
import Textarea from '../ui/Textarea.vue'
import { isIOS } from '@app/utils/platform'
import { defineComponent, nextTick, ref, watch } from 'vue'
import { useStore } from '@app/store'
import { addRecordStrategy } from '@app/strategies/pageAddRecordStrategy'
import { setProps } from '@app/utils/setProps'
import Draw from '../Draw.vue'
import Button from '../ui/Button.vue'

export default defineComponent({
  components: { Textarea, Draw, Button },

  props: {
    visible: setProps('boolean'),
  },

  setup(props, { emit }) {
    const store = useStore()
    const textareaEl = ref<any>(null)
    const { addRecord } = addRecordStrategy()
    const inputRemark = ref('')

    watch(
      () => props.visible,
      (val) => {
        if (val) {
          inputRemark.value = addRecord.value.remark || ''
          if (!isIOS) nextTick(() => textareaEl.value?.el.focus())
        }
      },
    )

    function handleSaveRemark() {
      store.commit('setAddRecord', { remark: inputRemark.value })
      emit('update:visible', false)
    }

    return {
      addRecord,
      textareaEl,
      inputRemark,

      handleSaveRemark,
    }
  },
})
</script>
