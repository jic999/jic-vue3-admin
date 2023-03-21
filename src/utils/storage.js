import { isNullOrUndef } from './is'

const PREFIX_KEY = 'Vue3_Naive_Admin_'

class Storage {
  constructor(option) {
    this.storage = option.storage
    this.PREFIX_KEY = option.PREFIX_KEY
  }

  getKey(key) {
    return `${this.PREFIX_KEY}${key}`.toUpperCase()
  }

  set(key, value, expire) {
    const stringData = JSON.stringify({
      value,
      time: Date.now(),
      expire: !isNullOrUndef(expire)
        ? new Date().getTime() + expire * 1000
        : null,
    })
    this.storage.setItem(this.getKey(key), stringData)
  }

  get(key) {
    const { value } = this.getItem(key, {})
    return value
  }

  getItem(key, def = null) {
    const val = this.storage.getItem(this.getKey(key))
    if (!val) return def
    try {
      const data = JSON.parse(val)
      const { value, time, expire } = data
      if (isNullOrUndef(expire) || expire > new Date().getTime()) {
        return { value, time }
      }
      this.remove(key)
      return def
    } catch (error) {
      this.remove(key)
      return def
    }
  }

  remove(key) {
    this.storage.removeItem(this.getKey(key))
  }

  clear() {
    this.storage.clear()
  }
}

function createStorage({ PREFIX_KEY = '', storage = sessionStorage }) {
  return new Storage({ PREFIX_KEY, storage })
}

export const createLocalStorage = function (option = {}) {
  return createStorage({
    PREFIX_KEY: option.PREFIX_KEY || '',
    storage: localStorage,
  })
}

export const createSessionStorage = function (option = {}) {
  return createStorage({
    PREFIX_KEY: option.PREFIX_KEY || '',
    storage: sessionStorage,
  })
}

export const lStorage = createLocalStorage({ PREFIX_KEY })

export const sStorage = createSessionStorage({ PREFIX_KEY })
