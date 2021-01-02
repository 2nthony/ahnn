import { computed, ref } from 'vue'
import { getToday, getCNDayText } from '@app/utils/date'
import { deepToRaw, toRound } from '@app/utils'
import { useStore } from '@app/store'
import { Type, TypeCNTexts, Types } from '@app/model/Type'
import { setRecord } from '@app/db/record'
import { readWalletByName, returnCostToWallet, setWallet } from '@app/db/wallet'
import { cache } from '@app/utils/cache'
import { Record } from '@app/model/Record'
import { Wallet } from '@app/model/Wallet'

export function addRecordStrategy() {
  const store = useStore()

  const addRecord = computed(() => store.getters.addRecord)
  const money = ref<number>(addRecord.value.cost || 0)
  const previewDate = computed(() => getCNDayText(addRecord.value.date))
  const calculatorVisible = ref<boolean>(true)

  const handleSave = () => {
    return readWalletByName(addRecord.value.wallet).then((wallet) => {
      // 在此次记账后的钱包金额
      const newBalance = toRound(
        (wallet.balance as number) +
          (addRecord.value.type === Types.income
            ? 0 + addRecord.value.cost
            : 0 - addRecord.value.cost),
      )

      const newWalletValue = { ...wallet, balance: newBalance }
      return Promise.all([
        setWallet(newWalletValue),
        setRecord(deepToRaw(addRecord.value)),
      ])
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
  const onWalletSelect = (wallet: Wallet['name']) => {
    store.commit('setAddRecord', { wallet })
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
    onWalletSelect,
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
