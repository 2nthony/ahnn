<template>
  <Card
    :titleIcon="categoryNameIconMapping[record.category]"
    :title="record.category"
    :rightTextPrefixIcon="typeIcon[record.type]"
    :rightText="toFixed(record.cost)"
    :content="record.remark"
    :iconWrapperClass="['icon-wrapper', 'circle', record.type]"
    @click="handleShowMore"
  >
    <template v-if="showMore" #>
      <div class="flex justify-between mt-gap items-center">
        <Text>{{ record.date }}</Text>

        <div class="flex justify-end">
          <Button :size="'small'" @click.stop="handleEdit">修改</Button>
          <Button :size="'small'" type="error" @click.stop="handleDelete"
            >删除</Button
          >
        </div>
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { setProps } from '@app/utils/setProps'
import Text from './ui/Text.vue'
import { TypeCNTexts, Types } from '@app/model/Type'
import { computed, defineComponent, ref, watch } from 'vue'
import Button from './ui/Button.vue'
import { useStore } from '@app/store'
import { Record } from '@app/model/Record'
import { deleteRecord } from '@app/db/record'
import { createToast, destoryAllToasts } from 'vercel-toast'
import 'vercel-toast/dist/vercel-toast.css'
import Card from './Card.vue'
import { toFixed } from '@app/utils'
import { categoryNameIconMapping } from '@app/model/Category'
import { cache } from '@app/utils/cache'

export default defineComponent({
  components: { Text, Button, Card },

  props: {
    record: setProps('object'),
  },

  setup(props, { emit }) {
    const store = useStore()

    const record = computed(() => props.record as Record)

    const showMore = ref(false)
    const typeIcon = {
      [Types.income]: 'add',
      [Types.payout]: 'subtract',
    }

    watch(showMore, destoryAllToasts)

    const handleShowMore = () => {
      showMore.value = !showMore.value
    }

    const handleEdit = () => {
      store.commit('setAddRecord', props.record as Record)
      cache.setCache('origAddRecord', props.record)
      emit('edit')
    }

    const handleDelete = () => {
      createToast('确认删除这条记录吗？', {
        type: 'error',
        cancel: '取消',
        action: {
          text: '删除',
          callback(toast) {
            deleteRecord(record.value).then(() => {
              toast.destory()
              store.commit('deleteRecord', record.value.id)
              showMore.value = false

              emit('deleted')
            })
          },
        },
      })
    }

    return {
      TypeCNTexts,
      showMore,
      typeIcon,
      handleShowMore,
      handleEdit,
      handleDelete,
      toFixed,
      categoryNameIconMapping,
    }
  },
})
</script>
