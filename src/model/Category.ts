import { createObjectMapping } from '@/utils'
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
    c('交通', 'subway'),
    c('住房', 'home-smile'),
    c('话费', 'smartphone'),
    c('礼物', 'gift'),
    c('旅游', 'road-map'),
    c('医药', 'capsule'),
    c('健康', 'heart-3'),
    c('投资', 'funds'),
  ],
  income: [
    c('工资', 'money-cny-circle'),
    c('红包', 'red-packet'),
    c('奖金', 'coin'),
    c('投资', 'funds'),
  ],
}

export function getDefaultCategory(type: Type): CategoryItem {
  return presetCategories[type][0]
}

export const categoryNameIconMapping = createObjectMapping(
  [...presetCategories.payout, ...presetCategories.income],
  'name',
  'icon',
)
