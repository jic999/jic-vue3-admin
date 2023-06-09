export function isNull(val) {
  return val === null
}

export function is(val, type) {
  return toString.call(val) === `[object ${type}]`
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
export function isObject(val) {
  return !isNull(val) && is(val, 'Object')
}
export function isArray(val) {
  return val && Array.isArray(val)
}
export function isString(val) {
  return is(val, 'String')
}
