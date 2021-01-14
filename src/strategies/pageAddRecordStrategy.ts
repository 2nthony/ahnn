import { computed } from 'vue'
import { deepToRaw, toRound } from '@app/utils'
import { useStore } from '@app/store'
import { Types } from '@app/model/Type'
import { setRecord } from '@app/db/record'
import { adjustWalletBalance } from '@app/db/wallet'
import { Record } from '@app/model/Record'
import { cache } from '@app/utils/cache'

export function addRecordStrategy() {
  const store = useStore()

  const addRecord = computed(() => store.getters.addRecord)

  const handleSave = async () => {
    // If have `id`, return cost to wallet first
    const origAddRecordVal = cache.ensureCache(
      'origAddRecord',
      addRecord.value,
    ) as Record
    if (origAddRecordVal.id) {
      await returnCost(origAddRecordVal)
    }
    cache.clearCache('origAddRecord')

    // 在此次记账后的钱包金额
    const calcCost = toRound(
      addRecord.value.type === Types.income
        ? 0 + addRecord.value.cost
        : 0 - addRecord.value.cost,
    )

    return Promise.all([
      adjustWalletBalance(addRecord.value.wallet, calcCost),
      setRecord(deepToRaw(addRecord.value)),
    ])
  }

  return {
    addRecord,

    handleSave,
  }
}

function returnCost(form: Record) {
  // 退回原记录的金额
  const calcCost = form.type === Types.income ? 0 - form.cost : form.cost

  // 必须先退还到原钱包，才执行保存
  return adjustWalletBalance(form.wallet, calcCost)
}
