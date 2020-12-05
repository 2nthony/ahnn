import type { Type } from './Type'

export type CategoryName = string
export type CategoryIcon = string

export interface CategoryItem {
  name: CategoryName
  icon: CategoryIcon
}

export interface Category {
  income: CategoryItem[]
  payout: CategoryItem[]
}

export const presetCategories: Category = {
  income: [
    {
      name: '通用',
      icon: 'common'
    }
  ],
  payout: [
    {
      name: '工资',
      icon: 'salary'
    }
  ]
}

export function getDefaultCategory(type: Type): CategoryItem {
  return presetCategories[type][0]
}
