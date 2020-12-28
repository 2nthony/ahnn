type Hook = (...args: any[]) => any

type HookStore = { [k: string]: Hook[] }
type HookName = keyof HookStore
interface Hooks {
  store: HookStore
  add: (name: HookName, fn: Hook) => Hooks
  emit: (name: HookName, ...args: any[]) => Hooks
  invoke: (name: HookName, ...args: any[]) => Hooks
  process: (name: HookName, arg: any, ...args: any[]) => Hooks
  clearHooks: (name: HookName) => void
}

export const hooks: Hooks = {
  store: {},
  add(name, fn) {
    this.store[name] = this.store[name] || []
    this.store[name].push(fn)
    return this
  },
  emit(name, ...args) {
    for (const fn of this.store[name] || []) {
      fn(...args)
    }
    return this
  },
  invoke(name, ...args) {
    this.emit(name, ...args)
    this.clearHooks(name)
    return this
  },
  process(name, arg, ...args) {
    for (const fn of this.store[name] || []) {
      arg = fn(arg, ...args) || arg
    }
    this.clearHooks(name)
    return arg
  },
  clearHooks(name) {
    if (this.store[name]) this.store[name].length = 0
  },
}
