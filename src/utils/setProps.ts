type obj = { [k: string]: any }
type t = 'array' | 'object' | 'function' | 'string' | 'boolean' | 'number'

export default (
  t: t | Array<t>,
  defaultValue: any = null,
  opts: obj = {},
): obj => {
  let types: Array<t | string> = Array.isArray(t) ? t : [t]

  types = types.map((type) => firstUpperCase(type))

  return {
    // @ts-ignore
    type: types.map((T) => window[T]),
    default: defaultValue || getDefaultValue(firstUpperCase(types[0])),
    ...opts,
  }
}

function firstUpperCase([f, ...rest]: string): string {
  return f.toUpperCase() + rest.join('')
}

function getDefaultValue(t: string): any {
  const basic_type_map: obj = {
    Array: () => [],
    Object: () => ({}),
    Function: () => {},
    String: '',
    Boolean: false,
    Number: 0,
  }

  return basic_type_map[t]
}
