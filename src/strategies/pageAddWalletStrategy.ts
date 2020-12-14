import { readWalletByName, setWallet } from '@/db/wallet'
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

export function addWalletStrategy() {
  const route = useRoute()
  const router = useRouter()
  const name = route.query.name as Wallet['name']
  const icon = route.query.icon as Wallet['icon']
  const title = `添加${name}到钱包`

  const form = ref<Wallet>({
    name,
    icon,
    balance: null,
  })

  const checkIsExisting = async () => {
    return readWalletByName(form.value.name)
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
              toast.destory()
              handleSave()
            },
            text: '同意',
          },
          cancel: '取消',
        },
      )
      return
    }

    setWallet(
      deepToRaw({ ...form.value, balance: Number(form.value.balance || 0) }),
    ).then(() => {
      router.push('/me/wallet')
    })
  }

  return {
    title,
    form,
    name,
    handleSave,
  }
}

export function editWalletStrategy() {
  const store = useStore()

  const { form, name } = addWalletStrategy()
  const title = `修改${name}钱包`

  let origBalance: Wallet['balance']

  onMounted(() => {
    readWalletByName(name).then((wallet) => {
      if (!wallet) return
      form.value = wallet
      origBalance = wallet.balance
    })
  })

  const getRecordType = (oldVal: number, newVal: number) => {
    if (newVal - oldVal > oldVal) {
      return Types.income
    }
    return Types.payout
  }

  //
  const handleSave = () => {
    origBalance = Number(origBalance || 0)
    const newBalance = Number(form.value.balance || 0)

    const newWalletValue: Wallet = deepToRaw({
      ...form.value,
      balance: newBalance,
    })

    // 金额变动情况
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

      Promise.all([addRecord(record), setWallet(newWalletValue)]).then(() => {
        // 刷新首页记录
        store.dispatch('readRecordsByQueryDate')
      })
    }

    // TODO 更新所有同名 record
    /* setWallet(
      deepToRaw({ ...form.value, balance: Number(form.value.balance || 0) }),
    ).then(() => {
      router.push('/me/wallet')
    }) */
  }

  return {
    title,
    form,
    name,
    handleSave,
  }
}
