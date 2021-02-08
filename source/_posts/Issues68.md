- [HTML](#html)
  - [图片标签中的 alt 有什么作用？](#图片标签中的-alt-有什么作用)
  - [简述 `<script>` 标签中的 defer 和 async 属性](#简述-script-标签中的-defer-和-async-属性)
  - [什么是 DOM？](#什么是-dom)
  - [XHTML 和 HTML 有什么不同?](#xhtml-和-html-有什么不同)
  - [rel="noopener"  应在什么场景下使用，为什么？](#relnoopener--应在什么场景下使用为什么)
  - [什么是 HTML5 存储？解释一下 `localStorage` 和 `sessionStorage`](#什么是-html5-存储解释一下-localstorage-和-sessionstorage)
  - [MIME type](#mime-type)
  - [新标签兼容低版本](#新标签兼容低版本)
- [CSS](#css)
  - [CSS盒模型](#css盒模型)
- [Javascript](#javascript)
  - [JS中数据类型](#js中数据类型)
  - [深浅拷贝](#深浅拷贝)
    - [= 赋值](#-赋值)
    - [JSON.parse(JSON.stringify(x))](#jsonparsejsonstringifyx)
    - [Object.assign()](#objectassign)
    - [展开运算符(...)](#展开运算符)
    - [Slice](#slice)
    - [Concat](#concat)
    - [浅拷贝的实现](#浅拷贝的实现)
    - [深拷贝的实现](#深拷贝的实现)
    - [Lodash](#lodash)
  - [数组去重](#数组去重)
    - [new Set](#new-set)
    - [一维数组](#一维数组)
    - [多维数组](#多维数组)
    - [Lodash](#lodash-1)

1. [2018前端面试总结](https://juejin.cn/post/6844903673009553416#heading-59)

## HTML

### 图片标签中的 alt 有什么作用？

1. 当图片无法加载的时候， alt 的属性值会以文字的形式替代图片显示。alt 属性是用来描述图片内容的，当图片作为背景等装饰时，alt 属性应该为空。
2. 装饰作用的图片 alt 属性应该为空
3. 网站爬虫根据其属性值来理解图片的内容，因此 alt 属性对 SEO（搜索引擎优化） 来说非常重要
4. alt 值应以句号结尾，以提高可访问性
5. 网速过慢导致图片加载需较长一段时间时，在图片加载完成之前，会显示 alt 属性值来替代图片。

### 简述 `<script>` 标签中的 defer 和 async 属性

1. 如果两个属性都没有（默认行为），脚本的下载和执行将会按照文档的先后顺序同步进行。当脚本下载和执行的时候，文档解析就会被阻塞，在脚本下载和执行完成之后文档才能往下继续进行解析。

2. `defer` 属性表示脚本按顺序被解析到时就开始下载，下载过程中文档继续进行解析，当文档全部解析完成之后便开始执行下载好的脚本，这相当于在 `DOMContentLoaded` 的监听事件内进行执行。虽然 `defer` 属性的脚本需要等到文档解析完才开始执行，但其执行是有顺序的。

3. `async` 属性表示脚本按顺序被解析到时就开始下载，下载过程中文档继续进行解析，当下载完成后文档停止解析开始执行下载好的脚本，脚本执行完后继续解析文档。`async` 脚本由于网络等的影响将不会按照顺序执行。

```javascript
<script src="myscript.js"></script>
<script src="myscript.js" defer></script>
<script src="myscript.js" async></script> 
```

4. 把带 `defer` 属性的脚本放在 `<head>` 中比无属性的脚本放在 `</body>` 之前要更好，因为浏览器在页面解析时可对带 `defer` 属性的脚本进行下载。
5. 如果脚本相互依赖，请使用 `defer`。
6. 如果脚本是独立的，请使用 `async`。
7. 如果 DOM 必须解析好才执行且执行函数没有放在 `DOMContentLoaded` 的监听器中，请使用 `defer`。

### 什么是 DOM？

DOM（文档对象模型）是可扩展标记语言的标准编程接口，用来处理如 HTML 或 XML 这样由节点组成的树形结构的标记语言。这些节点（例如元素和文本节点）都是能够被编程接口操作的对象，他们任何可见的改变都会在文档中实时反映出来。在浏览器中，这些接口可供 JavaScript 进行使用，使其操作 DOM 节点来改变他们的样式、内容、在文档中的位置或者通过事件监听器来进行交互。

1. DOM 的设计与特定的编程语言相独立，以便使文档的结构化表述可以通过单一、一致的 API 获得。
2. 随着页面的加载，DOM 在浏览器中是逐步构建的，因此脚本通常放在页面底部，或设置 `defer` 属性后置于 `<head>` 中，或放在 `DOMContentLoaded` 事件监听器内部。为了避免错误，脚本对 DOM 节点的操作应该放在 DOM 完成构建之后。
3. `document.getElementById()` 和 `document.querySelector()` 是用来选择 DOM 节点的常用方法。
4. `BOM` 主要处理浏览器窗口和框架，不过通常浏览器特定的 `JavaScript` 扩展都被看做 BOM 的一部分。`window` 对象的属性和方法通常被称为 `BOM`。`DOM` 描述了处理网页内容的方法和接口，`BOM` 描述了与浏览器进行交互的方法和接口。

### XHTML 和 HTML 有什么不同?

1. XHTML 是更严格更纯净的 HTML 代码，他必须包含 `<DOCTYPE>`
2. XHTML 属性值必须使用双引号扩起来
3. XHTML 属性值不能省略。如 `checked="checked"` 不能简写为 `checked`
4. XHTML 元素必须被正确地嵌套。
5. XHTML 元素必须被关闭 如 `<br>` 必须写为 `<br />`
6. XHTML 标签名必须使用小写字母
7. XHTML 文档必须拥有根元素
8. XHTML 中特殊字符必须转译
9. 不同的浏览器对 HTML 标签嵌套错误的兼融性处理存在一定的区别。当嵌套错误时，可能会导致在某些浏览器上依旧能正常显示，而某些浏览器上则显示错乱甚至出现 JavaScript 报错。

### rel="noopener"  应在什么场景下使用，为什么？

1. `rel="noopener"` 是 `<a>` 超链接标签的一个属性。他可以禁止打开的新页面中使用 `window.opener` 属性，这样一来打开的新页面就不能通过 `window.opener` 去操作你的页面, 否则就会导致严重的安全漏洞。
2. 如果使用 JavaScript 打开的页面，可以通过如下代码解决：

```
var hacpaiWindow = window.open('https://hacpai.com');
hacpaiWindow.opener = null;
```

### 什么是 HTML5 存储？解释一下 `localStorage` 和 `sessionStorage`

1. 页面可以在用户的浏览器中存储本地数据 这些数据以 key/value 的格式进行存储。
2. 通过 `localStorage` 存储的数据是持久化的 不会过期，除非清除缓存。
3. `sessionStorage` 存储数据的生命周期和顶层窗口或浏览器标签页的一样。当标签页被永久关闭，通过 `sessionStorage` 存储的数据也将被删除。同一个页面被浏览器的两个标签页打开，这两个标签页中的 `sessionStorage` 数据是互相独立的。
4. 还有Cookie也可以存储数据
5. localStorage 比 cookie 要大（5MB左右）

### MIME type

https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types

> 没用过...



### 新标签兼容低版本

ie9之前版本通过createElement创建html5新标签
引入html5shiv.js https://github.com/aFarkas/html5shiv

## CSS

### CSS盒模型

```css
/* 标准模型 */
box-sizing:content-box;
 /*IE模型*/
box-sizing:border-box;
```

盒模型分为IE盒模型和W3C标准盒模型。
IE盒模型和W3C标准盒模型的区别是什么？

1. W3C 标准盒模型：
属性width,height只包含内容content，不包含border和padding。

2. IE 盒模型：
属性width,height包含border和padding，指的是content+padding+border。

在ie8+浏览器中使用哪个盒模型可以由box-sizing(CSS新增的属性)控制，默认值为content-box，即标准盒模型；如果将box-sizing设为border-box则用的是IE盒模型。如果在ie6,7,8中DOCTYPE缺失会触发IE模式。在当前W3C标准中盒模型是可以通过box-sizing自由的进行切换的。
content-box（标准盒模型）
width = 内容的宽度
height = 内容的高度
border-box（IE盒模型）
width = border + padding + 内容的宽度
height = border + padding + 内容的高度

## Javascript

### JS中数据类型

**基本数据类型**： undefined、null、Boolean、Number、String和Symbol(ES6)
**引用数据类型**： Object(Array, Date, RegExp, Function)

### 深浅拷贝

#### = 赋值

```javascript
x = y
```

原理：引用类型 赋值操作符只是把存放在栈内容中的指针赋值给另外一个变量

#### JSON.parse(JSON.stringify(x))

```javascript
let a = [1, 2, 3, 4]
let b = JSON.parse(JSON.stringify(a))

b[0] = 11

console.log('a', a)
console.log('b', b)
```

![image](https://user-images.githubusercontent.com/24250627/106392444-ccaa8d00-642c-11eb-9188-6649378bbf05.png)

原理：通过 stringify 转成 string，然后通过 parse 转成对象

缺陷 有些属性被忽略了... [source](https://segmentfault.com/a/1190000017773877)

```javascript
let obj = {
    nul: null,
    und: undefined,
    sym: Symbol('sym'),
    str: 'str',
    bol: true,
    num: 45,
    arr: [1, 4],
    reg: /[0-9]/,
    dat: new Date(),
    fun: function() {},  
}
console.log(JSON.parse(JSON.stringify(obj)))
```

![image](https://user-images.githubusercontent.com/24250627/106392596-8c97da00-642d-11eb-8f9f-28c33bcade33.png)

undefined、symbol、function 忽略掉了，reg 缺内容(或许还有别的也会忽略 没测试全面)

#### Object.assign()

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

![image](https://user-images.githubusercontent.com/24250627/106392923-fcf32b00-642e-11eb-88a4-3ad6b71b32c2.png)


```javascript
let obj = {
    a: {
        a1: 'a1'
    },
    b: 'b'
}
let ass = Object.assign({}, obj);
ass.a.a1 = 'aaa';
ass.b = 'bbb';
console.log(obj, ass);
```

适用于只有一层数据的对象

#### 展开运算符(...)

![image](https://user-images.githubusercontent.com/24250627/106393041-a2a69a00-642f-11eb-8c05-86037f4da1bd.png)

```javascript
let obj = {
    a: {
        a1: 'a1'
    },
    b: 'b'
}
let ass = {...obj};
ass.a.a1 = 'aaa';
ass.b = 'bbb'

console.log('obj', obj)
console.log('ass', ass)
```

适用于只有一层数据的对象

#### Slice

![image](https://user-images.githubusercontent.com/24250627/106426558-c81fbc00-64a0-11eb-9d05-7c1fcb0ab8bb.png)

```javascript
var arr = ['a', 'b', 'c'];
var arrCopy = arr.slice(0);
arrCopy[0] = 'test'
console.log(arr); // ["a", "b", "c"]
console.log(arrCopy); // ["test", "b", "c"]

var arr1 = [{"name":"weifeng"},{"name":"boy"}];//原数组
var arr2 = arr1.slice(0);//拷贝数组
arr1[1].name="girl";
console.log(arr1);// [{"name":"weifeng"},{"name":"girl"}]
console.log(arr2);//[{"name":"weifeng"},{"name":"girl"}
```

适用于只有一层数据 [code](https://juejin.cn/post/6844903647856295949)

#### Concat

![image](https://user-images.githubusercontent.com/24250627/106426742-1cc33700-64a1-11eb-9318-ffee1e82143d.png)

```javascript
var arr = ['a', 'b', 'c'];
var arrCopy = [].concat(arr);
arrCopy[0] = 'test'
console.log(arr); // ["a", "b", "c"]
console.log(arrCopy); // ["test", "b", "c"]

var arr1 = [{"name":"Roubin"},{"name":"RouSe"}];//原数组
var arr2 = [].concat(arr1);//拷贝数组
arr1[1].name="Tom";
console.log(arr1);//[{"name":"Roubin"},{"name":"Tom"}]
console.log(arr2);//[{"name":"Roubin"},{"name":"Tom"}]
```

适用于只有一层数据 [code](https://juejin.cn/post/6844903647856295949)

#### 浅拷贝的实现

```javascript
let data = [1, 2, 3, 4]
let data1 = { a: 1, b: 2, c: 3, d: 4 }
let data2 = [ {a: 1}, { a: 2 }, { a: 3 }, { a: 4 }]
let data3 = { a: { z: 1 }, b: {z : 2}, c: { z: 3 }, d: { z: 4 } }

let shallowCopy = function(obj) {
  if (typeof obj !== 'object') return

  let newObj = obj instanceof Array ? [] : {}
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      newObj[key] = obj[key]
    }
  }

  return newObj
}


let dataShallowCopy = shallowCopy(data)
let data1ShallowCopy = shallowCopy(data1)

dataShallowCopy[0] = 100
data1ShallowCopy.a = 100

console.log('dataShallowCopy', data, dataShallowCopy)
console.log('data1ShallowCopy', data1, data1ShallowCopy)

// dataShallowCopy [ 1, 2, 3, 4 ] [ 100, 2, 3, 4 ]
// data1ShallowCopy { a: 1, b: 2, c: 3, d: 4 } { a: 100, b: 2, c: 3, d: 4 }
```

[code](https://github.com/mqyqingfeng/Blog/issues/32)

#### 深拷贝的实现

```javascript
let deepCopy = function(obj) {
  if (typeof obj !== 'object') return

  let newObj = obj instanceof Array ? [] : {}
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
    }
  }

  return newObj
}


let data2DeepCopy = deepCopy(data2)
let data3DeepCopy = deepCopy(data3)

data2DeepCopy[0].a = 100
data3DeepCopy.a.z = 100

console.log('data2DeepCopy', data2, data2DeepCopy)
console.log('data3DeepCopy', data3, data3DeepCopy)

// data2DeepCopy [ { a: 1 }, { a: 2 }, { a: 3 }, { a: 4 } ] [ { a: 100 }, { a: 2 }, { a: 3 }, { a: 4 } ]
// data3DeepCopy { a: { z: 1 }, b: { z: 2 }, c: { z: 3 }, d: { z: 4 } } { a: { z: 100 }, b: { z: 2 }, c: { z: 3 }, d: { z: 4 } }
```

[code](https://github.com/mqyqingfeng/Blog/issues/32)

#### Lodash

项目可以使用Lodash提供的方法

```javascript
var objects = [{ 'a': 1 }, { 'b': 2 }]; 
var shallow = _.clone(objects);

console.log(shallow[0] === objects[0]);
// => true

var objects = [{ 'a': 1 }, { 'b': 2 }];
var deep = _.cloneDeep(objects);

console.log(deep[0] === objects[0]);
// => false
```

> 用什么方法最终还是需要根据实际情况选择

### 数组去重

#### new Set

```javascript
let arr= [1, 2, 3, 3, 5, 7, 2, 6, 2, 8];
console.log([...new Set(arr
                        
// [1, 2, 3, 5, 7, 6, 8]
```

#### 一维数组

```javascript
function Deduplication(data) {

  if (!Array.isArray(data) ) {
    return data
  }

  let list = []

  for (let i = 0; i < data.length; i++) {
    if (!list.includes(data[i])) {
      list.push(data[i])
    }
  }

  return list
}

let arrDedup = Deduplication(arr)
console.log('arrDedup', arrDedup)

//arrDedup [ 1, 2, 3, 5, 7, 6, 8, 4 ]
```

判断和Loop可以用 filter sort find indexOf includes 等等，原理应该差不多

#### 多维数组

```javascript
function Deduplications(data) {
  if (!Array.isArray(data) ) {
    return data
  }

  let list = []
  const flat = (data) => {
    for (let i = 0; i < data.length; i++) {
      if (Array.isArray(data[i])) {
        flat(data[i])
      } else {
        list.push(data[i])
      }
    }
    return list
  }

  flat(data)

  return [ ...new Set(list) ]
}
let arrDedups = Deduplications(arrs)
console.log('arrDedups', arrDedups)

//  [ 1, 2, 3, 4, 5, 6 ]
```

先平铺数组 然后去重(也还有其他解法)

#### Lodash

```javascript
let arr = [2, 1, 2, [ 1, [ 2, 3, [4, 5, 6, 7, 8, [ 0, 10 ] ] ] ] ]
let flatList = _.flattenDeep(arr);
let list = _.uniq(flatList)
console.log('list', list)

// [2, 1, 3, 4, 5, 6, 7, 8, 0, 10]
```



..