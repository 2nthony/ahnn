<template>
  <div class="select-month fixed left-0 right-0">
    <InputDate
      :type="'month'"
      :modelValue="value"
      @update:modelValue="onModelValue"
    >
      <template #placeholder>
        <Button
          type="secondary"
          class="w-full flex items-center justify-center"
        >
          <RemixIcon :icon="'calendar-2'" class="mr-2" />
          <Text class="text-foreground"
            >{{ recordsQueryDate[0] }} - {{ recordsQueryDate[1] }}</Text
          >
        </Button>
      </template>
    </InputDate>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import InputDate from './InputDate.vue'
import { setProps } from '@/utils/setProps'
import dayjs from 'dayjs'
import { useStore } from '@/store'
import { getThisMonth } from '@/utils/date'
import Button from './ui/Button.vue'
import RemixIcon from './RemixIcon.vue'
import Text from './ui/Text.vue'

export default defineComponent({
  components: { InputDate, Button, RemixIcon, Text },

  setup(props) {
    const store = useStore()
    const recordsQueryDate = computed(() => store.getters.recordsQueryDate)

    const value = computed(() => {
      return dayjs()
        .year(recordsQueryDate.value[0])
        .month(recordsQueryDate.value[1] - 1)
        .format('YYYY-MM')
    })

    const onModelValue = (val: string) => {
      const [y, m] = (val || getThisMonth()).split('-')
      store.commit('setRecordsQueryDate', [Number(y), Number(m)])
    }

    return {
      value,
      recordsQueryDate,
      onModelValue,
    }
  },
})
</script>

<style lang="less" scoped>
.select-month {
  bottom: calc(var(--tabbar-height) + env(safe-area-inset-bottom));
  height: var(--home-select-month-height);
  border-top: 1px solid var(--accents-2);

  & button {
    background-color: var(--tabbar-background);
    backdrop-filter: saturate(180%) blur(5px);
    border: none;
    border-radius: 0;
  }
}
</style>
