import { StoreIndexing } from '@/db'

export type WalletName = string

export interface Wallet {
  id?: number
  name: WalletName
  icon: string
  balance: number | null // 余额
}

export const walletIndexing: StoreIndexing = [
  {
    name: 'name',
  },
]

const c = (name: Wallet['name'], icon: Wallet['icon']) => ({ name, icon })
export const supportedWallets = [
  c('现金', 'wallet'),
  c('银行卡', 'bank-card'),
  c('信用卡', 'bank-card-2'),
  c('支付宝', 'alipay'),
  c('微信', 'wechat-2'),
  c('QQ', 'qq'),
  c('投资', 'funds'),
]

export const presetWallets: Wallet[] = [
  {
    name: '现金',
    icon: 'wallet',
    balance: 0,
  },
]

export const pinnedWallets = ['现金']

export function getDefaultWalletName(): WalletName {
  return presetWallets[0].name
}
