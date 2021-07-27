type EmitterFn = (...args: any[]) => any

type EmitterStore = { [k: string]: EmitterFn[] }
type EmitterName = keyof EmitterStore
interface Emitter {
  store: EmitterStore
  on: (name: EmitterName, fn: EmitterFn) => Emitter
  emit: (name: EmitterName, ...args: any[]) => Emitter
  invoke: (name: EmitterName, ...args: any[]) => Emitter
  process: (name: EmitterName, arg: any, ...args: any[]) => Emitter
  clearStore: (name: EmitterName) => void
}

export const useEmitter = (): Emitter => ({
  store: {},
  on(name, fn) {
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
    this.clearStore(name)
    return this
  },
  process(name, arg, ...args) {
    for (const fn of this.store[name] || []) {
      arg = fn(arg, ...args) || arg
    }
    this.clearStore(name)
    return arg
  },
  clearStore(name) {
    if (this.store[name]) this.store[name].length = 0
  },
})
