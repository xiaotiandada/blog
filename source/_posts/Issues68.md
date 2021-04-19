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
  - [BEM](#bem)
  - [CSS 预处理器有什么优势？](#css-预处理器有什么优势)
  - [使用 flexbox，Create 3 Col 布局  col-{n} / 12](#使用-flexboxcreate-3-col-布局--col-n--12)
  - [`@media`](#media)
  - [描述 CSS 盒子模型布局并简要描述](#描述-css-盒子模型布局并简要描述)
  - [`em`  `rem` 区别](#em--rem-区别)
  - [CSS sprites](#css-sprites)
  - [CSS 优先级](#css-优先级)
- [Javascript](#javascript)
  - [JS中数据类型](#js中数据类型)
  - [基本数据类型和引⽤类型在存储上的差别](#基本数据类型和引类型在存储上的差别)
  - [`var`、`let`、`const` 和没有关键字的声明有什么区别？](#varletconst-和没有关键字的声明有什么区别)
    - [无关键字](#无关键字)
    - [var](#var)
    - [let](#let)
    - [const](#const)
  - [变量提升](#变量提升)
  - [bind、call、apply 区别](#bindcallapply-区别)
  - [实现一个 bind 函数](#实现一个-bind-函数)
  - [实现一个 call 函数](#实现一个-call-函数)
  - [实现一个 apply 函数](#实现一个-apply-函数)
  - [简单说下原型链](#简单说下原型链)
  - [怎么判断对象类型](#怎么判断对象类型)
  - [typeof](#typeof)
  - [箭头函数的特点](#箭头函数的特点)
  - [This](#this)
  - [async、await 优缺点](#asyncawait-优缺点)
  - [generator 原理](#generator-原理)
  - [Promise](#promise)
  - [如何实现一个 Promise](#如何实现一个-promise)
  - [垃圾回收](#垃圾回收)
    - [新生代算法](#新生代算法)
    - [老生代算法](#老生代算法)
  - [浏览器 Eventloop 和 Node 中的有什么区别](#浏览器-eventloop-和-node-中的有什么区别)
    - [Node 中的 Event loop](#node-中的-event-loop)
  - [setTimeout 倒计时误差](#settimeout-倒计时误差)
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
  - [数组降维](#数组降维)
  - [['1', '7', '11'].map(parseInt) 输出结果](#1-7-11mapparseint-输出结果)
  - [`==` 和 `===` 区别](#-和--区别)
  - [x++ ++x](#x-x)
  - [`Promise` 状态](#promise-状态)
  - [什么是回调？](#什么是回调)
  - [对比两个对象](#对比两个对象)
  - [跨域](#跨域)
  - [Service worker](#service-worker)
  - [前端缓存](#前端缓存)
  - [CORS 是什么？](#cors-是什么)
  - [`0.1 + 0.2 === 0.3` 的计算结果是什么？](#01--02--03-的计算结果是什么)
  - [数组方法 `map()` 和 `forEach()` 有什么区别？](#数组方法-map-和-foreach-有什么区别)
  - [变量提升](#变量提升-1)
  - [立即执行匿名函数的原因是什么？](#立即执行匿名函数的原因是什么)
  - [词法作用域和动态作用域的区别？](#词法作用域和动态作用域的区别)
  - [`null` 和 `undefined` 有什么区别？](#null-和-undefined-有什么区别)
  - [arguments](#arguments)
  - [列举几种创建对象的方法](#列举几种创建对象的方法)
    - [对象字面量](#对象字面量)
    - [构造函数](#构造函数)
    - [工厂模式](#工厂模式)
    - [`Object.create()`](#objectcreate)
  - [JavaScript 通过值还是引用传递？](#javascript-通过值还是引用传递)
  - [原型继承和经典继承有什么区别？](#原型继承和经典继承有什么区别)
  - [原始值和引用值的比较](#原始值和引用值的比较)
  - [ASI (automatic semicolon insertion) - 自动插入分号](#asi-automatic-semicolon-insertion---自动插入分号)
  - [JavaScript 是否需要分号？](#javascript-是否需要分号)
  - [同步和异步代码有什么区别？](#同步和异步代码有什么区别)
  - [JavaScript 中的短路计算是什么？](#javascript-中的短路计算是什么)
  - [什么是闭包？](#什么是闭包)
  - [什么是函数式编程？](#什么是函数式编程)
  - [命令式编程和声明式编程有什么区别？](#命令式编程和声明式编程有什么区别)
    - [命令式编程](#命令式编程)
    - [声明式编程](#声明式编程)
  - [Memoization 是什么？](#memoization-是什么)
    - [Lodash](#lodash-2)
  - [对比 Mutable 和 Immutable 及 Mutating 和 Non-Mutating](#对比-mutable-和-immutable-及-mutating-和-non-mutating)
  - [JavaScript 中唯一自己不等于自己的值是谁？](#javascript-中唯一自己不等于自己的值是谁)
  - [复合函数](#复合函数)
  - [什么是纯函数？](#什么是纯函数)
    - [纯函数](#纯函数)
    - [非纯函数](#非纯函数)
  - [解释递归及其使用场景](#解释递归及其使用场景)
  - [静态方法和实例方法的区别](#静态方法和实例方法的区别)
  - [use strict 的作用](#use-strict-的作用)
  - [React, Vue, Angular、UI 库或框架的目的是什么？](#react-vue-angularui-库或框架的目的是什么)
  - [虚拟 DOM 是什么，库或者框架中为什么要使用他？](#虚拟-dom-是什么库或者框架中为什么要使用他)
- [React](#react)
  - [什么是内联条件表达式？](#什么是内联条件表达式)
  - [React 中什么是有状态的组件？](#react-中什么是有状态的组件)
  - [什么是无状态组件](#什么是无状态组件)
  - [key 是什么？列表中使用时有什么优点？](#key-是什么列表中使用时有什么优点)
  - [React 生命周期的方法有哪些？](#react-生命周期的方法有哪些)
    - [组件的生命周期](#组件的生命周期)
      - [挂载](#挂载)
      - [更新](#更新)
      - [卸载](#卸载)
      - [错误处理](#错误处理)
  - [Ref](#ref)
  - [children](#children)
  - [Context](#context)
  - [React 错误边界](#react-错误边界)
  - [Fragments](#fragments)
  - [高阶组件](#高阶组件)
  - [Portals](#portals)
  - [React 中如何使用 prop](#react-中如何使用-prop)
  - [VUE](#vue)
    - [Vue 组件间通信六种方式](#vue-组件间通信六种方式)
    - [Virtual Dom](#virtual-dom)
- [Node](#node)
  - [NodeJS 回调的错误处理方式及其优点](#nodejs-回调的错误处理方式及其优点)
  - [REST](#rest)
  - [如何避免地狱回调？](#如何避免地狱回调)
  - [Node.js 中的事件循环？](#nodejs-中的事件循环)
- [浏览器相关](#浏览器相关)
  - [cookie、localSrorage、session、indexDB](#cookielocalsroragesessionindexdb)
  - [怎么判断页面是否加载完成？](#怎么判断页面是否加载完成)
  - [重绘（Repaint）和回流（Reflow）](#重绘repaint和回流reflow)
    - [减少重绘和回流](#减少重绘和回流)
  - [图片优化](#图片优化)
      - [计算图片大小](#计算图片大小)
      - [图片加载优化](#图片加载优化)
  - [其他文件优化](#其他文件优化)
    - [CDN](#cdn)
    - [使用 Webpack 优化项目](#使用-webpack-优化项目)
  - [Webpack](#webpack)
  - [网络](#网络)
  - [TLS](#tls)
    - [从输入 URL 到页面加载全过程](#从输入-url-到页面加载全过程)
    - [HTTP 常用返回码](#http-常用返回码)
- [Security](#security)
  - [什么是跨站点脚本攻击（XSS）](#什么是跨站点脚本攻击xss)
- [其他](#其他)
  - [什么是大 O 符号？](#什么是大-o-符号)
    - [O(1)](#o1)
    - [O(N)](#on)
    - [O([1, N])](#o1-n)
    - [O(NlogN)](#onlogn)
    - [O(N^2)](#on2)
    - [O(N!)](#on-1)

1. [2018前端面试总结](https://juejin.cn/post/6844903673009553416#heading-59)
2. [每天 30 秒系列之前端面试](https://ld246.com/article/1544793046274)
3. [2万5千字大厂面经 | 掘金技术征文](https://juejin.cn/post/6844903682455109640)

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

### BEM

BEM（Block, Element, Modifier）是一种基于组件的对 CSS 类名进行约定的 Web 开发方法。

https://www.w3cplus.com/css/css-architecture-1.html

https://css-tricks.com/bem-101/

### CSS 预处理器有什么优势？

CSS 预处理器添加了一些实用的原生 CSS 没有的的功能，并且他通过使用 DRY（Don't Repeat Yourself）原则使生成的 CSS 更加整洁和易于维护

- CSS 预处理器虽然允许我们编写易于维护和可扩展的 CSS，但需要安装、配置、编译等（一般项目都配置好了
- CSS 预处理器还包含文件切分、模块化、运算、函数等优势
- 目前主流的 CSS 预处理器有： [Sass](https://link.ld246.com/forward?goto=https%3A%2F%2Fsass-lang.com%2F)、[Less](https://link.ld246.com/forward?goto=http%3A%2F%2Flesscss.org%2F)、[Stylus](https://link.ld246.com/forward?goto=http%3A%2F%2Fstylus-lang.com%2F)
- CSS 除了预处理器外还有后置处理器（Postprocessor），如：[Autoprefixer](https://link.ld246.com/forward?goto=https%3A%2F%2Fgithub.com%2Fpostcss%2Fautoprefixer) 等
- CSS 变量虽然已被大多数浏览器支持，但语法及可用性都不如 CSS 预处理器。

### 使用 flexbox，Create 3 Col 布局  col-{n} / 12 

```html
<style>
  .row {
    display: flex;
  }
  .row_col {
    background-color: aqua;
    height: 300px;
    margin: 10px;
    box-sizing: border-box;
  }
  .row_col-2 {
    flex-grow: 2;
  }
  .row_col-4 {
    flex-grow: 4;
  }
  .row_col-7 {
    flex-grow: 7;
  }
</style>
<div class="row">
  <div class="row_col row_col-2"></div>
  <div class="row_col row_col-7"></div>
  <div class="row_col row_col-4"></div>
</div>
```

### `@media`

`@media` 是可根据一个或多个基于媒体特征、媒体类型等条件来使用样式的规则。其包含以下四种媒体类型：

- `all`：适用于所有设备，默认选项
- `print`：仅适用于打印设备
- `screen`：仅适用于台式机、平板电脑、手机等屏幕
- `speech`：仅适用于屏幕阅读器
- 其余的媒体类型：`tty`，`tv`，`projection`，`handheld`，`braille`，`embossed`，`aural` 在 Media Queries Level 3 中已被废弃
- 可以使用逻辑操作符（`,`，`only`，`and`，`not`）组合媒体类型
- iPhone X 系列存在安全距离，其 @media 识别如下：(自己没有用过 一般只判断了底部的安全距离 [网页适配 iPhoneX](https://aotu.io/notes/2017/11/27/iphonex/index.html))

```
// iPhone XR 1792x828px at 326ppi
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
    ...
}
// iPhone XS 2436x1125px at 458ppi
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    ...
}
// iPhone XS Max 2688x1242px at 458ppi
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
    ...
}
```

```html
<meta name="viewport" content="width=device-width, viewport-fit=cover">
```

```css
body {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
```

### 描述 CSS 盒子模型布局并简要描述

CSS 盒子模型（Box Model）布局包含内容（content）、内边距（padding）、边框（border）、外边距（margin）四个部分。

- content：盒子内部填充元素内容（例如文本、图像或视频播放器等）的区域。他的大小为 `content-box` 的宽和高。相关 CSS 属性为 `width`，`min-width`，`max-width`，`height`，`min-height`，`max-height`。
- padding：内容周围的区域。他的大小为 `padding-box` 的宽和高。由 CSS 中的 `padding` 属性控制。
- border：边框，在内边距的外围。他的大小为 `border-box` 的宽和高。由 CSS 中的 `border` 属性控制。
- margin：最外围的透明区域，即边框外围区域。他可以将 DOM 中相邻的元素分开。他的大小为 `margin-box` 的宽和高。由 CSS 中的 `margin` 属性控制。

![alt text](https://img.hacpai.com/e/cf8a06004b444fb895eb315d78f46324.gif)

- 标准盒模型：属性 width / height 只包含 content，不包含 border 和 padding
- IE 盒模型：属性 width / height 包含 content + padding + border
- IE6/7/8 中 DOCTYPE 缺失会触发 IE 盒模型，标准中可使用 `box-sizing` 属性进行控制：content-box | border-box | inherit
- JavaScript 如何设置和获取盒模型对应的宽和高
- `element.style.width / height` 只能取到行内样式的宽和高，style 标签中和 link 外链的样式无法获取
- `window.getComputedStyle(element).width / height` 获取元素的宽或高：content + padding + border + 'px'
- `dom.getBoundingClientRect().width / height` 同上，但返回值为数字类型，不含 `px`
- 页面中多个元素的流布局属于格式化上下文（formatting context），这个元素可能是块元素也可能是行内元素。块元素的为 BFC（Block formatting contexts），行内元素的为 IFC（Inline formatting contexts）。常见场景如：垂直块元素 `margin` 重叠；行内元素高度由 `line-height` 决定等。

### `em`  `rem` 区别

`em` 和 `rem` 都是基于 `font-size` 的 CSS 属性。唯一的区别是他们继承的对象不同。

- `em` 继承父元素中的 `font-size`
- `rem` 继承根元素（`html`）中的 `font-size`
- 在大多数浏览器中，根元素的 `font-size` 默认值为 `16px`

**其他单位**

- vh` 和 `vw`：窗口高度或宽度的 1/100。可脱离父元素的继承规则，如：窗口高 900px，父元素高 1200px，1vh 为 9px。`
- `vmin` 和 `vmax`：窗口高、宽取其最大或最小的 1/100。主要用于手机屏幕旋转，如：窗口高 900px，宽 600px，1vmin 为 6px，1vmax 为 9px
- ex` 和 `ch`：分别为小写 x 的高度和数字 0 的宽度。主要用于精细排版中。` (没用过)
- `mm` 毫米、`cm` 厘米、`in` 英寸、`pt` 点（1/72 英寸）、`pc` 十二点活字（12 pt）。这些绝对单位之间的关系为：1in = 2.54cm = 25.4mm = 72pt = 6pc （没用过
- px 
- % 百分比

![imagepng](https://img.hacpai.com/file/2018/12/image-52a5242f.png?imageView2/2/interlace/1/format/webp)

- 其中 `rem`、`em` 、`vh`、`vx`、`vmin`、`vmax`、`%` 通常用于自适应方案中
- 移动端可采用 `viewport` 进行响应式设计 https://www.runoob.com/css/css-rwd-viewport.html

### CSS sprites

1. CSS sprites 将多张图片合并为一张图片，从而减少浏览器对 HTTP 的请求数量，进而减少网页的加载时间。即使在 HTTP/2 协议下，这依旧可以减少网页的加载时间。
2. 在 HTTP/1.1 中，每个 TCP 连接只允许一个请求。现代浏览器虽然可以打开多个（2-8）并行的 TCP 连接，但连接数量依旧有限。
3. HTTP/2 允许浏览器和服务器之间的多个请求在一个 TCP 连接上进行复用。 这意味着 TCP 连接被更有效的使用了：同一个页面在打开和关闭 TCP 连接的次数被减少了，客户端和服务器之间的延迟也被减少了。这样一来，数十个图片就可以在同一个 TCP 连接中并行加载了。
4. 在 CSS 中使用 sprites 需要用到 CSS 中的 `background-image`、`background-position` 及 `background-size` 等属性

### CSS 优先级

**权重记忆口诀**：*从0开始，一个行内样式+1000，一个id选择器+100，一个属性选择器、class或者伪类+10，一个元素选择器，或者伪元素+1，通配符+0。*

https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity

https://zhuanlan.zhihu.com/p/41604775

## Javascript

### JS中数据类型

**基本数据类型**： undefined、null、Boolean、Number、String和Symbol(ES6)
**引用数据类型**： Object(Array, Date, RegExp, Function)

### 基本数据类型和引⽤类型在存储上的差别

前者存储在栈上，后者存储在堆上(没太理解...)

### `var`、`let`、`const` 和没有关键字的声明有什么区别？

#### 无关键字

在变量赋值之前如果没有关键字的话，则会把变量分配给全局变量或覆盖已经声明的变量。在非严格模式下将会把变量做为全局对象（浏览器中的 `window`）的一个属性。在严格模式下，他将抛出异常以防止创建不需要的全局变量。

#### var

`var` 是 ES2015 以前声明变量的默认语句。他在函数作用域内创建的变量可以在该作用域中被重新赋值和重新声明。

以下代码片断中，在执行 `setTimeout` 回调时，循环完已经完成且变量 `i` 变为了 10，因此十个回调都引用了函数作用域中的同一个变量。

```
for (var i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i) // 10
  })
}
```

可以通过创建一个新的函数作用域来解决此问题

```
for (var i = 0; i < 10; i++) {
  ;(i => {
    setTimeout(() => {
      console.log(i)
    })
  })(i)
} 
```

#### let

`let` 是在 ES2015 中引入的，他是一种可在变量声明后可再赋值的常用声明方式。再次声明相同的变量将会抛出异常。他是有块作用域的，因此在循环中使用时将会保持在同一个作用域下迭代。

```
for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i) // 0 1 2...9
  })
} 
```

#### const

`const` 是在 ES2015 中引入的，他是一种新的默认的常用的声明方式。他声明的所有变量将不可再被重新赋值，如果是对象的话，必须保持对象的引用不变。他是块作用域的，且不能被再次赋值。

```
const myObject = {}
myObject.prop = "hello!" 
myObject = "hello" // Uncaught TypeError: Assignment to constant variable.
```

- 所有声明在其范围内都会被提升。
- `let` 和 `const` 中有一个称为时间死区（temporal dead zone TDZ）的概念。虽然声明会被提升，但在进入作用域之后、声明之前他将无法被访问。
- 尽可能避免使用 `var` 使用 ``let`` 代替
-  `const` 声明不变常量 ``let`` 声明可变变量

### 变量提升

当执行 JS 代码时，会生成执行环境，只要代码不是写在函数中的，就是在全局执行环境中，函数中的代码会产生函数执行环境，只此两种执行环境。

`var`

```react
b() // call b
console.log(a) // undefined

var a = 'Hello world'

function b() {
    console.log('call b')
}
```

因为函数和变量提升的原因。通常提升的解释是说将声明的代码移动到了顶部，这其实没有什么错误，便于大家理解。但是更准确的解释应该是：在生成执行环境时，会有两个阶段。第一个阶段是创建的阶段，JS 解释器会找出需要提升的变量和函数，并且给他们提前在内存中开辟好空间，函数的话会将整个函数存入内存中，变量只声明并且赋值为 undefined，所以在第二个阶段，也就是代码执行阶段，我们可以直接提前使用。

在提升的过程中，相同的函数会覆盖上一个函数，并且函数优先于变量提升

```react
b() // call b second

function b() {
    console.log('call b fist')
}
function b() {
    console.log('call b second')
}
var b = 'Hello world'
```

`var` 会产生很多错误，所以在 ES6中引入了 `let`。`let` 不能在声明前使用，但是这并不是常说的 `let` 不会提升，`let` 提升了，在第一阶段内存也已经为他开辟好了空间，但是因为这个声明的特性导致了并不能在声明前使用。

### bind、call、apply 区别

首先说下前两者的区别。

`call` 和 `apply` 都是为了解决改变 `this` 的指向。作用都是相同的，只是传参的方式不同。

除了第一个参数外，`call` 可以接收一个参数列表，`apply` 只接受一个参数数组。

```javascript
let a = {
    value: 1
}
function getValue(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value)
}
getValue.call(a, 'yck', '24')
getValue.apply(a, ['yck', '24'])

let getValueBind = getValue.bind(a)
getValueBind('yck', '25')
```

`bind` 和其他两个方法作用也是一致的，只是该方法会返回一个函数 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind)。并且我们可以通过 `bind` 实现柯里化。

**利用 bind 实现柯里化**

[source](https://juejin.cn/post/6844903909723488264)

```javascript
function list() {
  return Array.prototype.slice.call(arguments);
}

var list1 = list(1, 2, 3); // [1, 2, 3]

var leadingThirtysevenList = list.bind(null, 37);

var list2 = leadingThirtysevenList(); 
// [37]

var list3 = leadingThirtysevenList(1, 2, 3); 
// [37, 1, 2, 3]

console.log(list2, list3)
```

### 实现一个 bind 函数

利用apply修改this绑定 简易实现 可以参考 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#polyfill)

```javascript
let obj = {
	a: 1
}

Function.prototype.myBind = function(context) {
  if (typeof this !== 'function') {
  	throw new TypeError('Error')
  }

  let _this = this
  let args = [...arguments].slice(1)
  
  return function() {
  	let argsSlice = [...arguments].slice()
    return _this.apply(context, args.concat(argsSlice))
  }
}


function log(b, c) {
	console.log(this.a, b, c)
}

console.log('------1------')
log('b1', 'c1')

let logBind = log.bind(obj)
console.log('------2------')
logBind('b2', 'c2')

let logMyBind = log.myBind(obj)
console.log('------3------')
logMyBind('b3', 'c3')

"------1------"
undefined, "b1", "c1"
"------2------"
1, "b2", "c2"
"------3------"
1, "b3", "c3"
```

### 实现一个 call 函数

```javascript
let obj = {
	a: 1
}

Function.prototype.myCall = function(context = window) {
	context.fn = this
  let args = [...arguments].slice(1)
  let result = context.fn(...args)
  delete context.fn
  return result
}

function log(b, c) {
	console.log(this.a, b, c)
}

log.myCall(obj, 'b', 'c')

// 1, "b", "c"
```

this是 log fn，args  是后面的参数

### 实现一个 apply 函数

```javascript
let obj = {
	a: 1
}

Function.prototype.myApply = function (context = window) {
  context.fn = this

  let result
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }

  delete context.fn
  return result
}

function log(b, c) {
	console.log(this.a, b, c)
}

log.myApply(obj, ['b', 'c'])

// 1, "b", "c"
```

### 简单说下原型链

https://github.com/KieSun/Dream/issues/2

### 怎么判断对象类型

https://www.cnblogs.com/onepixel/p/5126046.html

- typeof typeof {} // "object"
- instanceof new Object() instanceof Object // true
- constructor ''.constructor == String // true
- toString 可以通过 `Object.prototype.toString.call(xx)`。这样我们就可以获得类似 `[object Type]` 的字符串。 Object.prototype.toString.call({}) "[object Object]"

### typeof

以下代码的执行结果是什么？

```javascript
typeof typeof 0 // string
```

`typeof 0` 返回字符串 `number`， 因此 `typeof 'number'` 的结果为 `string`。

- `typeof` 可能的返回值

| 类型      | 结果        |
| --------- | ----------- |
| undefined | `undefined` |
| null      | `object`    |
| boolean   | `boolean`   |
| number    | `number`    |
| string    | `string`    |
| Symbol()  | `symbol`    |
| 函数      | `function`  |
| 其他对象  | `object`    |

- 使用 `new` 关键字

```javascript
var str = new String('String');
typeof str; // "object"
var func = new Function();
typeof func; // "function"
```

- 使用括号

```javascript
typeof 11 + ' Wisen'; // "number Wisen"
typeof (11 + ' Wisen'); // "string"
```

- 未定义变量异常

```javascript
typeof undeclaredVariable === 'undefined'; // true
typeof newLetVariable; let newLetVariable; // VM90195:1 Uncaught ReferenceError: newLetVariable is not defined
typeof newConstVariable; const newConstVariable = 'hello'; // VM90283:1 Uncaught ReferenceError: Cannot access 'newConstVariable' before initialization
```

- 特例

```javascript
typeof document.all === 'undefined'; // true

typeof document.all // "undefined"
```

### 箭头函数的特点

**箭头函数表达式**的语法比[函数表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/function)更简洁，并且没有自己的`this` [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions) 

### This

在绝大多数情况下，函数的调用方式决定了 `this` 的值（运行时绑定）。`this` 不能在执行期间被赋值，并且在每次函数被调用时 `this` 的值也可能会不同。ES5 引入了 [bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) 方法来设置函数的 `this` 值，而不用考虑函数如何被调用的。ES2015 引入了[箭头函数](https://wiki.developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)，箭头函数不提供自身的 this 绑定（`this` 的值将保持为闭合词法上下文的值）。

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)

```javascript
function foo() {
	console.log(this.a)
}
var a = 1
foo() // 1

var obj = {
	a: 2,
	foo: foo
}
obj.foo() // 2

// 以上两者情况 `this` 只依赖于调用函数前的对象，优先级是第二个情况大于第一个情况

// 以下情况是优先级最高的，`this` 只会绑定在 `c` 上，不会被任何方式修改 `this` 指向
var c = new foo() // undefined
c.a = 3
console.log(c.a)

// 还有种就是利用 call，apply，bind 改变 this，这个优先级仅次于 new
```

### async、await 优缺点

`async 和 await` 相比直接使用 `Promise` 来说，优势在于处理 `then` 的调用链，能够更清晰准确的写出代码。解决回调地狱

缺点在于滥用 `await` 可能会导致性能问题，因为 `await` 会阻塞代码，也许之后的异步代码并不依赖于前者，但仍然需要等待前者完成，导致代码失去了并发性。

```javascript
var a = 0
var b = async () => {
  a = a + await 10
  console.log('2', a) // -> '2' 10
  a = (await 10) + a
  console.log('3', a) // -> '3' 20
}
b()
a++
console.log('1', a) // -> '1' 1
```

- 首先函数 `b` 先执行，在执行到 `await 10` 之前变量 `a` 还是 0，因为在 `await` 内部实现了 `generators` ，`generators` 会保留堆栈中东西，所以这时候 `a = 0` 被保存了下来
- 因为 `await` 是异步操作，遇到`await`就会立即返回一个`pending`状态的`Promise`对象，暂时返回执行代码的控制权，使得函数外的代码得以继续执行，所以会先执行 `console.log('1', a)`
- 这时候同步代码执行完毕，开始执行异步代码，将保存下来的值拿出来使用，这时候 `a = 10`
- 然后后面就是常规执行代码了

### generator 原理

Generator 是 ES6 中新增的语法，和 Promise 一样，都可以用来异步编程

```javascript
// 使用 * 表示这是一个 Generator 函数
// 内部可以通过 yield 暂停代码
// 通过调用 next 恢复执行
function* test() {
  let a = 1 + 2;
  yield 2;
  yield 3;
}
let b = test();
console.log(b.next()); // >  { value: 2, done: false }
console.log(b.next()); // >  { value: 3, done: false }
console.log(b.next()); // >  { value: undefined, done: true }
```

从以上代码可以发现，加上 `*` 的函数执行后拥有了 `next` 函数，也就是说函数执行后返回了一个对象。每次调用 `next` 函数可以继续执行被暂停的代码。



实现......



### Promise

Promise 是 ES6 新增的语法，解决了回调地狱的问题。

可以把 Promise 看成一个状态机。初始是 `pending` 状态，可以通过函数 `resolve` 和 `reject` ，将状态转变为 `resolved` 或者 `rejected` 状态，状态一旦改变就不能再次变化。



### 如何实现一个 Promise

[Promise的源码实现](https://github.com/xiaotiandada/blog/issues/71)

### 垃圾回收

V8 实现了准确式 GC，GC 算法采用了分代式垃圾回收机制。因此，V8 将内存（堆）分为新生代和老生代两部分。

#### 新生代算法

新生代中的对象一般存活时间较短，使用 Scavenge GC 算法。

在新生代空间中，内存空间分为两部分，分别为 From 空间和 To 空间。在这两个空间中，必定有一个空间是使用的，另一个空间是空闲的。新分配的对象会被放入 From 空间中，当 From 空间被占满时，新生代 GC 就会启动了。算法会检查 From 空间中存活的对象并复制到 To 空间中，如果有失活的对象就会销毁。当复制完成后将 From 空间和 To 空间互换，这样 GC 就结束了。

#### 老生代算法

老生代中的对象一般存活时间较长且数量也多，使用了两个算法，分别是标记清除算法和标记压缩算法。

在讲算法前，先来说下什么情况下对象会出现在老生代空间中：

- 新生代中的对象是否已经经历过一次 Scavenge 算法，如果经历过的话，会将对象从新生代空间移到老生代空间中。
- To 空间的对象占比大小超过 25 %。在这种情况下，为了不影响到内存分配，会将对象从新生代空间移到老生代空间中。

老生代中的空间很复杂，有如下几个空间

```typescript
enum AllocationSpace {
  // TODO(v8:7464): Actually map this space's memory as read-only.
  RO_SPACE,    // 不变的对象空间
  NEW_SPACE,   // 新生代用于 GC 复制算法的空间
  OLD_SPACE,   // 老生代常驻对象空间
  CODE_SPACE,  // 老生代代码对象空间
  MAP_SPACE,   // 老生代 map 对象
  LO_SPACE,    // 老生代大空间对象
  NEW_LO_SPACE,  // 新生代大空间对象

  FIRST_SPACE = RO_SPACE,
  LAST_SPACE = NEW_LO_SPACE,
  FIRST_GROWABLE_PAGED_SPACE = OLD_SPACE,
  LAST_GROWABLE_PAGED_SPACE = MAP_SPACE
};

```

在老生代中，以下情况会先启动标记清除算法：

- 某一个空间没有分块的时候
- 空间中被对象超过一定限制
- 空间不能保证新生代中的对象移动到老生代中

在这个阶段中，会遍历堆中所有的对象，然后标记活的对象，在标记完成后，销毁所有没有被标记的对象。在标记大型对内存时，可能需要几百毫秒才能完成一次标记。这就会导致一些性能上的问题。为了解决这个问题，2011 年，V8 从 stop-the-world 标记切换到增量标志。在增量标记期间，GC 将标记工作分解为更小的模块，可以让 JS 应用逻辑在模块间隙执行一会，从而不至于让应用出现停顿情况。但在 2018 年，GC 技术又有了一个重大突破，这项技术名为并发标记。该技术可以让 GC 扫描和标记对象时，同时允许 JS 运行，你可以点击 [该博客](https://v8project.blogspot.com/2018/06/concurrent-marking.html) 详细阅读。

清除对象后会造成堆内存出现碎片的情况，当碎片超过一定限制后会启动压缩算法。在压缩过程中，将活的对象像一端移动，直到所有对象都移动完成然后清理掉不需要的内存。

### 浏览器 Eventloop 和 Node 中的有什么区别

众所周知 JS 是门非阻塞单线程语言，因为在最初 JS 就是为了和浏览器交互而诞生的。如果 JS 是门多线程的语言话，我们在多个线程中处理 DOM 就可能会发生问题（一个线程中新加节点，另一个线程中删除节点），当然可以引入读写锁解决这个问题。

JS 在执行的过程中会产生执行环境，这些执行环境会被顺序的加入到执行栈中。如果遇到异步的代码，会被挂起并加入到 Task（有多种 task） 队列中。一旦执行栈为空，Event Loop 就会从 Task 队列中拿出需要执行的代码并放入执行栈中执行，所以本质上来说 JS 中的异步还是同步行为。

```javascript
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

console.log('script end');
```

以上代码虽然 `setTimeout` 延时为 0，其实还是异步。这是因为 HTML5 标准规定这个函数第二个参数不得小于 4 毫秒，不足会自动增加。所以 `setTimeout` 还是会在 `script end` 之后打印。

不同的任务源会被分配到不同的 Task 队列中，任务源可以分为 微任务（microtask） 和 宏任务（macrotask）。在 ES6 规范中，microtask 称为 `jobs`，macrotask 称为 `task`。

```javascript
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

new Promise((resolve) => {
    console.log('Promise')
    resolve()
}).then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('script end');
// script start => Promise => script end => promise1 => promise2 => setTimeout
```

以上代码虽然 `setTimeout` 写在 `Promise` 之前，但是因为 `Promise` 属于微任务而 `setTimeout` 属于宏任务，所以会有以上的打印。

微任务包括 `process.nextTick` ，`promise` ，`Object.observe` ，`MutationObserver`

宏任务包括 `script` ， `setTimeout` ，`setInterval` ，`setImmediate` ，`I/O` ，`UI rendering`

很多人有个误区，认为微任务快于宏任务，其实是错误的。因为宏任务中包括了 `script` ，浏览器会先执行一个宏任务，接下来有异步代码的话就先执行微任务。

所以正确的一次 Event loop 顺序是这样的

1. 执行同步代码，这属于宏任务
2. 执行栈为空，查询是否有微任务需要执行
3. 执行所有微任务
4. 必要的话渲染 UI
5. 然后开始下一轮 Event loop，执行宏任务中的异步代码

通过上述的  Event loop 顺序可知，如果宏任务中的异步代码有大量的计算并且需要操作 DOM 的话，为了更快的 界面响应，我们可以把操作 DOM 放入微任务中。

#### Node 中的 Event loop

**TODO 记录一下 还没理解...**

Node 中的 Event loop 和浏览器中的不相同。

Node 的 Event loop 分为6个阶段，它们会按照顺序反复运行

```
┌───────────────────────┐
┌─>│        timers         │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     I/O callbacks     │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     idle, prepare     │
│  └──────────┬────────────┘      ┌───────────────┐
│  ┌──────────┴────────────┐      │   incoming:   │
│  │         poll          │<──connections───     │
│  └──────────┬────────────┘      │   data, etc.  │
│  ┌──────────┴────────────┐      └───────────────┘
│  │        check          │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
└──┤    close callbacks    │
   └───────────────────────┘
```

**timer**

timers 阶段会执行 `setTimeout` 和 `setInterval`

一个 `timer` 指定的时间并不是准确时间，而是在达到这个时间后尽快执行回调，可能会因为系统正在执行别的事务而延迟。

下限的时间有一个范围：`[1, 2147483647]` ，如果设定的时间不在这个范围，将被设置为1。

**I/O **

I/O 阶段会执行除了 close 事件，定时器和 `setImmediate` 的回调

**idle, prepare**

idle, prepare 阶段内部实现

**poll** 轮询

poll 阶段很重要，这一阶段中，系统会做两件事情

1. 执行到点的定时器
2. 执行 poll 队列中的事件

并且当 poll 中没有定时器的情况下，会发现以下两件事情

- 如果 poll 队列不为空，会遍历回调队列并同步执行，直到队列为空或者系统限制
- 如果 poll 队列为空，会有两件事发生
  - 如果有 `setImmediate` 需要执行，poll 阶段会停止并且进入到 check 阶段执行 `setImmediate`
  - 如果没有 `setImmediate` 需要执行，会等待回调被加入到队列中并立即执行回调

如果有别的定时器需要被执行，会回到 timer 阶段执行回调。

**check**

check 阶段执行 `setImmediate`

**close callbacks**

close callbacks 阶段执行 close 事件

并且在 Node 中，有些情况下的定时器执行顺序是随机的

```
setTimeout(() => {
    console.log('setTimeout');
}, 0);
setImmediate(() => {
    console.log('setImmediate');
})
// 这里可能会输出 setTimeout，setImmediate
// 可能也会相反的输出，这取决于性能
// 因为可能进入 event loop 用了不到 1 毫秒，这时候会执行 setImmediate
// 否则会执行 setTimeout
```

当然在这种情况下，执行顺序是相同的

```
var fs = require('fs')

fs.readFile(__filename, () => {
    setTimeout(() => {
        console.log('timeout');
    }, 0);
    setImmediate(() => {
        console.log('immediate');
    });
});
// 因为 readFile 的回调在 poll 中执行
// 发现有 setImmediate ，所以会立即跳到 check 阶段执行回调
// 再去 timer 阶段执行 setTimeout
// 所以以上输出一定是 setImmediate，setTimeout
```

上面介绍的都是 macrotask 的执行情况，microtask 会在以上每个阶段完成后立即执行。

```
setTimeout(()=>{
    console.log('timer1')

    Promise.resolve().then(function() {
        console.log('promise1')
    })
}, 0)

setTimeout(()=>{
    console.log('timer2')

    Promise.resolve().then(function() {
        console.log('promise2')
    })
}, 0)

// 以上代码在浏览器和 node 中打印情况是不同的
// 浏览器中一定打印 timer1, promise1, timer2, promise2
// node 中可能打印 timer1, timer2, promise1, promise2
// 也可能打印 timer1, promise1, timer2, promise2
```

Node 中的 `process.nextTick` 会先于其他 microtask 执行。

```
setTimeout(() => {
  console.log("timer1");

  Promise.resolve().then(function() {
    console.log("promise1");
  });
}, 0);

process.nextTick(() => {
  console.log("nextTick");
});
// nextTick, timer1, promise1
```

### setTimeout 倒计时误差

JS 是单线程的，所以 `setTimeout` 的误差其实是无法被完全解决的，原因有很多，可能是回调中的，有可能是浏览器中的各种事件导致。这也是为什么页面开久了，定时器会不准的原因

可以通过一定的办法去减少这个误差。以下是一个相对准备的倒计时实现

**TODO 没看懂**

```javascript
var period = 60 * 1000 * 60 * 2
var startTime = new Date().getTime();
var count = 0
var end = new Date().getTime() + period
var interval = 1000
var currentInterval = interval

function loop() {
  count++
  var offset = new Date().getTime() - (startTime + count * interval); // 代码执行所消耗的时间
  var diff = end - new Date().getTime()
  var h = Math.floor(diff / (60 * 1000 * 60))
  var hdiff = diff % (60 * 1000 * 60)
  var m = Math.floor(hdiff / (60 * 1000))
  var mdiff = hdiff % (60 * 1000)
  var s = mdiff / (1000)
  var sCeil = Math.ceil(s)
  var sFloor = Math.floor(s)
  currentInterval = interval - offset // 得到下一次循环所消耗的时间
  console.log('时：'+h, '分：'+m, '毫秒：'+s, '秒向上取整：'+sCeil, '代码执行时间：'+offset, '下次循环间隔'+currentInterval) // 打印 时 分 秒 代码执行时间 下次循环间隔

  setTimeout(loop, currentInterval)
}

setTimeout(loop, currentInterval)
```



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

### 数组降维

```javascript
const flattenDeep = arr => Array.isArray(arr) ?
      arr.reduce((a, b) => [...a, ...flattenDeep(b)] , []) : [arr]

console.log(flattenDeep([1, [[2], [3, [4]], 5]]))
// [1, 2, 3, 4, 5]
```



### ['1', '7', '11'].map(parseInt) 输出结果

[1, NaN, 3]

- `parseInt(string, radix)` 将一个字符串转换为 `radix` 进制的整数。如果 `string` 无法被转化成数值类型将会返回 `NaN`。
- `radix` 为介于 2-36 之间的整数，通常默认值为 `10` https://www.w3school.com.cn/jsref/jsref_parseInt.asp
- `map` 在每次迭代时都会将 `value`，`index`，`array` 三个参数传递到 `parseInt()` 中，因此 `['1', '7', '11'].map(parseInt)` 可以扩展为：

```js
parseInt('1', 0) // 1
parseInt('7', 1) // NaN
parseInt('11', 2) // 3
```

- 改写为如下将会按预期执行：

```js
['1', '7', '11'].map(value => parseInt(value, 10));
```

###  `==` 和 `===` 区别

[JavaScript 中的相等性判断 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness)

简而言之，在比较两件事情时，双等号将执行类型转换; 三等号将进行相同的比较，而不进行类型转换 (如果类型不同, 只是总会返回 false ); 

三个等号 `===` 表示严格相等，也就是说类型和值都必须相同。两个等号 `==` 会使其中一边的类型进行强制转换，使等号两边的类型都相等后再对数值进行比较。

- 尽量使用全等操作符。因为其没有隐式转换，这样结果会比较容易预测、计算也会比较快
- 除了等于操作符，还可以使用 `Object.is` 进行同值比较。 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is 与[`==`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Equality) 运算*不同。* `==` 运算符在判断相等前对两边的变量(如果它们不是同一类型) 进行强制转换 (这种行为的结果会将 `"" == false` 判断为 `true`), 而 `Object.is`不会强制转换两边的值。 具体可以看MDN

| x                 | y                 | ==    | ===   | Object.is |
| ----------------- | ----------------- | ----- | ----- | --------- |
| undefined         | undefined         | true  | true  | true      |
| null              | null              | true  | true  | true      |
| true              | true              | true  | true  | true      |
| false             | false             | true  | true  | true      |
| "foo"             | "foo"             | true  | true  | true      |
| { foo: "bar" }    | x                 | true  | true  | true      |
| 0                 | 0                 | true  | true  | true      |
| +0                | -0                | true  | true  | false     |
| 0                 | false             | true  | false | false     |
| ""                | false             | true  | false | false     |
| ""                | 0                 | true  | false | false     |
| "0"               | 0                 | true  | false | false     |
| "17"              | 17                | true  | false | false     |
| [1,2]             | "1,2"             | true  | false | false     |
| new String("foo") | "foo"             | true  | false | false     |
| null              | undefined         | true  | false | false     |
| null              | false             | false | false | false     |
| undefined         | false             | false | false | false     |
| { foo: "bar" }    | { foo: "bar" }    | false | false | false     |
| new String("foo") | new String("foo") | false | false | false     |
| 0                 | null              | false | false | false     |
| 0                 | NaN               | false | false | false     |
| "foo"             | NaN               | false | false | false     |
| NaN               | NaN               | false | false | true      |

### x++ ++x

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence

优先级 ++.. 17 ..++ 18 从右到左进行计算

### `Promise` 状态

`Promise` 对象用于表示一个异步操作的最终状态（完成或失败）及其返回值。他有以下几种状态：

- pending：初始状态，完成或失败状态的前一个状态
- fulfilled：操作成功完成
- rejected：操作失败

pending 状态的 Promise 对象会触发 fulfilled/rejected 状态，在其状态处理方法中可以传入参数/失败信息。当操作成功完成时，Promise 对象的 `then` 方法就会被调用；否则就会触发 `catch`。

### 什么是回调？

- 回调函数作为实参传入另一个函数内，当某种事件被触发或某些任务被完成时会被调用，通常用于异步编程。
- 可以使用 `Promise`、Async/Await 等解决多重回调（callback hell）带来的问题

### 对比两个对象

- 严格相等运算符 `===`
- 宽松相等运算符 `==`
- `Object.is()` 函数
- Lodash isEqual

### 跨域

浏览器出于安全考虑，有同源策略。也就是说，如果协议、域名或者端口有一个不同就是跨域，Ajax 请求会失败。

- JSONP
- CORS
- Document.domain
  - https://blog.csdn.net/huzhenv5/article/details/104884760
  - https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy
- postMessage
- Nginx

https://segmentfault.com/a/1190000022398875

https://zhuanlan.zhihu.com/p/159060398

平时开发CORS就已经解决问题并且够用了

### Service worker

https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API

https://developers.google.com/web/tools/workbox

```javascript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      console.info('[pwa] [workbox] Unregistering service worker:', registration)
      registration.unregister()
    }
  })
}

if ('caches' in window) {
  caches.keys()
    .then((keys) => {
      if (keys.length) {
        console.info('[pwa] [workbox] Cleaning cache for:', keys.join(', '))
        for (const key of keys) {
          caches.delete(key)
        }
      }
    })
}
```

workbox

### 前端缓存

https://github.com/xiaotiandada/blog/issues/67 正在写...

### CORS 是什么？

CORS（Cross-Origin Resource Sharing）跨域资源共享使用额外的 HTTP 头来告诉浏览器，此站点已被授权可以访问来自服务器指定的不同域的资源。从 `http://mydomain.com` Web 应用程序中使用 Ajax 请求 `http://yourdomain.com` 资源就是一个跨域请求的例子。

出于安全考虑，浏览器会阻止 JavaScript 发起的 HTTP 跨源请求。 `XMLHttpRequest` 和 `fetch` 遵循了同源策略，这意味着使用这些 API 的 Web 应用程序只能从访问同域中的 HTTP 资源。想要通过这些 API 跨域访问资源就需要让跨域的域名被正确的包含在 CORS 头中。

- 跨域时需在请求头中加上 `Origin`。这样服务器接受到请求后会根据 `Origin` 检测结果在返回头中加入 `Access-Control-` 开头的字段。
- 非简单请求的 CORS，会在正式请求之前，增加一次 HTTP 预检请求去询问服务器该域名是否在白名单之中，以及可以使用哪些 HTTP 动作和头信息字段。只有符合要求后，浏览器才会发出正式的 `XMLHttpRequest` 请求，否则就抛出异常。
- CORS 行为并不是一个错误，他是保护用户安全的一种机制。
- CORS 可以阻止用户不小心访问的恶意网站去请求一个合法网站的站点资源，这样用户在合法站点的个人数据不仅会被获取，而且还可能进行一些无中生有的操作。
- JSONP 不仅支持跨域请求，而且还支持更多的浏览器。但他只支持 `GET` 请求。

### `0.1 + 0.2 === 0.3` 的计算结果是什么？

他的计算结果为 `false`，因为 JavaScript 中的 Math 遵循 IEEE 754 标准使用了 64 位的浮点数。简言之：计算机使用二进制来存储小数，而大部分小数转换成二进制后都是无限循环的值，因此需要进行取舍，这样一来在进行十进制计算时就会导致精度丢失。

```
0.1 + 0.2 // 0.30000000000000004 
```

可以 放大倍数或者使用工具库解决问题 比如 bignumber.js

### 数组方法 `map()` 和 `forEach()` 有什么区别？

这两种方法都是对数组中的元素进行迭代。`map()` 通过每个元素的回调函数将其映射到新的元素上，最终返回一个新的数组。`forEach()` 虽然也为每一个元素准备了回调函数，但却不返回新的数组。

- 需要迭代一个数组，使其本身发生变化且不需要返回一个新数组时，可以使用 `forEach()`
- `map()` 保持原有数组不变的正确选择
- `map()` 运行的较快，且返回的新数组可以让你继续使用 `map()`、`filter()`、`reduce()` 等方法

### 变量提升

```javascript
var foo = 1
var foobar = () => {
  console.log(foo)
  var foo = 2
}
foobar()
```

由于变量提升（Hoisting），局部变量 `foo` 将会在调用 `console.log` 方法之前进行声明。也就是说，作为参数传递给 `console.log()` 的局部变量 `foo` 替代了在函数外部声明的全局变量。但是变量初始化（赋值）并不会被提升，因此输出为 `undefined`，而不是 `2`。

- JavaScript 只会将声明提升，初始化并不会被提升
- 提升指变量和函数声明在编译阶段被放入内存中，在代码中的位置并不会变动
- ES6 中的 `let`、`const` 不存在提升

```javascript
const foobar = () => {
    console.log(foo)
    let foo = 2
}
foobar()  // Uncaught ReferenceError: foo is not defined
```

- 函数提升  函数提升要比变量提升的优先级要高一些，且不会被变量声明覆盖

```javascript
function hoistFunction() {
    foo(); // output: I am hoisted

    function foo() {
        console.log('I am hoisted');
    }
}

hoistFunction();

function hoistFunction() {
    function foo() {
        console.log(1);
    }

    foo(); // output: 2

    function foo() {
        console.log(2);
    }
}

hoistFunction();

var foo = 1
var foobar = () => {
  console.log(foo)
  
  function foo() {
    console.log(1)
  }
  
  var foo = 2
}

foobar()
// function foo() {
  // window.runnerWindow.proxyConsole.log(1)
// }

```

### 立即执行匿名函数的原因是什么？

围绕文件中的上下文创建一个闭包环境，为这个文件创建私有的命名空间。可以避免不同的 JavaScript 模块和库在命名上产生冲突。函数被立即调用，就可以将函数的返回值赋给命名空间（库名）。

```javascript
const myLibrary = (function() {
})()
myLibrary
```

- 立即执行的匿名函数除了提供私有命名空间外，还提供了数据隐藏、封装、多实例等面向对象编程的特性。如：

```javascript
var makeCounter = function() {};
var Counter1 = makeCounter();
var Counter2 = makeCounter();
```

- 以前很多流行的库（如：jQuery）都使用过该技术，但随着 JavaScript 版本的更新，都逐渐被 `import`，`class` 取而代之了。

### 词法作用域和动态作用域的区别？

词法作用域指的是使用函数位置来确定变量值。于此相对的是动态作用域，他使用函数调用的位置来确定变量值。

- 词法作用语也被成为静态作用域。
- 在闭包中，JavaScript 依旧遵循词法作用域。
- 大多数语言都使用词法范围，因为这样的源代码更加容易理解。
- JavaScript 实际上没有动态作用域，但 `this` 机制却和动态作用域类似：关注点都在于函数是如何被调用的。
- 下列代码中，使用词法作用域将输出 `2`，动态作用域将输出 `3`：

```javascript
function foo() {
	console.log( a ); // 2
}
function bar() {
	var a = 3;
	foo();
}
var a = 2;
bar();
```

### `null` 和 `undefined` 有什么区别？

在 JavaScript 中有两个值表示无 `undefined` 和 `null`。根本的区别在于 `null` 是显式的，而 `undefined` 是隐式的。当一个属性不存在或一个变量没有被赋值时，他们的值为 `undefined`。把 `null` 赋给一个变量时，就显式的表明这个变量“无值”。实际上，当明确知道没有对象或不应该有值时就使用 `null`，否则就使用 `undefined`。

- `typeof` 结果不同

```javascript
typeof undefined // "undefined"
typeof null // "object"，尽管返回 `object`，但他依旧是一个原始值，这是 JavaScript 在实现上的一个 bug。
typeof NaN // "number"
```

- [等于操作符 `==` 和 `===` 有什么区别](https://link.ld246.com/forward?goto=https%3A%2F%2Fhacpai.com%2Farticle%2F1546570870626%3Fr%3DVanessa)

```javascript
undefined == null // true
undefined === null // false
```

JavaScript 的设计者 Brendan Eich 认为表示“空值”的不应该是一个对象且 `null` 在计算时会自动转换为 0，很不容易发现错误。因此 `undefined` 就诞生了。

`null` 常用于以下场景：

- 作为函数的参数，表示该函数的参数不是对象。

- 作为对象原型链的终点。


`undefined` 常用于以下场景：

- 变量被声明了，但没有赋值时，就等于 undefined。

- 调用函数时，应该提供的参数没有提供，该参数等于 undefined。

- 对象没有赋值的属性，该属性的值为 undefined。

- 函数没有返回值时，默认返回 undefined。

### arguments

参数是函数定义时的变量名，而 arguments 的值是函数调用时赋予的。

```javascript
function myFunction(parameter1, parameter2) {
  console.log(arguments[0]) // "argument1"
}
myFunction("argument1", "argument2") 
```

- `arguments` 是一个类似数组的对象
- `arguments` 对象是函数中都可用的局部变量。
- 可以使用 `Array.from()` 或扩展运算符将参数转换为真实数组，如：

```javascript
var args = Array.from(arguments);
var args = [...arguments];

function foo(...args) {
  console.log(args)
}

foo(1, 2, 3)
```

### 列举几种创建对象的方法

#### 对象字面量

通常用于存储一次性数据。

```
const person = {
  name: "John",
  age: 50,
}
console.log(person.age) 
```

#### 构造函数

通常用于为一个对象创建多个实例的场景，每个实例都不会受到该对象的其他实例的影响，他们有自己独立的数据。`new` 关键字必须位于构造函数之前，否则下例中的 `name` 和 `age` 将会挂载到 `window` 上。

```javascript
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.birthday = function() {
  this.age++
}
const person1 = new Person("John", 50)
const person2 = new Person("Sally", 20)
person1.birthday()
console.log(person1.name, person1.age) // John 51
person2.birthday()
console.log(person2.name, person2.age) // Sally 21
```

#### 工厂模式

和构造函数类似，都可以创造一个新的实例，但是他可以通过闭包存储私有数据。在函数调用或 `this` 关键字之前不需要使用 `new` 操作。工厂模式不使用原型链模式，他将所有属性和方法都做为自己的属性。

```javascript
const createPerson = (name, age) => {
  const birthday = () => person.age++
  const person = { name, age, birthday }
  return person
}
const person = createPerson("John", 50)
person.birthday() 
console.log(person.age) // 51
```

#### `Object.create()`

设置新创建的对象的原型。`Object.create()` 的第二个参数可以提供新对象自身定义的可枚举属性。

```javascript
const personProto = {
  birthday() {
    this.age++
  }
}
const person = Object.create(personProto, {
  age: {
    value: 50,
    writable: true,
    enumerable: true
  },
 name: {
    value: 'John',
    writable: true,
    enumerable: true
  }
})
person.birthday() 
console.log(person.age, person.name) // 51 "John"
```

- 原型链相关的方法可以让一个对象从其他对象中继承属性和方法。

### JavaScript 通过值还是引用传递？

JavaScript 是通过值进行传递的。然而对于对象而言，值是对象的引用。

- 在值传递中，传递给函数的参数是函数被调用时所传实参的拷贝。
- 在引用传递中，传递给函数的是他的实际参数的隐式引用而不是实参的拷贝

### 原型继承和经典继承有什么区别？

在原型继承中，对象实例直接从其他对象继承。通常使用工厂模式或 `Object.create()` 来创建对象实例。

在经典继承中，对象实例从类中继承他们的属性和函数。通常使用构造函数和 `new` 关键字来创建对象实例。

- 代码中原型链过长时，应将其分解，以避免出现性能问题。
- 原生原型**不应该**被扩展，除非为了与新的 JavaScript 特性兼容。
- 在 ES6 中引入的 `class` 关键字只是语法糖，他仍然是基于原型的。
- 在编写复杂的继承代码之前，必须深入理解原型继承的模型。

### 原始值和引用值的比较

以下代码将输入什么？

```javascript
const a = [1, 2, 3]
const b = [1, 2, 3]
const c = "1,2,3"

console.log(a == c) // true
console.log(a == b) // false
```

第一个 `console.log` 输出为 `true`，因为 JavaScript 编译器在两个等号时会执行类型转换，a 将进行 `a.toString()` 转换为 "1,2,3"，所以 a 和 c 相等。

第二个 `console.log` 输出为 `false`，因为 a 和 b 是数组对象，对象是通过引用来进行比较的。a 和 b 可以看做 `new Array(1, 2, 3)`，都是新开辟出来的地址，所以引用肯定是不同的。如下通过引用的代码片断，将会输出 `true`：

```javascript
let d = [1, 2, 3]
let e = d
e.push(4)
console.log(d === e)
```

- JavaScript 在执行计算时会对类型进行自动转换
- `undefined`，`null` ，`boolean` ，`string` 和 `number` 这五类原始类型是通过值进行比较

### ASI (automatic semicolon insertion) - 自动插入分号

执行以下函数将输入什么？

```javascript
function greet() {
  return
  {
    message: "hello"
  }
}
```

执行 `greet()` 将输出 `undefined`。因为 JavaScript 的 ASI ( automatic semicolon insertion )，即自动插入分号会使编译器在语法分析时在 `return` 关键字后放一个分号，所以在不产生错误的情况下，他将输出 `undefined`。

- 由于 ASI，通常都使用换行来省略分号 以 `var`、`let`、`const`、`import`、`export` 开头的声明语句、表达式语句、debugger`、`continue`、`break`、`return`、`throw` 等语句

### JavaScript 是否需要分号？

有时候是不需要的，有时候是需要的。 JavaScript 自动插入分号机制，解释器会在大多数语句后自动添加分号。大多数情况下是不需要分号 但是在某些情况下需要分号

```javascript
const a = 3
;[1, 2, 3].map(n => n * 2) 
```

```javascript
const a = 3
;(function() {
  // ...
})() 
```

Error 大部分编辑器会给出明显的报错提示

```javascript
VM89097:2 Uncaught ReferenceError: Cannot access 'a' before initialization at <anonymous>:2:8
VM89160:2 Uncaught TypeError: 3 is not a function
```

- 根据团队的规范来 如果需要则可以加 不需要则可以不加 通常可以配置eslint来解决这个规范问题

### 同步和异步代码有什么区别？

同步意味着每一个操作必须等待前一个操作完成后才能执行。
 异步意味着操作不需要等待其他操作完成后才开始执行。

- JavaScript 中的同步任务是指在主线程上排队执行的任务，只有前一个任务执行完成后才能执行后一个任务；异步任务是指进入任务队列（task queue）而非主线程的任务，只有当任务队列通知主线程，某个异步任务可以执行了，该任务才会进入主线程中进行执行。
- JavaScript 的并发模型是基于 “event loop”。
- 像 `alert` 这样的方法回阻塞主线程，以致用户关闭他后才能继续进行后续的操作。
- Web Worker 虽然允许 JavaScript 创建多个线程，但子线程完全受主线程控制，且不能操作 DOM。

### JavaScript 中的短路计算是什么？

由于逻辑表达式的运算顺序是从左到右，并且他可以提前结束。使用这一规则便可进行短路计算。

```javascript
true || false
```

在逻辑运算过程中如果有一个表达式执行抛出异常，程序也不会受到影响，如：

```javascript
true || nonexistentFunction()
false && nonexistentFunction() 
```

由于从左到右的执行顺序，我们可以进行多个操作，如：

```javascript
true || nonexistentFunction() || window.nothing.wouldThrowError
true || window.nothing.wouldThrowError
true 
```

一个常用的场景是设置默认值。如果第一个对象是假值，将会使用第二个对象的值。如：

```javascript
const options = {}
const setting = options.setting || "default"
console.log(setting) // default
```

另一个常用的场景是当对象为真值时，去执行该对象的相关操作，如：

```javascript
addEventListener("click", e => {
  if (e.target.closest("button")) {
    handleButtonClick(e)
  }
})
// 以上代码片断等同于以下使用短路计算的代码片断
addEventListener(
  "click",
  e => e.target.closest("button") && handleButtonClick(e)
) 
```

在上面的示例中，如果 e.target 不存在或他里面不包含和 “button” 相匹配的元素，后面的函数将不会被执行。这是因为第一个对象如果是假值，那么第二个对象就不会被运行。

### 什么是闭包？

一个函数和对其周围状态（**lexical environment，词法环境**）的引用捆绑在一起（或者说函数被引用包围），这样的组合就是**闭包**（**closure**）。也就是说，闭包让你可以在一个内层函数中访问到其外层函数的作用域。在 JavaScript 中，每当创建一个函数，闭包就会在函数创建的同时被创建出来。https://link.ld246.com/forward?goto=https%3A%2F%2Fhacpai.com%2Farticle%2F1549635108016%23toc_h4_2) 

```javascript
function init() {
    var name = "Mozilla"; // name 是一个被 init 创建的局部变量
    function displayName() { // displayName() 是内部函数，一个闭包
        alert(name); // 使用了父函数中声明的变量
    }
    displayName();
}
init();
```

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)

### 什么是函数式编程？

函数式编程是一种编程范式，他使用**纯函数**来构建声明方式以避免状态的共享、数据的易变及一些副作用。函数式编程的核心是：同一个函数中只要输入相同，其返回值就必然相等，且不会产生任何副作用。

- 与使用命令式或面向对象编程的代码相比，函数式编程的代码更加简洁、清晰、可预测及易于测试。
- `String.prototype.toUpperCase`、`Array.prototype.map`、`Function.prototype.bind` 都是 JavaScript 中纯函数的例子，其非纯函数的例子有：`Date.now`、`Math.random` 等

### 命令式编程和声明式编程有什么区别？

这两种编程可以简单的概括为：

- 命令式编程：**如何**命令计算机完成
- 声明式编程： 我要完成**什么**

#### 命令式编程

```
const numbers = [1, 2, 3, 4, 5]
const numbersDoubled = []
for (let i = 0; i < numbers.length; i++) {
  numbersDoubled[i] = numbers[i] * 2
} 
```

我们手动循环遍历数组中的元素，然后将每个元素乘以 2 后赋给另外一个数组。

#### 声明式编程

```
const numbers = [1, 2, 3, 4, 5]
const numbersDoubled = numbers.map(n => n * 2) 
```

我们声明一个新的数组，让其中的每一个元素为原有数组中每一个元素的 2 倍。

### Memoization 是什么？

Memoization 是用来缓存函数调用的输出结果，以便减少后续再次调用时的运算，进而加快运算速度的一种优化技术。Memoization 在再次调用有相同输入的同一函数时将直接返回缓存的该函数的输出结果，但第一次的计算当然是必不可少的。

```
const memoize = fn => {
  const cache = new Map()
  return value => {
    const cachedResult = cache.get(value)
    if (cachedResult !== undefined) return cachedResult
    const result = fn(value)
    cache.set(value, result)
    return result
  }
} 
```

#### Lodash

```javascript
var object = { 'a': 1, 'b': 2 };
var other = { 'c': 3, 'd': 4 };
 
var values = _.memoize(_.values);
values(object);
// => [1, 2]
 
values(other);
// => [3, 4]
 
object.a = 2;
values(object);
// => [1, 2]
 
// 修改结果缓存。
values.cache.set(object, ['a', 'b']);
values(object);
// => ['a', 'b']
 
// 替换 `_.memoize.Cache`。
_.memoize.Cache = WeakMap;
```

### 对比 Mutable 和 Immutable 及 Mutating 和 Non-Mutating

- Mutable：对象主题可以被修改
- Immutable：对象一旦被创建就不能被修改
- Mutating：修改对象主题的方法
- Non-Mutating：不会使原始对象发生变化的修改方法

在 JavaScript 中，对象是可被修改的，但原始值却是不能被修改的。这意味着可以通过执行某些操作来修改对象的原始引用，但对原始值执行任何操作都不能修改他的初始值。
 所有的 `String.prototype` 方法都不能对初始值产生任何影响，他们都只会返回一个新的字符串。相比而言，`Array.prototype` 的某些方法也不会修改初始数组的引用，只会产生一个新的数组，但是某些方法却能产生变化。

```
const myString = "hello!"
// 返回一个新数组，并不会修改初始值
myString.replace("!", "") // "hello"

const originalArray = [1, 2, 3]
// 原始数组被修改
originalArray.push(4) // [1, 2, 3, 4]
// 返回一个新数组，不会修改原始数组
originalArray.concat(4) // [1, 2, 3, 4, 4]
```

- 数组中 Mutating 的方法如：`copyWithin`、`fill`、`pop`、`push`、`reverse`、`shift`、`sort`、`splice`、`unshift`
- 数组中 Non-Mutating 的方法如: `map`、`slice`、`concat`、`filter`
- https://github.com/immutable-js/immutable-js

### JavaScript 中唯一自己不等于自己的值是谁？

`NaN` (Not-a-Number) 无论使用什么比较运算符进行比较时，他是唯一不等于自身的值。`NaN` 通常是没有意义的数学计算的结果，因此两个 `NaN` 值被认为相等是没有意义的。

- 简单的实现 isNaN：

```javascript
const isNotNumber = x => x !== x
```

- `isNaN()` 和 `Number.isNaN()` 的区别如下：

```javascript
isNaN(NaN); // true
isNaN('A String'); // true
isNaN(undefined); // true
isNaN({}); // true
Number.isNaN(NaN); // true
Number.isNaN('A String'); // false
Number.isNaN(undefined); // false
Number.isNaN({}); // false
```

- 可以使用 `Object.is`判断

```javascript
Object.is(NaN, NaN) // true
```

### 复合函数

在[数学](https://zh.wikipedia.org/wiki/数学)中，**复合函数**，又称作**合成函数**（英语：function composition）是指[逐点](https://zh.wikipedia.org/wiki/逐点)地把一个[函数](https://zh.wikipedia.org/wiki/函数)作用于另一个函数的结果，所得到的第三个函数。例如，函数 *f* : *X* → *Y* 和 *g* : *Y* → *Z* 可以复合，得到从 *X* 中的 *x* 映射到 *Z* 中 *g*(*f*(*x*)) 的函数。直观来说，如果 *z* 是 *y* 的函数，*y* 是 *x* 的函数，那么 *z* 是 *x* 的函数。得到的复合函数记作 *g* ∘ *f* : *X* → *Z*，定义为对 *X* 中的所有 *x*，(*g* ∘ *f* )(*x*) = *g*(*f*(*x*))。[[note 1\]](https://zh.wikipedia.org/wiki/复合函数#cite_note-1) 直观地说，复合两个函数是把两个函数链接在一起的过程，内函数的输出就是外函数的输入。[wiki](https://zh.wikipedia.org/wiki/%E5%A4%8D%E5%90%88%E5%87%BD%E6%95%B0)

```javascript
compose(...fn) {
  if (fn.length === 0) {
    return arg => arg
  }

  if (fn.length === 1) {
    return fn[0]
  }

  return fn.reduce((a, b) => (...args) => a(b(...args)))
},
```

### 什么是纯函数？

- 给定相同的输入，返回输出结果必须相同
- 在作用域之外不能改变其他数据或提供给函数的数据。

纯函数在满足以上两个条件时，允许在自身内部对自己的变量进行改变。

#### 纯函数

```
const a = (x, y) => x + y
const b = (arr, value) => arr.concat(value)
const c = arr => [...arr].sort((a, b) => a - b) 
```

#### 非纯函数

```
const a = (x, y) => x + y + Math.random()
const b = (arr, value) => (arr.push(value), arr)
const c = arr => arr.sort((a, b) => a - b) 
```

### 解释递归及其使用场景

函数重复调用自身直到满足某个基本条件时。需要条件来打断循环，否则会不停的调用自身

https://blog.csdn.net/Creabine/article/details/79027419

```javascript
function factorial(n) {
  if(n === 1){
    return n
  }
  return n * factorial(n-1)
}
console.log(factorial(5))
```

### 静态方法和实例方法的区别

- 静态方法属于一个类，他不能在实例上使用。
- 实例方法属于类的原型，他继承 自该类的所有实例并可以在实例上使用。

```
Array.isArray // 数组的静态方法
Array.prototype.push // 数组的实例方法
```

如果 `Array.isArray` 方法做为数组的一个实例方法将没有任何意义，因为当他可以正常运行时，我们已经知道这个他是一个数组了。

实例方法在技术上可以当作静态方法使用，只是实例方法提供了更简洁的语法：

```
const arr = [1, 2, 3]
arr.push(4)
Array.push(arr, 4) 
```

- 使用 ES2015 的类语法创建一个静态方法和实例方法

```
class Foo {
    bar() {
        console.log('instance method')
    }

    static baz() {
        console.log('static method')
    }
}
Foo.baz() // static method
const f = new Foo()
f.bar() // instance method
```

### use strict 的作用

开头包含 'use strict' 可以启用严格模式，该模式强制开启了更为严格的 JavaScript 代码解析和错误处理。他被认为是一种很好的实践，为开发者提供了以下便捷之处：

- 通过抛出错误来消除了一些原有的静默错误，让调试更加容易。
- 修复了一些导致 JavaScript 引擎难以执行优化的缺陷：有时候，相同的代码，严格模式可以比非严格模式下运行得更快。
- 提高 JavaScript 的安全性，如私有变量的保护等。
- 简化 `eval()` 和 `arguments`，如 `arguments` 不会随参数的变化而变化等。

```
"use strict"
function f(a){
  a = 42;
  return [a, arguments[0]];
}
var pair = f(17);
console.log(pair) // [42, 17]，非严格模式下输出为 [42, 42]
```

- 防止意外的全局变量。

```
"use strict"
mistypedVaraible = 17; // Uncaught ReferenceError: mistypedVaraible is not defined
```

- 禁止重新定义。

```
"use strict";
undefined = 5; // Uncaught TypeError: Cannot assign to read only property 'undefined' of object '#<Window>'
```

- 使用 `delete` 时会抛出错误

```
"use strict";
delete mistypedVariable; // Uncaught SyntaxError: Delete of an unqualified identifier in strict mode.
```

- 强制消除 `this` 的引用，默认为 `undefined`。

```
"use strict";
name = "atatus";
function testFunction() {
    console.log(this.name);
}
// 非严格模式下输出 atatus
testFunction(); // Uncaught TypeError: Cannot read property 'name' of undefined 
```

- 禁用了在 ECMAScript 未来版本中可能会定义的一些语法。

### React, Vue, Angular、UI 库或框架的目的是什么？

- 组件化 功能复用 减少冗余代码和提高维护性
- 数据驱动视图 只需要关注数据变化即可
- 虚拟Dom vue 和react 都使用的虚拟dom性能提升
- 提供生命周期、插槽、条件语句、Hooks等一些列功能 提高开发效率

### 虚拟 DOM 是什么，库或者框架中为什么要使用他？

虚拟 DOM（VDOM）是使用 JavaScript 普通对象来描述真实 DOM 的展现方式

```javascript
document.createDocumentFragment()
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/createDocumentFragment)

- 库或者框架中使用虚拟 DOM 主要为了提高性能。
- 使用虚拟 DOM 可以减少对底层的 DOM 操作
- 虚拟 DOM 可以将同一时间内多个状态的变化累计计算出最终状态，以便对 DOM 只执行一次更新。
- Vue.js 中 Virtual DOM 是借鉴了一个开源库 [snabbdom](https://github.com/snabbdom/snabbdom) 的实现，然后加入了一些 Vue.js 特色的东西

## React

### 什么是内联条件表达式？

使用 `if` 语句或三元表达式 还可以在 JSX 中嵌入表达式

```
(
    <div>
      <h1>Hello! {isLoggedIn ? 'Vanessa' : 'User'}</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
 )
```

### React 中什么是有状态的组件？

有状态的组件是一种其行为取决于该状态的组件。这意味着在一个组件的两个实例中，即使给这两个实例赋予相同的属性，他们也不一定会有相同的渲染输出，这和纯函数组件不同。

```
// Stateful class component
class App extends Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }
  render() {
    // ...
  }
}

// Stateful function component
function App() {
  const [count, setCount] = useState(0)
  return // ...
} 
```

- 有状态的组件包含了他们内部所依赖的状态。
- 有状态的组件是类组件或者是使用了 useState hook 的函数组件。
- 有状态的组件在构造器中或使用 `useState()` 

```
import {useState} from 'react';

function Counter(){

 let [number,setCount ] = useState(0);

   return (
       <div>
        <h1>{number}</h1>
        <button onClick={()=>setCount(number+1)} >Increment</button>
        <button onClick={()=>setCount(number-1)} >Deccrement</button>
       </div>
   )
}
```

### 什么是无状态组件

无状态组件是本身行为不需要依赖他自身状态的组件。无状态组件可以是函数组件或者类组件。无状态函数组件更易于维护和测试，因为他们可以保证在相同的属性下有相同的输出。当不需要使用生命周期钩子时，应该首先使用无状态函数组件。

- 无状态组件不依赖他自身的状态。
- 无状态组件可以是类组件或者函数组件。
- 无状态函数组件可以完全避免使用 `this` 关键字。
- 无状态组件有更高的性能。

```
const Component (props)=>(
    <div>
        {props.text}
        ...
    </div>
)
```

### key 是什么？列表中使用时有什么优点？

Keys 是一种特殊的字符串属性，可以帮助 React 识别哪些项已经被修改过、添加过或删除过。当渲染数组元素时就需要使用 key 来给每一个元素进行固定的标识。每一个元素的 key 必须是唯一的（例如，数据中的 IDs 或最终排序后的索引）。

```
const todoItems = todos.map(todo => <li key={todo.id}>{todo.text}</li>) 
```

- Keys 为集合中的元素提供来固定的标识，从而帮助 React 来识别增删改。
- 如果项目的顺序可能会发生变化，则不建议使用索引作为 keys，因为这可能会对性能产生负面影响，并且可能会导致组件的状态出现问题。
- 如果将列表项单独提出来做为一个组件，在列表组件中 li 标签上的 key 需要提升到 ListItem 组件上

```
function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Correct! Key should be specified inside the array.
    <ListItem key={number.toString()}
              value={number} />

  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

### React 生命周期的方法有哪些？

https://zh-hans.reactjs.org/docs/react-component.html#the-component-lifecycle

https://medium.com/coding-hot-pot/react-lifecycle-%E7%94%9F%E5%91%BD%E9%80%B1%E6%9C%9F-a48683ae3922

#### 组件的生命周期

##### 挂载

当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下：

- [**`constructor()`**](https://zh-hans.reactjs.org/docs/react-component.html#constructor)
- [`static getDerivedStateFromProps()`](https://zh-hans.reactjs.org/docs/react-component.html#static-getderivedstatefromprops)
- [**`render()`**](https://zh-hans.reactjs.org/docs/react-component.html#render)
- [**`componentDidMount()`**](https://zh-hans.reactjs.org/docs/react-component.html#componentdidmount)

> 注意:
>
> 下述生命周期方法即将过时，在新代码中应该[避免使用它们](https://zh-hans.reactjs.org/blog/2018/03/27/update-on-async-rendering.html)：
>
> - [`UNSAFE_componentWillMount()`](https://zh-hans.reactjs.org/docs/react-component.html#unsafe_componentwillmount)



##### 更新

当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下：

- [`static getDerivedStateFromProps()`](https://zh-hans.reactjs.org/docs/react-component.html#static-getderivedstatefromprops)
- [`shouldComponentUpdate()`](https://zh-hans.reactjs.org/docs/react-component.html#shouldcomponentupdate)
- [**`render()`**](https://zh-hans.reactjs.org/docs/react-component.html#render)
- [`getSnapshotBeforeUpdate()`](https://zh-hans.reactjs.org/docs/react-component.html#getsnapshotbeforeupdate)
- [**`componentDidUpdate()`**](https://zh-hans.reactjs.org/docs/react-component.html#componentdidupdate)

> 注意:
>
> 下述方法即将过时，在新代码中应该[避免使用它们](https://zh-hans.reactjs.org/blog/2018/03/27/update-on-async-rendering.html)：
>
> - [`UNSAFE_componentWillUpdate()`](https://zh-hans.reactjs.org/docs/react-component.html#unsafe_componentwillupdate)
> - [`UNSAFE_componentWillReceiveProps()`](https://zh-hans.reactjs.org/docs/react-component.html#unsafe_componentwillreceiveprops)

##### 卸载

当组件从 DOM 中移除时会调用如下方法：

- [**`componentWillUnmount()`**](https://zh-hans.reactjs.org/docs/react-component.html#componentwillunmount)

##### 错误处理

当渲染过程，生命周期，或子组件的构造函数中抛出错误时，会调用如下方法：

- [`static getDerivedStateFromError()`](https://zh-hans.reactjs.org/docs/react-component.html#static-getderivedstatefromerror)
- [`componentDidCatch()`](https://zh-hans.reactjs.org/docs/react-component.html#componentdidcatch)

### Ref

https://zh-hant.reactjs.org/docs/refs-and-the-dom.html

https://juejin.cn/post/6844903749211652104

**React.createRef**

```react
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```

**Callback ref**

```react
class Test extends React.Component {
  componentDidMount(){
    console.log(this.second);
  // <input value="second">
  }
  render() {
    return <input value="second" ref={(input) => {this.second = input }} />
  }
}
```

### children

`children` 是传递给组件属性对象的一部分，他提供了组合组件的能力

```react
function GenericBox({ children }: any) {
  console.log('children', children)
  return <div className="container">{children}</div>
}

<GenericBox>
  <span>Hello</span> <span>World</span>
</GenericBox>
```

![image](https://user-images.githubusercontent.com/24250627/108600318-844e1180-73d1-11eb-90fa-61affe7941a9.png)

 ### Context

https://reactjs.org/docs/context.html

- Context 提供了一种通过 React 组件树传递数据的方法，他不需要手动传递属性。

- 使用 Context，可以跨越组件进行数据的传递

### React 错误边界

错误边界是 React 捕获子组件树中所有 JavaScript 错误的组件，他可以记录这些错误，并将错误显示在 UI 上来替代组件树的崩溃。

定义 `componentDidCatch` 那么他将成为错误边界

https://reactjs.org/docs/error-boundaries.html

```react
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true })
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>
    }
    return this.props.children
  }
}
```

- `componentDidCatch`：用于错误边界。他允许组件去捕获其子组件树中任意位置的 JavaScript 错误，打印错误，并使用 UI 展现错误信息。
- 当任何一个子组件在渲染过程中、在一个生命周期的方法中或在构造函数中发生错误时 `static getDerivedStateFromError()`，`componentDidCatch()` 将会被调用。

```react
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}
```

### Fragments

https://reactjs.org/docs/fragments.html

```react
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
```

- 可以使用 `<></>` 代替 `<React.Fragment/>`。`<></>` 只是一个语法糖。
- `<></>` 语法不能接受键值或属性，以下情况只能使用 `<React.Fragment/>` (没有实际测试过)

```
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // 没有`key`，将会触发一个key警告
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
```

- `key` 是唯一可以传递给 `Fragment` 的属性 （没有实际测试过）

### 高阶组件

https://zh-hans.reactjs.org/docs/higher-order-components.html

>高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。
>
>具体而言，**高阶组件是参数为组件，返回值为新组件的函数。**
>
>```
>const EnhancedComponent = higherOrderComponent(WrappedComponent);
>```
>
>组件是将 props 转换为 UI，而高阶组件是将组件转换为另一个组件。

### Portals

https://reactjs.org/docs/portals.html

```react
render() {
  // React does *not* create a new div. It renders the children into `domNode`.
  // `domNode` is any valid DOM node, regardless of its location in the DOM.
  return ReactDOM.createPortal(
    this.props.children,
    domNode
  );
}
```

### React 中如何使用 prop

 `isRequired`。

为组件定义的 `propTypes`：

```react
import PropTypes from "prop-types"

class User extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired
  }

  render() {
    return (
      <h1>Welcome, {this.props.name}</h1>
      <h2>Age, {this.props.age}
    )
  }
} 
```

- 使用 `propTypes` 并不是必需的，但这是一个非常棒的减少错误的实践
- 使用 `PropTypes.element` 可以指定只传递一个子代
- `defaultProps` 用来确保 `this.props` 在父组件没有指定的情况下有一个初始值
- 类型检查发生在 `defaultProps` 赋值之后，所以类型检查也会应用在 `defaultProps` 上。

### VUE

#### Vue 组件间通信六种方式

https://juejin.cn/post/6844903897258000398#heading-2

#### Virtual Dom

https://juejin.cn/post/6844903615652610055 TODO: 还没看...

## Node

### NodeJS 回调的错误处理方式及其优点

NodeJS 通常使用回调模式，如果在执行期间发生错误，会把错误作为回调的第一个参数传递到回调函数中：

```
fs.readFile(filePath, function(err, data) {
  if (err) {
    // 错误处理，return 可以让执行停止，这非常重要
    return console.log(err)
  }
  // 使用数据对象
  console.log(data)
}) 
```

优点包括如下：

- 如果不需要引用数据，则无需对数据进行处理
- API 保持高度的一致性可以带来更多的便捷
- 能够轻松适配回调模式，从而实现更易于维护的代码

从下面的示例中可以看出，如果没有错误，回调函数中的第一个参数将为 null。但是如果出现错误的话，将会创建一个 Error 对象作为回调函数中的唯一参数。回调函数让用户更加容易的知道是否有错误发生。

这种实践也称为 Node.js 的错误约定，这种回调函数的实现称为错误优先回调。

```
var isTrue = function(value, callback) {
  if (value === true) {
    callback(null, "Value was true.")
  } else {
    callback(new Error("Value is not true!"))
  }
}

var callback = function(error, data) {
  if (error) {
    console.log(error)
    return
  }
  console.log(data)
}

isTrue(false, callback) // Error: Value is not true!
isTrue(true, callback) // Value was true.
```

### REST

REST（REpresentational State Transfer）是一种用于网络架构的软件设计模式。RESTful Web 应用程序使用和资源相关的信息方式对数据进行公开。

通常，这个概念用于管理 Web 应用程序中的状态。对于大多数应用程序来说，他们对数据都有读取，创建，更新和销毁这四个共同的操作。数据模块化后形成单独的表，如 `posts`,`users`,`comments`，RESTful API 通过以下方式对数据进行访问：

- 资源标识符。使用端点或 URL 来表示资源。
- 服务器对资源的操作应该使用 HTTP 方法或动词。常见的 HTTP 方法有 GET，POST，PUT 和 DELETE。

以下示例为包含 `posts` 资源的 HTTP 方法及 URL：

- 读取：`/posts/`=> GET
- 创建：`/posts/new`=> POST
- 更新：`/posts/:id`=> PUT
- 删除：`/posts/:id`=> DELETE
- 除 RESTful 以外，GraphQL 也很受欢迎。

### 如何避免地狱回调？

如何避免以下这种地狱回调的情况？

```
getData(function(a) {
  getMoreData(a, function(b) {
    getMoreData(b, function(c) {
      getMoreData(c, function(d) {
        getMoreData(d, function(e) {
          // ...
        })
      })
    })
  })
})
```

使用最佳的 `async/await` 进行替换

```
async function asyncAwaitVersion() {
  const a = await getData()
  const b = await getMoreData(a)
  const c = await getMoreData(b)
  const d = await getMoreData(c)
  const e = await getMoreData(d)
  // ...
} 
```

### Node.js 中的事件循环？

https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/

https://juejin.cn/post/6844903999506923528

事件循环允许 Node.js 执行非阻塞的 I/O 操作，尽管 JavaScript 是单线程的。

事件循环处理所有的异步回调。回调在一个循环中进行排队，当代码运行时，队列中的每一个回调在接收到响应时将逐个进行运行。当 Node.js 启动时会初始化事件循环，每一个事件循环都有如下顺序的六个循环阶段：

```
┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

## 浏览器相关

### cookie、localSrorage、session、indexDB

| 特性         | cookie                                         | localStorage | sessionStorage | indexDB | Web SQL |
| ------------ | ---------------------------------------------- | ------------ | -------------- | ------- | ------- |
| 周期         | 可以服务器生成，可以前端设置。可以设置过期时间 | 长期         | 会话周期       | 长期    | 长期    |
| 数据存储大小 | 4K                                             | 5M           | 5M             |         |         |
| 与服务端通信 | 服务端设置的Cookie会携带在 header              |              |                |         |         |

对于 `cookie`，我们还需要注意安全性。

| 属性      | 作用                                                         |
| --------- | ------------------------------------------------------------ |
| value     | 如果用于保存用户登录态，应该将该值加密，不能使用明文的用户标识 |
| http-only | 不能通过 JS 访问 Cookie，减少 XSS 攻击                       |
| secure    | 只能在协议为 HTTPS 的请求中携带                              |
| same-site | 规定浏览器不能在跨域请求中携带 Cookie，减少 CSRF 攻击        |

### 怎么判断页面是否加载完成？

**`DOMContentLoaded`**当初始HTML文档已完全加载并解析，而无需等待样式表，图像和子帧完成加载时，将触发此事件。

```javascript
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
});
```

**`load`**加载整个页面（包括所有相关资源，例如样式表和图像）时，将触发该事件。这与相反[`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event)，后者在页面DOM被加载后立即触发，而无需等待资源完成加载。

```javascript
window.addEventListener('load', (event) => {
  console.log('page is fully loaded');
});
```

### 重绘（Repaint）和回流（Reflow）

重绘：不改变布局

回流：需要改变布局

回流一定发生重绘 重绘不一定发生回流

- https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/24

- https://juejin.cn/post/6844903682455109640#heading-45（很多人不知道的是，重绘和回流其实和 Event loop 有关。 

TODO: 这里没理解...）

- https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model

#### 减少重绘和回流

- 使用 `translate` 替代 `top`

- 使用 `visibility` 替换 `display: none` ，因为前者只会引起重绘，后者会引发回流（改变了布局）

- 合并多次对DOM和样式的修改，然后一次处理

- 对于复杂动画效果,使用绝对定位让其脱离文档流

- css3硬件加速（GPU加速）

- 避免触发同步布局事件： 访问元素的一些属性的时候，会导致浏览器强制清空队列，进行强制同步布局。

  ```javascript
  function initP() {
      for (let i = 0; i < paragraphs.length; i++) {
          paragraphs[i].style.width = box.offsetWidth + 'px';
      }
  }
  const width = box.offsetWidth;
  function initP() {
      for (let i = 0; i < paragraphs.length; i++) {
          paragraphs[i].style.width = width + 'px';
      }
  }
  ```

https://segmentfault.com/a/1190000017329980

### 图片优化

##### 计算图片大小

对于一张 100 * 100 像素的图片来说，图像上有 10000 个像素点，如果每个像素的值是 RGBA 存储的话，那么也就是说每个像素有 4 个通道，每个通道 1 个字节（8 位 = 1个字节），所以该图片大小大概为 39KB（10000 * 1 * 4 / 1024）。

但是在实际项目中，一张图片可能并不需要使用那么多颜色去显示，我们可以通过减少每个像素的调色板来相应缩小图片的大小。

了解了如何计算图片大小的知识，那么对于如何优化图片，想必大家已经有 2 个思路了：

- 减少像素点
- 减少每个像素点能够显示的颜色

##### 图片加载优化

1. 不用图片。很多时候会使用到很多修饰类图片，其实这类修饰图片完全可以用 CSS 去代替。

2. 对于移动端来说，屏幕宽度就那么点，完全没有必要去加载原图浪费带宽。一般图片都用 CDN 加载，可以计算出适配屏幕的宽度，然后去请求相应裁剪好的图片。还可以返回webp等图片

3. 小图使用 base64 格式

4. 将多个图标文件整合到一张图片中（雪碧图）

5. 选择正确的图片格式：

   - 对于能够显示 WebP 格式的浏览器尽量使用 WebP 格式。因为 WebP 格式具有更好的图像数据压缩算法，能带来更小的图片体积，而且拥有肉眼识别无差异的图像质量，缺点就是兼容性并不好。安卓、PC支持都还不错，IOS移动端需要注意

     ```javascript
     // 判断兼容性
     const isSupportWebp = process.browser ? !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0 : false
     ```

   - 小图使用 PNG，其实对于大部分图标这类图片，完全可以使用 SVG 代替

   - 照片使用 JPEG

### 其他文件优化

CSS 文件放在 `head` 中

服务端开启文件压缩功能 GZIP

将 `script` 标签放在 `body` 底部，因为 JS 文件执行会阻塞渲染。当然也可以把 `script` 标签放在任意位置然后加上 `defer` ，表示该文件会并行下载，但是会放到 HTML 解析完成后顺序执行。对于没有任何依赖的 JS 文件可以加上 `async` ，表示加载和渲染后续文档元素的过程将和  JS 文件的加载与执行并行无序进行。

执行 JS 代码过长会卡住渲染，对于需要很多时间计算的代码可以考虑使用 `Webworker`。`Webworker` 可以让我们另开一个线程执行脚本而不影响渲染。

#### CDN

静态资源尽量使用 CDN 加载，由于浏览器对于单个域名有并发请求上限，可以考虑使用多个 CDN 域名。对于 CDN 加载静态资源需要注意 CDN 域名要与主站不同，否则每次请求都会带上主站的 Cookie。

#### 使用 Webpack 优化项目

- 对于 Webpack4，打包项目使用 production 模式，这样会自动开启代码压缩
- 使用 ES6 模块来开启 tree shaking，这个技术可以移除没有使用的代码
- 优化图片，对于小图可以使用 base64 的方式写入文件中
- 按照路由拆分代码，实现按需加载
- 给打包出来的文件名添加哈希，实现浏览器缓存文件

### Webpack

...

### 网络

https://juejin.cn/post/6844903682455109640#heading-76



### TLS

TLS 协议位于传输层之上，应用层之下。首次进行 TLS 协议传输需要两个 RTT ，接下来可以通过 Session Resumption 减少到一个 RTT。

在 TLS 中使用了两种加密技术，分别为：对称加密和非对称加密。

**对称加密**：

对称加密就是两边拥有相同的秘钥，两边都知道如何将密文加密解密。

**非对称加密**：

有公钥私钥之分，公钥所有人都可以知道，可以将数据用公钥加密，但是将数据解密必须使用私钥解密，私钥只有分发公钥的一方才知道。

#### 从输入 URL 到页面加载全过程

1. 首先做 DNS 查询，如果这一步做了智能 DNS 解析的话，会提供访问速度最快的 IP 地址回来
2. 接下来是 TCP 握手，应用层会下发数据给传输层，这里 TCP 协议会指明两端的端口号，然后下发给网络层。网络层中的 IP 协议会确定 IP 地址，并且指示了数据传输中如何跳转路由器。然后包会再被封装到数据链路层的数据帧结构中，最后就是物理层面的传输了
3. TCP 握手结束后会进行 TLS 握手，然后就开始正式的传输数据
4. 数据在进入服务端之前，可能还会先经过负责负载均衡的服务器，它的作用就是将请求合理的分发到多台服务器上，这时假设服务端会响应一个 HTML 文件
5. 首先浏览器会判断状态码是什么，如果是 200 那就继续解析，如果 400 或 500 的话就会报错，如果 300 的话会进行重定向，这里会有个重定向计数器，避免过多次的重定向，超过次数也会报错
6. 浏览器开始解析文件，如果是 gzip 格式的话会先解压一下，然后通过文件的编码格式知道该如何去解码文件
7. 文件解码成功后会正式开始渲染流程，先会根据 HTML 构建 DOM 树，有 CSS 的话会去构建 CSSOM 树。如果遇到 `script` 标签的话，会判断是否存在 `async` 或者 `defer` ，前者会并行进行下载并执行 JS，后者会先下载文件，然后等待 HTML 解析完成后顺序执行，如果以上都没有，就会阻塞住渲染流程直到 JS 执行完毕。遇到文件下载的会去下载文件，这里如果使用 HTTP 2.0 协议的话会极大的提高多图的下载效率。
8. 初始的 HTML 被完全加载和解析后会触发 `DOMContentLoaded` 事件
9. CSSOM 树和 DOM 树构建完成后会开始生成 Render 树，这一步就是确定页面元素的布局、样式等等诸多方面的东西
10. 在生成 Render 树的过程中，浏览器就开始调用 GPU 绘制，合成图层，将内容显示在屏幕上了

#### HTTP 常用返回码

https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

HTTP响应状态代码指示特定的[HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)请求是否已成功完成。响应分为五类：

1. [信息反馈](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#information_responses)（`100`– `199`）
2. [成功的回应](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#successful_responses)（`200`– `299`）
3. [重定向](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#redirection_messages)（`300`– `399`）
4. [客户端错误](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses)（`400`– `499`）
5. [服务器错误](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#server_error_responses)（`500`– `599`）

**2XX 成功**

- 200 OK，表示从客户端发来的请求在服务器端被正确处理
- 204 No content，表示请求成功，但响应报文不含实体的主体部分
- 205 Reset Content，表示请求成功，但响应报文不含实体的主体部分，但是与 204 响应不同在于要求请求方重置内容
- 206 Partial Content，进行范围请求

**3XX 重定向**

- 301 moved permanently，永久性重定向，表示资源已被分配了新的 URL
- 302 found，临时性重定向，表示资源临时被分配了新的 URL
- 303 see other，表示资源存在着另一个 URL，应使用 GET 方法获取资源
- 304 not modified，表示服务器允许访问资源，但因发生请求未满足条件的情况
- 307 temporary redirect，临时重定向，和302含义类似，但是期望客户端保持请求方法不变向新的地址发出请求

**4XX 客户端错误**

- 400 bad request，请求报文存在语法错误
- 401 unauthorized，表示发送的请求需要有通过 HTTP 认证的认证信息
- 403 forbidden，表示对请求资源的访问被服务器拒绝
- 404 not found，表示在服务器上没有找到请求的资源
- 429 Too Many Requests 用户在给定的时间内发送了太多请求（“速率限制”）

**5XX 服务器错误**

- 500 internal sever error，表示服务器端在执行请求时发生了错误
- 501 Not Implemented，表示服务器不支持当前请求所需要的某个功能
- 502 Bad Gateway 此错误响应意味着服务器在充当网关以获取处理请求所需的响应的同时，获得了无效的响应。
- 503 service unavailable，表明服务器暂时处于超负载或正在停机维护，无法处理请求



## Security

### 什么是跨站点脚本攻击（XSS）

XSS 是指客户端代码注入，攻击者将带有恶意脚本的代码注入到合法的网站或 web 应用程序中。这通常发生在应用程序对用户的输入不进行验证时，这样恶意代码就会轻松的注入到动态的 HTML 内容中。

- 可以使用工具库过滤xss https://www.npmjs.com/package/xss

- 恶意的脚本有权限访问到通常用于存储会话令牌的 cookie。
- 当页面中注入的恶意脚本执行时，就可以对该页面中的 DOM 进行任意操作。这样一来，攻击者不仅可以插入与网站相似的内容或操作，也可以窜改网站上原有的实际内容。该脚本还可以使用 AJAX 发送带有任意内容的 HTTP 请求到任意一台服务器上。
- 在客户端，可以使用 `textContent` 来代替 `innerHTML` 以阻止浏览器运行通过 HTML 解析器执行内部脚本得到的字符串。
- 在服务器端，转义 HTML 标签可以阻止浏览器将用户的输入解析为真实的 HTML，这样也不会执行脚本。但如果你想真实的展现用户的输入，那就只能对会被注入的标签、标签属性进行过滤。



## 其他

### 什么是大 O 符号？

大 O 符号在计算机科学中 用来描述算法的时间复杂度。执行速度快且复杂性低的算法视为优秀的算法。
 算法的运行次数并不是每次都相同，大部分取决于所提供的数据。在某些情况下，他们执行的很快，但某些情况下，他们却执行的很慢（哪怕他们的数据是一样多）。

以下示例中，我们假设基准时间为：1element = 1ms

#### O(1)

```
arr[arr.length - 1] // 1000 elements = 1ms
```

时间复杂度恒定。无论数组有多少元素，理论（不考虑机器性能、当前环境等因素）上他执行的时间总量是相同的。

#### O(N)

```
arr.filter(fn) // 1000 elements = 1000ms
```

线性时间复杂度。执行时间将随数组元素个数呈线性增加。如果数组拥有 1000 个元素且函数运行需要花费 1ms，那么 7000 个元素需要执行 7ms。这是因为函数在返回结果之前必须迭代数组中的所有元素。

#### O([1, N])

```
arr.some(fn) // 1000 elements = 1ms <= x <= 1000ms
```

执行时间的长短取决于提供给函数的数据，他需要的时间可能很短，也可能很长。最好的情况是 O(1)，最坏的情况是 O(N)。

#### O(NlogN)

```
arr.sort(fn) // 1000 elements ~= 10000ms
```

浏览器通常为 `sort()` 方法使用快速排序算法进行实现，快速排序的平均时间复杂度为 O(NlogN)。这对于数据很多的集合非常有效。

#### O(N^2)

```
for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length; j++) {
    // 1000 elements = 1000000ms
  }
} 
```

执行时间随元素数量呈二次方增长。这通常是由于使用了嵌套循环。

#### O(N!)

```
// 1000 elements = Infinity ms
const permutations = arr => {
  if (arr.length <= 2) return arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr
  return arr.reduce(
    (acc, item, i) =>
      acc.concat(
        permutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map(val => [
          item,
          ...val
        ])
      ),
    []
  )
} 
```

数组中即使只增加一个元素，也会使执行时间增加的非常长。

- 嵌套循环的执行时间会随着元素的增长呈指数增长，因此遇到嵌套循环需考虑到性能问题。



...

































