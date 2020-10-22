const dashEvent = {}
const cache = Object.create(null)
const cacheLowerCaseEvent = Object.create(null)

/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  return (function cachedFn (str) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Hyphenate a camelCase string.
 */
const hyphenateRE = /\B([A-Z])/g
const hyphenate = cached((str) => {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
})

dashEvent.install = function (Vue) {
  const _emit = Vue.prototype.$emit
  Vue.prototype.$emit = function () {
    const arg = Array.prototype.slice.call(arguments)
    const fnName = arg[0]
    const params = arg.splice(1)
    if(
      !cacheLowerCaseEvent[fnName] && 
      (cache[fnName] || hyphenateRE.test(fnName))
    ) {
      _emit.call(this, hyphenate(fnName), ...params)
    } else {
      cacheLowerCaseEvent[fnName] = fnName
    }
    _emit.call(this, fnName, ...params)
  }
}

export default dashEvent
