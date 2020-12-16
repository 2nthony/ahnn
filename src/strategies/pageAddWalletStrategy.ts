import { deleteWallet, readWalletByName, setWallet } from '@/db/wallet'
import { Wallet } from '@/model/Wallet'
import { deepToRaw } from '@/utils'
import { createToast } from 'vercel-toast'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import 'vercel-toast/dist/vercel-toast.css'
import { addRecord } from '@/db'
import { getToday } from '@/utils/date'
import { Record } from '@/model/Record'
import { Types } from '@/model/Type'
import { useStore } from '@/store'
import { router } from '@/router'

export function addWalletStrategy() {
  const route = useRoute()
  const router = useRouter()
  const name = route.query.name as Wallet['name']
  const icon = route.query.icon as Wallet['icon']
  const title = `添加${name}钱包`

  const form = ref<Wallet>({
    name,
    icon,
    balance: null,
  })

  const checkIsExisting = () => {
    return readWalletByName(form.value.name)
  }
  const handleSetWallet = () => {
    return setWallet(
      deepToRaw({ ...form.value, balance: Number(form.value.balance || 0) }),
    ).then(() => {
      router.push('/me/wallet')
    })
  }
  const handleSave = async () => {
    if (await checkIsExisting()) {
      createToast(
        `相同名称钱包已存在，是否同意更改为\`${form.value.name}1\`并且保存？`,
        {
          type: 'error',
          action: {
            callback(toast) {
              form.value.name = form.value.name + '1'
              handleSave().then(() => {
                toast.destory()
              })
            },
            text: '同意',
          },
          cancel: '取消',
        },
      )
      return
    }

    return handleSetWallet()
  }

  return {
    title,
    form,
    name,
    handleSave,
    handleSetWallet,

    backDeep: -2,

    rightTabbar: {},
  }
}

export function editWalletStrategy() {
  const store = useStore()

  const strategy = addWalletStrategy()
  const { form, name } = strategy
  const title = `设置${name}钱包`

  let origBalance: Wallet['balance']

  onMounted(() => {
    readWalletByName(name).then((wallet) => {
      if (!wallet) return
      form.value = wallet
      origBalance = wallet.balance
    })
  })

  const getRecordType = (oldVal: number, newVal: number) => {
    if (newVal > oldVal) {
      return Types.income
    }
    return Types.payout
  }

  const handleSave = () => {
    const fns: Promise<any>[] = []

    origBalance = Number(origBalance || 0)
    const newBalance = Number(form.value.balance || 0)

    // 金额变动情况，添加一个金额变动记录
    if (origBalance !== newBalance) {
      const record: Record = {
        type: getRecordType(origBalance, newBalance),
        category: {
          icon: 'exchange-cny',
          name: '余额变动',
        },
        cost: Math.abs(newBalance - origBalance),
        wallet: name,
        date: getToday(),
        remark: '手动调整',
      }
      fns.push(addRecord(record))
    }

    fns.push(strategy.handleSetWallet())

    Promise.all(fns).then(() => {
      // 刷新首页记录
      store.dispatch('readRecordsByQueryDate')
    })
  }

  const handleDelete = () => {
    createToast('移除此钱包不会清除与这个钱包有关的记录，确认移除吗？', {
      type: 'error',
      action: {
        text: '移除',
        callback(toast) {
          deleteWallet(form.value).then(() => {
            toast.destory()
            router.replace('/me/wallet')
          })
        },
      },
      cancel: '取消',
    })
  }

  return {
    title,
    form,
    name,
    handleSave,

    backDeep: -1,

    rightTabbar: {
      rightIcon: 'delete-bin',
      rightText: '移除此钱包',
      rightClick: handleDelete,
    },
  }
}
