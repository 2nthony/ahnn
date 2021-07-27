// User Preference

export enum Appreances {
  auto = 'auto',
  light = 'light',
  dark = 'dark',
}
export type Appreance = Appreances.auto | Appreances.light | Appreances.dark
export const AppreanceCNText = {
  [Appreances.auto]: '自动跟随系统',
  [Appreances.light]: '浅色',
  [Appreances.dark]: '深色',
}

export interface Preference {
  appreance: Appreance
}

export function getInitPreference(): Preference {
  return {
    appreance: Appreances.auto,
  }
}
