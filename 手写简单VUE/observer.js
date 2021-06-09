// 数据劫持

import Dep from './dep.js'
export default class Observer {
  constructor(data) {
    this.traverse(data)
  }

  /** 递归遍历 data 里的所有属性 */
  traverse (data) {
    if (!data || typeof data !== 'object') {
      return
    }
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }

  /**给传入的数据设置getter/setter */
  defineReactive (obj, key, val) {
    const that = this
    this.traverse(val) // 递归设置 

    const dep = new Dep() //收集依赖并发送通知
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      get () {
        Dep.target && dep.addSub(Dep.target) // 收集依赖
        return val;
      },
      set (newValue) {
        if (newValue === val) {
          return
        }
        val = newValue
        that.traverse(newValue) // newValue可能是个对象
        dep.notify() // 通知watcher数据更新了
      }
    })
  }
}