import { Record } from "../model/Record"

export const HomeRecords: Record[] = [
  {
    book: '日常账本',
    type: 'payout',
    category: {
      name: '餐饮',
      icon: 'common'
    },
    cost: 20,
    date: '2020-11-25',
    account: '现金',
    member: '我',
    remark: '加菜'
  },
  {
    book: '日常账本',
    type: 'payout',
    category: {
      name: '餐饮',
      icon: 'common'
    },
    cost: 10,
    date: '2020-11-25',
    account: '现金',
    member: '我',
    remark: '今天吃的不错'
  },
  {
    book: '日常账本',
    type: 'payout',
    category: {
      name: '餐饮',
      icon: 'common'
    },
    cost: 6,
    date: '2020-11-24',
    account: '现金',
    member: '我',
    remark: '麦满分'
  },
]
