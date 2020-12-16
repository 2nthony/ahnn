import { computed, ref } from 'vue'
import { getToday, getCNDayText } from '../utils/date'
import { deepToRaw } from '../utils'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import { Type, TypeCNTexts, Types } from '@/model/Type'
import { setRecord } from '../db'
import { readWalletByName, returnCostToWallet, setWallet } from '@/db/wallet'
import { cache } from '@/utils/cache'
import { Record } from '@/model/Record'

export function addRecordStrategy() {
  const store = useStore()
  const router = useRouter()

  const addRecord = computed(() => store.getters.addRecord)
  const money = ref<number>(addRecord.value.cost || 0)
  const previewDate = computed(() => getCNDayText(addRecord.value.date))
  const calculatorVisible = ref<boolean>(true)

  store.dispatch('initAddRecord')

  const handleSave = () => {
    return readWalletByName(addRecord.value.wallet).then((wallet) => {
      // 在此次记账后的钱包金额
      const newBalance =
        (wallet.balance as number) +
        (addRecord.value.type === Types.income
          ? 0 + addRecord.value.cost
          : 0 - addRecord.value.cost)

      const newWalletValue = { ...wallet, balance: newBalance }
      Promise.all([
        setWallet(newWalletValue),
        setRecord(deepToRaw(addRecord.value)),
      ]).then(() => {
        router.go(-1) // back to /
        store.dispatch('initAddRecord')
        store.dispatch('readRecordsByQueryDate')
      })
    })
  }

  const handleSwitchType = (type: Type) => {
    store.commit('switchAddRecordType', type)
  }

  const handleCalculatorVisible = (bool: boolean) => {
    calculatorVisible.value = bool || !calculatorVisible.value
  }

  const onDateSelect = (val: string) => {
    store.commit('setAddRecord', {
      date: val || getToday(),
    })
  }
  const onRemarkInput = (val: string) => {
    store.commit('setAddRecord', {
      remark: val,
    })
  }
  const onCalcResult = (val: number) => {
    money.value = val
    store.commit('setAddRecord', {
      cost: val,
    })
  }

  const onBack = () => store.dispatch('initAddRecord')

  return {
    money,
    addRecord,
    previewDate,
    calculatorVisible,

    handleSave,
    handleSwitchType,
    handleCalculatorVisible,
    onDateSelect,
    onRemarkInput,
    onCalcResult,
    onBack,

    TypeCNTexts,
    Types,
  }
}

export function editRecordStrategy() {
  const strategy = addRecordStrategy()
  const { addRecord } = strategy
  const cacheName = 'origRecord'
  const origRecord = cache.ensureCache(
    cacheName,
    deepToRaw(addRecord.value),
  ) as Record

  // 钱包**无**变化
  // 如果金额有变动，则将差价增加或减少对应钱包余额
  // 钱包**有**变化
  // 将金额退还到原钱包，并从新钱包扣除
  const handleSave = () => {
    // 退回原记录的金额
    const returnCost =
      origRecord.type === Types.income ? 0 - origRecord.cost : origRecord.cost

    // 必须先退还到原钱包，才执行保存
    returnCostToWallet(origRecord.wallet, returnCost).then(() => {
      strategy.handleSave().then(() => {
        cache.clearCache(cacheName)
      })
    })
  }

  const onBack = () => {
    strategy.onBack()
    // clear cache
    cache.clearCache(cacheName)
  }

  return {
    ...strategy,
    handleSave,
    onBack,
  }
}
