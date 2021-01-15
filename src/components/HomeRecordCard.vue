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
      <div class="more-detail">
        <Text>{{ record.date }}</Text>
        <Text>{{ record.wallet }}</Text>
      </div>

      <div class="action-group">
        <Button :size="'small'" @click.stop="handleEdit">修改</Button>
        <Button :size="'small'" type="error" @click.stop="handleDelete"
          >删除</Button
        >
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { setProps } from '@app/utils/setProps'
import Text from './ui/Text.vue'
import { shouldAdjustType, TypeCNTexts, Types } from '@app/model/Type'
import { computed, defineComponent, ref, watch } from 'vue'
import Button from './ui/Button.vue'
import { useRouter } from 'vue-router'
import { useStore } from '@app/store'
import { Record } from '@app/model/Record'
import { deleteRecord } from '@app/db/record'
import { createToast, destoryAllToasts } from 'vercel-toast'
import 'vercel-toast/dist/vercel-toast.css'
import Card from './Card.vue'
import { adjustWalletBalance } from '@app/db/wallet'
import { toFixed } from '@app/utils'
import { categoryNameIconMapping } from '@app/model/Category'
import { cache } from '@app/utils/cache'

export default defineComponent({
  components: { Text, Button, Card },

  props: {
    record: setProps('object'),
  },

  setup(props, { emit }) {
    const router = useRouter()
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
      // router.push('/edit-record')
      emit('edit')
    }

    const handleDelete = () => {
      const fns: Promise<any>[] = [deleteRecord(record.value)]

      // 回退费用到对应钱包
      // income 为负数，从钱包扣回此收入
      // payout 为正数，从钱包增加此支出
      if (shouldAdjustType(record.value.type)) {
        const returnCost =
          record.value.type === Types.income
            ? 0 - record.value.cost
            : record.value.cost

        fns.push(adjustWalletBalance(record.value.wallet, returnCost))
      }
      createToast('确认删除这条记录吗？', {
        type: 'error',
        cancel: '取消',
        action: {
          text: '删除',
          callback(toast) {
            Promise.all(fns).then(() => {
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

<style lang="less" scoped>
.more-detail {
  margin-top: var(--geist-gap);
  display: flex;
  justify-content: space-between;
}

.action-group {
  margin-top: var(--geist-gap);
  display: flex;
  justify-content: flex-end;
}
</style>
