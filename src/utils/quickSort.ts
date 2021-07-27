type OrderBy = 'asc' | 'desc'

type QuickSortItem = number
export function quickSort(
  list: QuickSortItem[],
  orderBy: OrderBy = 'asc',
): QuickSortItem[] {
  if (!list.length) return []

  const left: QuickSortItem[] = []
  const right: QuickSortItem[] = []

  const pivot = list[0]
  // 从第二个元素开始
  for (let i = 1; i < list.length; i++) {
    if (list[i] < pivot) left.push(list[i])
    else right.push(list[i])
  }

  if (orderBy === 'desc') {
    return [...quickSort(right, orderBy), pivot, ...quickSort(left, orderBy)]
  }

  return [...quickSort(left, orderBy), pivot, ...quickSort(right, orderBy)]
}

export function quickSortBy<T>(
  list: T[],
  key: keyof T,
  orderBy: OrderBy = 'asc',
): T[] {
  if (!list.length) return []

  const left: T[] = []
  const right: T[] = []

  const pivot = list[0]
  // 从第二个元素开始
  for (let i = 1; i < list.length; i++) {
    if (list[i][key] < pivot[key]) left.push(list[i])
    else right.push(list[i])
  }

  if (orderBy === 'desc') {
    return [
      ...quickSortBy(right, key, orderBy),
      pivot,
      ...quickSortBy(left, key, orderBy),
    ]
  }

  return [
    ...quickSortBy(left, key, orderBy),
    pivot,
    ...quickSortBy(right, key, orderBy),
  ]
}
