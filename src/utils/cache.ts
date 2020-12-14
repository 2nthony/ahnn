interface Cache {
  caches: { [k: string]: any }
  getCache(name: string): any
  setCache(name: string, val: any): Cache
  clearCache(name?: string): Cache
  // 获取最初设置的缓存值，直到手动清除之前
  ensureCache(name: string, callbackValue: any): any
}

export const cache: Cache = {
  caches: {},
  getCache(name) {
    return this.caches[name]
  },
  setCache(name, val) {
    this.caches[name] = val
    return this
  },
  clearCache(name) {
    if (name) {
      delete this.caches[name]
    } else {
      this.caches = {}
    }
    return this
  },
  ensureCache(name, callbackValue) {
    this.caches[name] = this.caches[name] || callbackValue
    return this.getCache(name)
  },
}
