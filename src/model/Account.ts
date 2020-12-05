export type AccountName = string

export interface Asset {
  name: AccountName
  balance: number // 余额
}

export interface Debt {
  name: AccountName
  creditAmount: number // 信用额度
  debt: number // 欠款
  billingDay: string // 账单日 本月的哪一天
  repaymentDay: string // 还款日
}

export interface Account {
  assets: Asset[]
  debts: Debt[]
}

export const presetAccounts: Account = {
  assets: [
    {
      name: '现金',
      balance: 0
    }
  ],
  debts: []
}

export function getDefaultAccountName(): AccountName {
  return presetAccounts.assets[0].name
}
