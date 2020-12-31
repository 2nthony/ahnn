<template>
  <div class="page-feedback">
    <ViewingArea title="建议与反馈"></ViewingArea>

    <form @submit.prevent>
      <Textarea
        class="w-full mb-gap"
        v-model="input"
        placeholder="输入建议与反馈，你可以在这里畅所欲言。当然也可以以文字来鼓励一下作者。"
      ></Textarea>

      <section class="flex items-center justify-between">
        <div class="flex">
          <span
            class="emotion-icon text-3xl mr-5 opacity-60 cursor-pointer hover:scale-125 transition-transform"
            :class="{ ['scale-125 opacity-100']: selectedIndex === index }"
            v-for="(emotion, index) in emotions"
            :key="emotion"
            @click="selectedIndex = index"
            >{{ emotion }}</span
          >
        </div>

        <div class="text-right">
          <Button
            :disabled="loading || !input"
            type="submit"
            @click="handleSend"
            >发送</Button
          >
        </div>
      </section>
    </form>
  </div>

  <Tabbar></Tabbar>
</template>

<script lang="ts">
import Textarea from '@/components/ui/Textarea.vue'
import Tabbar from '../../components/Tabbar.vue'
import ViewingArea from '../../components/ViewingArea.vue'
import { ref } from 'vue'
import Button from '@/components/ui/Button.vue'
import RemixIcon from '@/components/RemixIcon.vue'
import { useAxios } from '@/hooks/useAxios'
import { createToast } from 'vercel-toast'
import 'vercel-toast/dist/vercel-toast.css'

export default {
  components: { ViewingArea, Tabbar, Textarea, Button },

  setup() {
    const { axios, loading } = useAxios()
    const input = ref('')
    const selectedIndex = ref()
    const emotions = ['🤩', '😃', '😕', '😔']

    function handleSend() {
      axios
        .post('/api/feedback', {
          title: input.value,
          emotion: emotions[selectedIndex.value] || '',
          userAgent: navigator.userAgent,
        })
        .then(() => {
          createToast('我们已经收到你的反馈，非常感谢！', {
            type: 'success',
            timeout: 3000,
          })
          input.value = ''
        })
        .finally(() => {
          loading.value = false
        })
    }

    return {
      input,
      selectedIndex,
      emotions,
      loading,

      handleSend,
    }
  },
}
</script>

<style lang="less" scoped>
.emotion-icon {
  fill: var(--geist-warning-light);
  transform: scale(var(--tw-scale-x), var(--tw-scale-y));
}
</style>
