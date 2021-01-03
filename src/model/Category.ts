import { createObjectMapping } from '@app/utils'
import type { Type } from './Type'

export type CategoryName = string
export type CategoryIcon = string

export interface CategoryItem {
  name: CategoryName
  icon: CategoryIcon
}

export interface AllCategories {
  payout: CategoryItem[]
  income: CategoryItem[]
  others: CategoryItem[]
}

export type PresetCategories = {
  [k in keyof AllCategories]: CategoryName[]
}

const c = (name: CategoryName, icon: CategoryIcon) => ({ name, icon })
const allCategories: AllCategories = {
  payout: [
    c('通用', 'star'),
    c('餐饮', 'cake-3'),
    c('娱乐', 'gamepad'),
    c('购物', 'shopping-bag-3'),
    c('服饰美容', 't-shirt'),
    c('住房', 'home-smile'),
    c('生活服务', 'water-flash'),
    c('交通', 'subway'),
    c('学习', 'book-open'),
    c('运动', 'basketball'),
    c('话费', 'smartphone'),
    c('红包', 'red-packet'),
    c('转账', 'exchange'),
    c('礼物', 'gift'),
    c('酒店', 'hotel'),
    c('亲子', 'emotion'),
    c('宠物', 'bear-smile'),
    c('旅游', 'road-map'),
    c('医药', 'capsule'),
    c('健康', 'heart-3'),
    c('爱心捐助', 'service'),
    c('投资', 'funds'),
  ],
  income: [
    c('工资', 'money-cny-circle'),
    c('红包', 'red-packet'),
    c('转账', 'exchange'),
    c('奖金', 'coin'),
    c('生意', 'store-2'),
    c('退款', 'arrow-go-back'),
    c('投资', 'funds'),
  ],
  others: [c('余额变动', 'exchange-cny')],
}

export const presetCategories: PresetCategories = Object.keys(
  allCategories,
).reduce((res, k) => {
  // @ts-ignore
  res[k] = allCategories[k].map((category) => category.name) as CategoryName[]
  return res
}, {}) as PresetCategories

export function getDefaultCategory(type: Type): CategoryName {
  return presetCategories[type][0]
}

export const categoryNameIconMapping = createObjectMapping(
  [...allCategories.payout, ...allCategories.income, ...allCategories.others],
  'name',
  'icon',
)
