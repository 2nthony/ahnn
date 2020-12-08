export type BookName = string
export type BookBudget = number

export interface Book {
  name: BookName
  budget?: BookBudget
}

export const presetBooks: Book[] = [
  {
    name: '日常账本',
    budget: 3000,
  },
]

export function getDefaultBookName(): BookName {
  return presetBooks[0].name
}
