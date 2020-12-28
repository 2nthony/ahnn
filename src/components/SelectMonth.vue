<template>
  <div class="select-month">
    <InputDate
      :type="'month'"
      :modelValue="value"
      @update:modelValue="onModelValue"
    >
      <template #placeholder>
        <Button type="secondary">
          <RemixIcon :icon="'calendar-2'" />
          {{ recordsQueryDate[0] }} - {{ recordsQueryDate[1] }}
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

export default defineComponent({
  components: { InputDate, Button, RemixIcon },

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
  position: fixed;
  left: 0;
  right: 0;
  bottom: calc(var(--tabbar-height) + env(safe-area-inset-bottom));
  height: var(--home-select-month-height);

  & button {
    color: var(--ahnn-foreground);
    width: 100%;
    background-color: var(--tabbar-background);
    backdrop-filter: saturate(180%) blur(5px);
    box-shadow: var(--tabbar-border-top);
    border-radius: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    & svg {
      margin-right: 0.5rem;
    }
  }
}
</style>
