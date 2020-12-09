import type { Type } from './Type'

export type CategoryName = string
export type CategoryIcon = string

export interface CategoryItem {
  name: CategoryName
  icon: CategoryIcon
}

export interface Category {
  payout: CategoryItem[]
  income: CategoryItem[]
}

const c = (name: CategoryName, icon: CategoryIcon) => ({ name, icon })
export const presetCategories: Category = {
  payout: [
    c('通用', 'star'),
    c('餐饮', 'cake-3'),
    c('娱乐', 'gamepad'),
    c('购物', 'shopping-bag-3'),
    c('住房', 'home-smile'),
    c('交通', 'subway'),
  ],
  income: [c('工资', 'money-cny-circle'), c('红包', 'red-packet')],
}

export function getDefaultCategory(type: Type): CategoryItem {
  return presetCategories[type][0]
}
