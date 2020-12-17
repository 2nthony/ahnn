export const isBrowser = typeof window !== 'undefined'

export const deepToRaw = (val: any) => JSON.parse(JSON.stringify(val))

export const isFalsy = (val: any) => {
  return [null, undefined, NaN].indexOf(val) !== -1
}
export const isTruthy = (val: any) => !isFalsy(val)

export const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)')
  .matches

export function toRound(decimal: number, len: number = 2) {
  const length = Math.pow(10, len)
  return Math.round(decimal * length) / length
}

export function toFixed(decimal: number, len: number = 2) {
  return Number(toRound(decimal, len)).toFixed(len)
}
