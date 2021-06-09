let tags = 'div,p,a,img,ul,li'.split(',')

// 字符串查找

function makeMap(keys) {
     let set = {} // 集合
     tags.forEach(key => set[key] = true)

     return function(tagName){
         return !!set[tagName.toLowerCase()]
     }
}

let isHTMLTag = makeMap(tags)
isHTMLTag('div')
