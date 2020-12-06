export const isBrowser = typeof window !== 'undefined'

export const deepToRaw = (val: any) => JSON.parse(JSON.stringify(val))
