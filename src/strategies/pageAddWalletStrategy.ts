import { deleteWallet, readWalletByName, setWallet } from '@app/db/wallet'
import { Wallet } from '@app/model/Wallet'
import { deepToRaw, toFixed, toRound } from '@app/utils'
import { createToast } from 'vercel-toast'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import 'vercel-toast/dist/vercel-toast.css'
import {
  deleteAllRecordByWallet,
  readRecordByWallet,
  setRecord,
} from '@app/db/record'
import { getToday } from '@app/utils/date'
import { Record } from '@app/model/Record'
import { TypeCNTexts, Types } from '@app/model/Type'
import { useStore } from '@app/store'
import { router } from '@app/router'

export function addWalletStrategy() {
  const route = useRoute()
  const router = useRouter()
  const name = route.query.name as Wallet['name']
  const icon = route.query.icon as Wallet['icon']
  const title = `添加${name}钱包`
  const backDeep = -2 // back to /me/wallet

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
      router.go(backDeep)
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

    backDeep,

    rightTabbar: {},
  }
}

export function editWalletStrategy() {
  const store = useStore()

  const strategy = addWalletStrategy()
  const { form, name } = strategy
  const title = `设置${name}钱包`

  let origWallet: Wallet

  onMounted(() => {
    readWalletByName(name).then((wallet) => {
      if (!wallet) return
      form.value = wallet
      origWallet = deepToRaw(wallet)
    })
  })

  const handleSave = () => {
    const fns: Promise<any>[] = []

    const origBalance = Number(origWallet.balance || 0)
    const newBalance = Number(form.value.balance || 0)

    // 金额变动情况，添加一个金额变动记录
    if (origBalance !== newBalance) {
      const record: Record = {
        type: Types.adjustManual,
        category: TypeCNTexts[Types.adjustManual],
        cost: toRound(Math.abs(newBalance - origBalance)),
        wallet: name,
        date: getToday(),
        remark: `调整后余额：${toFixed(newBalance)}`,
      }
      fns.push(setRecord(record))
    }

    // 如果钱包名有变更，更新全部记录
    if (origWallet.name !== form.value.name) {
      fns.push(
        readRecordByWallet(origWallet.name).then((records) => {
          return Promise.all(
            records.map((record) => {
              return setRecord({ ...record, wallet: form.value.name })
            }),
          )
        }),
      )
    }

    // 保存
    fns.push(strategy.handleSetWallet())

    Promise.all(fns).then(() => {
      // 刷新首页记录
      store.dispatch('readRecordsByQueryDate')
    })
  }

  const handleDelete = () => {
    createToast('确认移除此钱包吗？同时也会抹除与这个钱包有关的所有记录。', {
      type: 'error',
      action: {
        text: '移除',
        callback(toast) {
          Promise.all([
            deleteAllRecordByWallet(form.value.name),
            deleteWallet(form.value),
          ]).then(() => {
            toast.destory()
            router.go(-2) // back to /me/wallet
            store.dispatch('readRecordsByQueryDate')
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

    backDeep: -1, // back to /me/wallet-detail

    rightTabbar: {
      rightIcon: 'delete-bin',
      rightText: '移除此钱包',
      rightClick: handleDelete,
    },
  }
}
