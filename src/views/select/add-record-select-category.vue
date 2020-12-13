<template>
  <PageSelect
    :title="title"
    :items="categories"
    @item-click="handleItemClick"
  ></PageSelect>
</template>

<script lang="ts">
import { presetCategories } from '@/model/Category'
import { useStore } from '@/store'
import { TypeCNTexts } from '@/model/Type'
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

    const handleItemClick = (index: number) => {
      store.commit('setAddRecord', {
        category: categories[index],
      })
      router.back()
    }

    return { title, categories, handleItemClick }
  },
}
</script>
