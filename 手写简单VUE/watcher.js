// 观察者对象
// 获取更改前的值存储起来，并创建一个update 实例方法，在值被更改时去执行实例的 callback 以达到视图的更新

import Dep from './dep.js'

export default class Watcher {
  /**
   * vm:vue实例
   * key:data 属性名
   * cb:负责更新视图的回调函数
   */
  constructor(vm,key,cb){
    this.vm = vm
    this.key = key
    this.cb = cb

    //把 watcher对象记录到Dep类的静态属性target
    Dep.target = this
    // 触发get方法，在get方法中会调用addSub
    this.oldValue = vm[key]

    Dep.target = null
  }

  /** 当数据发生改变时更新视图 */
  update(){
    let newValue = this.vm[this.key]
    if(this.oldValue === newValue){
      return
    }
    this.cb(newValue)
  }
}