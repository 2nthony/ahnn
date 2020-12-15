<template>
  <Card
    :titleIcon="record.category.icon"
    :title="record.category.name"
    :rightTextPrefixIcon="typeIcon[record.type]"
    :rightText="Number(record.cost).toFixed(2)"
    :content="record.remark"
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
import { setProps } from '@/utils/setProps'
import Pane from './ui/Pane.vue'
import RemixIcon from './RemixIcon.vue'
import Text from './ui/Text.vue'
import { TypeCNTexts, Types } from '@/model/Type'
import { computed, defineComponent, ref, watch } from 'vue'
import Button from './ui/Button.vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import { Record } from '@/model/Record'
import { deleteRecord } from '@/db'
import { createToast, destoryAllToasts } from 'vercel-toast'
import 'vercel-toast/dist/vercel-toast.css'
import Card from './Card.vue'
import { returnCostToWallet } from '@/db/wallet'

export default defineComponent({
  components: { Pane, RemixIcon, Text, Button, Card },

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
      router.push('/edit-record')
    }

    const handleDelete = () => {
      // 回退费用到对应钱包
      // income 为负数，从钱包扣回此收入
      // payout 为正数，从钱包增加此支出
      const returnCost =
        record.value.type === Types.income
          ? 0 - record.value.cost
          : record.value.cost

      createToast('确认删除这条记录吗？', {
        type: 'error',
        cancel: '取消',
        action: {
          text: '删除',
          callback(toast) {
            Promise.all([
              deleteRecord(record.value),
              returnCostToWallet(record.value.wallet, returnCost),
            ]).then(() => {
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
    }
  },
})
</script>

<style lang="less" scoped>
.more-detail {
  margin-top: var(--gap);
  display: flex;
  justify-content: space-between;
}

.action-group {
  margin-top: var(--gap);
  display: flex;
  justify-content: flex-end;
}
</style>
