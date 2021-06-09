Vue.js 允许你自定义过滤器，可被用于一些常见的文本格式化。过滤器可以用在两个地方：双花括号插值和 v-bind 表达式 (后者从 2.1.0+ 开始支持)。过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示

{{ message | capitalize }}

上面的过滤器经过一顿操作之后就会变成：_s(_f("capitalize")(message))。

_f：该函数其实就是resolveFilter的别名，作用是从_this.$options.filter找到过滤器并返回
_s：该函数就是toString函数的别名，作用是拿到过滤之后的结果并传递给toString()函数，结果会保存到VNode中的text属性，返回结果直接渲染视图

_f函数的原理
_f函数其实就是寻找过滤器的，如果找到过滤器就返回过滤器，找不到就返回与参数相同的值。它的代码其实很简单：


```js
export function resolveAsset (options, type, id, warnMissing){
  if(typeof(id) !== 'string'){
    return
  }

  const assets = options[type]
  if(hasOwn(assets, id)) return assets[id]
  const camelizedId = camelize(id)
  if(hasOwn(assets, camelizedId)) return assets[camelizedId]
  const PascalCaseId = capitlize(camelizedId)
  if(hasOwn(assets, PascalCaseId)) return assets[PascalCaseId]

  //检查原型链
  const res assets[id] || assets[camelizedId] || PascalCaseId
  if(process.env.NODE_ENV!=='production'&& warnMissing&&!res){
    warn('Fail to resolve' + type.slice(0,-1)+':'+id, options)
  }
  return res
}
```