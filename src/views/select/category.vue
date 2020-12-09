<template>
  <PageSelect
    :title="title"
    :items="items"
    @item-click="handleItemClick"
  ></PageSelect>
</template>

<script lang="ts">
import { computed } from 'vue'
import { presetCategories } from '@/model/Category'
import { useStore } from '@/store'
import { TypeCNTexts } from '@/model/Type'
import { MutationTypes } from '@/store/mutations'
import { useRouter } from 'vue-router'
import PageSelect from '@/layout/PageSelect.vue'

export default {
  components: { PageSelect },

  setup() {
    const store = useStore()
    const router = useRouter()
    const addRecord = store.getters.addRecord
    const title = `${TypeCNTexts[addRecord.type]}分类`
    const categories = presetCategories[addRecord.type]
    const items = computed(() => {
      return categories.map((category) => {
        return {
          title: category.name,
          icon: category.icon,
        }
      })
    })

    const handleItemClick = (i: number) => {
      store.commit(MutationTypes.setAddRecord, {
        category: categories[i],
      })
      router.back()
    }

    return { title, items, handleItemClick }
  },
}
</script>
