export enum Types {
  payout = 'payout',
  income = 'income',
  adjustManual = 'adjustManual',
}

export const TypeCNTexts = {
  [Types.payout]: '支出',
  [Types.income]: '收入',
  [Types.adjustManual]: '余额变动',
}

export type Type = Types.income | Types.payout | Types.adjustManual

export const defaultType: Type = Types.payout
