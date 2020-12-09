export enum Types {
  payout = 'payout',
  income = 'income',
}

export const TypeCNTexts = {
  [Types.payout]: '支出',
  [Types.income]: '收入',
}

export type Type = Types.income | Types.payout

export const defaultType: Type = Types.payout
