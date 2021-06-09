// 收集依赖关系，存储观察者，发布订阅
export default class Dep {
  constructor(){
    // 存储所有观察者
    this.subs = []
  }

  /** 添加观察者 */
  addSub(watcher){
    if(watcher && watcher.update){
      this.subs.push(watcher)
    }
  }

  /** 发送通知 */
  notify(){
    this.subs.forEach(watcher =>{
      watcher.update()
    })
  }
}