export const isBrowser = typeof window !== 'undefined'

export const deepToRaw = (val: any) => JSON.parse(JSON.stringify(val))

export const isFalsy = (val: any) => {
  return [null, undefined, NaN].indexOf(val) !== -1
}
export const isTruthy = (val: any) => !isFalsy(val)
