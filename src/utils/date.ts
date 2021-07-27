import dayjs, { ConfigType } from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isTomorrow from 'dayjs/plugin/isTomorrow'
import isYesterday from 'dayjs/plugin/isYesterday'

dayjs.extend(isToday)
dayjs.extend(isTomorrow)
dayjs.extend(isYesterday)

export const getCurrentYear = () => dayjs().year()
export const getCurrentMonth = () => dayjs().month() + 1

export const getToday = () => dayjs().format('YYYY-MM-DD')
export const getThisMonth = () => dayjs().format('YYYY-MM')

export function getCNDayText(val: ConfigType) {
  if (dayjs(val).isToday()) {
    return '今天'
  }
  if (dayjs(val).isTomorrow()) {
    return '明天'
  }
  if (dayjs(val).isYesterday()) {
    return '昨天'
  }

  return val
}

/**
 * Constants for months in year
 * ```
 * [1, 2, 3, ..., 12]
 * ```
 */
export const monthsInYear: number[] = Array(12)
  .fill('')
  .map((_, i) => i + 1)
