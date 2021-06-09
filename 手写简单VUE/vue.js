// 构造函数，接收配置等，内部变量都用$
import Observer from './observer.js'
import Compiler from './compiler.js'

export default class Vue {
  constructor(options = {}){
    this.$options = options
    this.$data = options.data
    this.$methods = options.methods

    this.initRootElement(options)

    // 利于Object.defineProperty 将 data 里面的属性注入到vue实例中
    this._proxtData(this.$data)

    // 实例化observer 对象 监听数据变化
    new Observer(this.$data)

    // 实例化Compiler对象，解析指令以及插值表达式
    new Compiler(this)
  }

  // 用来获取根元素，并存储到VUE实例，并检查el是否合规
  initRootElement(options){
    if(typeof options.el === 'string'){
       this.$el = document.querySelector(options.el)
    } else if( options.el instanceof HTMLElement) {
      this.$el = options.el
    }

    if(!this.$el){
      throw new Error('el不合法！')
    }
  }

  _proxtData(data){
    Object.keys(data).forEach(key =>{
      // 将 data 属性注入到vue 中
      Object.defineProperty(this,key, {
        enumerable:true,
        configurable:true,
        get(){
          return data[key]
        },
        set(newval){
          if(data[key] == newval){
            return
          }
          data[key] = newval
        }
      })
    })
  }
}