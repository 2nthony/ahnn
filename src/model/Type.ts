export enum Types {
  payout = 'payout',
  income = 'income',
}

export type Type = Types.income | Types.payout

export const defaultType: Type = Types.payout
