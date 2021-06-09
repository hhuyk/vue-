// 编译模板，解析指令
import Watcher from './watcher.js'
export default class Compiler {
  constructor(vm) {
    this.el = vm.$el
    this.vm = vm
    this.methods = vm.$methods
    this.compile(vm.$el)
  }

  /** 编译模板 */
  compile (el) {
    let childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      if (this.isTextNode(node)) {
        // 文本节点
        this.compileText(node)
      } else if (this.isElementNode(node)) {
        this.compileElement(node)
      }

      // 如果还有子节点，递归调用
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node)
      }
    })
  }

  compileElement (node) {
    // console.log(node.attributes); //attributes 元素的绑定属性
    if (node.attributes && node.attributes.length) {
      Array.from(node.attributes).forEach(attr => {
        let attrName = attr.name
        if (this.isDirective(attrName)) {
          // 判断是否是指令
          attrName = attrName.indexOf(':') > -1 ? attrName.substr(5) : attrName.substr(2) // 获取 v- 后⾯的值
          let key = attr.value // 获取data 名称
          this.update(node, key, attrName)
        }
      })
    }
  }

  update (node, key, attrName) {
    const updateFn = this[attrName + 'Updater']
    updateFn && updateFn.call(this, node, this.vm[key], key, attrName)
  }

  // 解析v-model
  modelUpdater (node, value, key) {
    node.value = value
    new Watcher(this.vm, key, (newvalue) => {
      node.value = newvalue
    })

    // 双向绑定
    node.addEventListener('input', (val) => {
      this.vm[key] = node.value
    })
  }

  compileText (node) {
    let reg = /\{\{(.+?)\}\}/
    let value = node.textContent
    if (reg.test(value)) {
      let key = RegExp.$1.trim() // 返回匹配到的第⼀个字符串，去掉空格
      node.textContent = value.replace(reg, this.vm[key])
      new Watcher(this.vm, key, (newValue) => { // 创建watcher对象，当数据改
        // 变更新视图
        node.textContent = newValue
      })
    }
  }

  // 判断元素属性是否是指令
  isDirective (attrName) {
    return attrName.startsWith('v-')
  }

  // 判断是否是⽂本节点
  isTextNode (node) {
    return node.nodeType === 3
  }

  // 判断是否是元素节点
  isElementNode (node) {
    return node.nodeType === 1
  }
}