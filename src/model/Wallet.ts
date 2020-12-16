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

export const supportedWallets = [
  { name: '现金', icon: 'wallet' },
  { name: '银行卡', icon: 'bank-card' },
  { name: '信用卡', icon: 'bank-card-2' },
  { name: '支付宝', icon: 'alipay' },
  { name: '微信', icon: 'wechat-2' },
  { name: 'QQ', icon: 'qq' },
  { name: '投资', icon: 'funds' },
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
