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

/**
 * Number().toFixed() alternative, but with `Math.round()`
 * ```
 * toFixed(1.23456) // 1.23
 * toFixed(1.23456, 3) // 1.234
 * toFixed(1.256) // 1.26 with round
 * ```
 */
export function toFixed(decimal: number, len: number = 2) {
  return Number(toRound(decimal, len)).toFixed(len)
}

/**
 * Only the number will be parsed, result without `%`
 * ```
 * toPercentage(0.1234) // 12.34
 * ```
 */
export function toPercentage(decimal: number) {
  return toFixed(toRound(decimal, 4) * 100)
}

export function createObjectMapping(
  arr: any[],
  labelKey: string,
  valueKey: string,
) {
  return arr.reduce((res, item) => {
    res[item[labelKey]] = item[valueKey]
    return res
  }, {})
}

export function calcByKey(arr: any[], key: string) {
  return arr.reduce((res, item) => {
    res += item[key]
    return res
  }, 0)
}
