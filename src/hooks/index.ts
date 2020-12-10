type Hook = (...args: any[]) => any
type HookName = string

interface Hooks {
  hooks: { [k: string]: Hook[] }
  add: (name: HookName, fn: Hook) => Hooks
  invoke: (name: HookName, ...args: any[]) => Hooks
  process: (name: HookName, arg: any, ...args: any[]) => Hooks
  cleanHooks: (name: HookName) => void
}

export const hooks: Hooks = {
  hooks: {},
  add(name, fn) {
    this.hooks[name] = this.hooks[name] || []
    this.hooks[name].push(fn)
    return this
  },
  invoke(name, ...args) {
    for (const fn of this.hooks[name] || []) {
      fn(...args)
    }
    this.cleanHooks(name)
    return this
  },
  process(name, arg, ...args) {
    for (const fn of this.hooks[name] || []) {
      arg = fn(arg, ...args) || arg
    }
    this.cleanHooks(name)
    return arg
  },
  cleanHooks(name) {
    if (this.hooks[name]) this.hooks[name].length = 0
  },
}

export * from './collect'
