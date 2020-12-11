<template>
  <Pane class="home-record-pane" :float="3" @click="handleShowMore">
    <div class="top">
      <div class="title">
        <RemixIcon :icon="record.category.icon" />
        <Text>{{ record.category.name }}</Text>
      </div>
      <div class="cost">
        <RemixIcon :icon="typeIcon[record.type]" />
        <Text> {{ Number(record.cost).toFixed(2) }}</Text>
      </div>
    </div>

    <div class="bottom" v-if="record.remark">
      <Text class="remark" :class="{ ellpsis: !showMore }">{{
        record.remark
      }}</Text>
    </div>

    <template v-if="showMore">
      <div class="more-detail">
        <Text>{{ record.date }}</Text>
        <Text>{{ record.wallet }}</Text>
      </div>

      <div class="action-group">
        <Button @click.stop="handleEdit">修改</Button>
        <Button type="error" @click.stop="handleDelete">删除</Button>
      </div>
    </template>
  </Pane>
</template>

<script lang="ts">
import { setProps } from '@/utils/setProps'
import Pane from './ui/Pane.vue'
import RemixIcon from './RemixIcon.vue'
import Text from './ui/Text.vue'
import Heading from './ui/Heading.vue'
import { TypeCNTexts, Types } from '@/model/Type'
import { defineComponent, ref, watch } from 'vue'
import Button from './ui/Button.vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import { Record } from '@/model/Record'
import { deleteRecord } from '@/db'
import { createToast, destoryAllToasts } from 'vercel-toast'
import 'vercel-toast/dist/vercel-toast.css'

export default defineComponent({
  components: { Pane, RemixIcon, Text, Heading, Button },

  props: {
    record: setProps('object'),
  },

  setup(props) {
    const router = useRouter()
    const store = useStore()

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
      router.push('/add-record')
    }

    // TODO 刷新主页数据
    const handleDelete = () => {
      createToast('确认删除这条记录吗？', {
        type: 'error',
        cancel: '关闭',
        action: {
          text: '删除',
          callback(toast) {
            deleteRecord(props.record as Record).then(() => {
              toast.destory()
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
.home-record-pane {
  padding: var(--gap);
  background-color: var(--ahnn-background);
  border-radius: var(--radius);

  & + .home-record-pane {
    margin-top: var(--gap);
  }

  & .top {
    display: flex;
    justify-content: space-between;
  }
  & .title {
    display: flex;
    align-items: center;

    & svg {
      width: 1.25rem;
      height: 1.25rem;
      margin-right: var(--inline-gap);
    }
  }
  & .cost {
    display: flex;
    align-items: center;
  }

  & .bottom {
    margin-top: var(--gap);

    & .remark {
      // color: var(--ahnn-secondary);

      &.ellpsis {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  & .more-detail {
    margin-top: var(--gap);
    display: flex;
    justify-content: space-between;
  }

  & .action-group {
    margin-top: var(--gap);
    display: flex;
    justify-content: flex-end;
  }
}
</style>
