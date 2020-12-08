export type Member = string

export const presetMembers = ['我', '爸爸', '妈妈']

export function getDefaultMember(): Member {
  return presetMembers[0]
}
