export function isNull(val) {
  return val === null
}

export function isUndef(val) {
  return typeof val === 'undefined'
}

export function isNullOrUndef(val) {
  return isNull(val) || isUndef(val)
}
export function isEmptyObj(obj) {
  for (let key in obj) return false
  return true
}
