<template>
  <div class="overflow-x-scroll flex mb-gap-half" ref="categoriesWrapperEl">
    <div
      class="flex flex-col items-center w-14 flex-none cursor-pointer mr-1"
      v-for="(category, index) in categories"
      :key="index"
      @click="handleSelectCategory(index)"
    >
      <div
        class="icon-wrapper circle mb-2 category-icon-wrapper"
        :class="{ [addRecord.type]: index === selectedCategoryIndex }"
      >
        <RemixIcon :icon="categoryNameIconMapping[category]" />
      </div>
      <Text :size="300">{{ category }}</Text>
    </div>
  </div>
</template>

<script lang="ts">
import { categoryNameIconMapping, presetCategories } from '@app/model/Category'
import { useStore } from '@app/store'
import { addRecordStrategy } from '@app/strategies/pageAddRecordStrategy'
import { appWidth } from '@app/utils'
import { computed, defineComponent, nextTick, ref, watch } from 'vue'
import RemixIcon from '@app/components/RemixIcon.vue'
import Text from '@app/components/ui/Text.vue'

export default defineComponent({
  components: { RemixIcon, Text },

  setup() {
    const store = useStore()
    const { addRecord } = addRecordStrategy()
    const categories = computed(() => {
      return presetCategories[addRecord.value.type]
    })
    const selectedCategoryIndex = ref(
      categories.value.findIndex((category) => {
        return category === addRecord.value.category
      }) || 0,
    )

    watch(
      () => addRecord.value.type,
      () => {
        selectedCategoryIndex.value = 0
      },
    )

    const categoriesWrapperEl = ref<HTMLDivElement | null>(null)
    nextTick(() => {
      const w14 = 3.5 // tw w-14 = 3.5rem
      const rem = 16 // 1rem = 16px
      if (selectedCategoryIndex.value) {
        const offsetX = rem * w14 * (selectedCategoryIndex.value + 1)
        if (offsetX > appWidth) {
          categoriesWrapperEl.value?.scrollTo({
            left: offsetX - appWidth / 2,
          })
        }
      }
    })

    function handleSelectCategory(index: number) {
      store.commit('setAddRecord', {
        category: categories.value[index],
      })
      selectedCategoryIndex.value = index
    }

    return {
      addRecord,
      categoriesWrapperEl,
      selectedCategoryIndex,
      categories,
      categoryNameIconMapping,

      handleSelectCategory,
    }
  },
})
</script>

<style lang="less" scoped>
.category-icon-wrapper {
  @apply w-8 h-8;

  & .remixicon {
    @apply w-5 h-5;
  }
}
</style>
