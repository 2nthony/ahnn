export type WalletName = string

export interface Asset {
  name: WalletName
  balance: number // 余额
}

export interface Debt {
  name: WalletName
  creditAmount: number // 信用额度
  debt: number // 欠款
  billingDay: string // 账单日 本月的哪一天
  repaymentDay: string // 还款日
}

export interface Wallet {
  assets: Asset[]
  debts: Debt[]
}

export const presetWallets: Wallet = {
  assets: [
    {
      name: '现金',
      balance: 0,
    },
  ],
  debts: [],
}

export function getDefaultWalletName(): WalletName {
  return presetWallets.assets[0].name
}
