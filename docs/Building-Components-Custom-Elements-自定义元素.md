---
title: Building Components Custom Elements 自定义元素
date: 2019-09-15 01:42:32
tags:
categories:
- [html]
- [css]
- [javascript]
---

首先来写一个示例吧


Web Components 标准非常重要的一个特性是，它使开发者能够将HTML页面的功能封装为 custom elements（自定义标签），而往常，开发者不得不写一大堆冗长、深层嵌套的标签来实现同样的页面功能。这篇文章将会介绍如何使用HTML的custom elements。 - MDN

https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_custom_elements

具体看MDN文档,(复制完应该就差不多了 然后去这里玩)

https://developers.google.com/web/fundamentals/web-components/

<!-- more -->

**查看demo**
```html
<style for-run for-show>
.popup-info {
  width: 100px;
  height: 100px;
  position: relative;
  top: 100px;
  left: 300px;
}
.popup-info1 {
  width: 100px;
  height: 100px;
  position: relative;
  top: 160px;
  left: 600px;
}
.popup-info img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
}
.popup-info .info {
  font-size: 20px;
  width: 200px;
  display: inline-block;
  border: 1px solid black;
  padding: 10px;
  background: white;
  border-radius: 4px;
  opacity: 0;
  transition: 0.6s all;
  position: absolute;
  bottom: 110px;
  left: 0px;
  z-index: 3;
}
.popup-info:hover .info{
  opacity: 1;
}
</style>

<template for-run for-show>

<popup-info role="popup" img="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4038933139,466219061&fm=26&gp=0.jpg" data-text="I Learn Js 💗"></popup-info>
<button id="remove">remove</button>
<button id="move">move</button>
<button id="toggle">toggle attribute</button>


<popup-info1 role="popup" img="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4038933139,466219061&fm=26&gp=0.jpg" data-text="I Learn Js 💗"></popup-info1>

<button is="popup-button">popup-button!</button>

</template>

<script for-run for-show>
class popupInfo extends HTMLElement {
  constructor() {
    super()

  }
  static get observedAttributes() {
    return ['role']
  }
  // 生命周期钩子
  connectedCallback() {
    // 创建 div
    let div = document.createElement('div')
    div.setAttribute('role', 'popup-info')

    // 创建 img
    let img = document.createElement('img')
    let src = this.getAttribute('img')

    // 创建info信息
    let info = document.createElement('span')
    let text = this.getAttribute('data-text')

    // 设置img内容
    img.src = src
    img.alt = text

    // 设置info内容
    info.classList.add('info')
    info.innerText = text

    // 添加class
    div.classList.add('popup-info')

    // 添加内容 img info
    div.appendChild(img)
    div.appendChild(info)

    this.appendChild(div)
  }
  disconnectedCallback() {
    console.log('我没有了呀')
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    console.log('当前的属性:', attrName)
    console.log('当前的属性 old:', oldVal)
    console.log('当前的属性 new:', newVal)
  }
  adoptedCallback() {
    console.log('adoptedCallback 自定义元素被移入新的 document')
  }
}

customElements.define('popup-info', popupInfo)


// 测试 自定义元素被移入新的 document
const testAdoptedCallback = ()=> {
  // 创建 iframe
  const createWindow = () => {
    let iframe = document.createElement('iframe')
    document.body.appendChild(iframe)
    return iframe.contentWindow
  }
  let cw = createWindow()
  // 创建 自定义元素
  let cw1 = document.querySelector('popup-info')

  // 创建的元素插入到 新创建的iframe
  cw.document.body.appendChild(cw1)
}

const move = () => {
  let move = document.querySelector('#move')
  move.onclick = function() {
    testAdoptedCallback()
  }
}
move()

// 测试移除 popup-info
const remove = () => {
  let remove = document.querySelector('#remove')
  remove.onclick = function() {
    document.querySelector('popup-info').remove()
  }
}
remove()

// 测试属性被修改 toggle
const toggle = () => {
  let i = 0
  let toggle = document.querySelector('#toggle')
  toggle.onclick = function() {
    i++
    document.querySelector('popup-info').setAttribute('role', `popup-info-change, ${i}`)
  }
}
toggle()



class popupInfo1 extends popupInfo {
  constructor() {
    super()
  }
  connectedCallback() {
    this.innerText = 'extends popupInfo'
  }
}

customElements.define('popup-info1', popupInfo1)


class popupButton extends HTMLButtonElement {
  constructor() {
    super()
  }
  connectedCallback() {
    this.innerText += ' extends'
  }
}

customElements.define('popup-button', popupButton, {extends: 'button'})

</script>
```

**定义新元素**

```js
class popupInfo extends HTMLElement {
  constructor() {
    super()
  }
  static get observedAttributes() {
    return ['role']
  }
  // 生命周期钩子
  connectedCallback() {
    // 创建 div
    let div = document.createElement('div')
    div.setAttribute('role', 'popup-info')

    // 创建 img
    let img = document.createElement('img')
    let src = this.getAttribute('img')

    // 创建info信息
    let info = document.createElement('span')
    let text = this.getAttribute('data-text')

    // 设置img内容
    img.src = src
    img.alt = text

    // 设置info内容
    info.classList.add('info')
    info.innerText = text

    // 添加class
    div.classList.add('popup-info')

    // 添加内容 img info
    div.appendChild(img)
    div.appendChild(info)

    this.appendChild(div)
  }
  disconnectedCallback() {
    console.log('我没有了呀')
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    console.log('当前的属性:', attrName)
    console.log('当前的属性 old:', oldVal)
    console.log('当前的属性 new:', newVal)
  }
  adoptedCallback() {
    console.log('adoptedCallback 自定义元素被移入新的 document')
  }
}

customElements.define('popup-info', popupInfo)

```

```html
<popup-info role="popup" img="https://miro.medium.com/max/1440/1*LjR0UrFB2a__5h1DWqzstA.png" data-text="I Learn Js 💗"></popup-info>

```

> 定义一个自定义的元素 然后使用

**扩展元素**

**扩展自定义元素**

customElements 全局性用于定义自定义元素

 customElements.define()，并使用 JavaScript class 扩展基础 HTMLElement

```js
class popupInfo1 extends popupInfo {
  constructor() {
    super()
  }
  connectedCallback() {
    this.innerText = 'extends popupInfo'
  }
}

customElements.define('popup-info1', popupInfo1)
```

继承自定义元素好像效果有点不对(我还没找到为啥 希望大佬教教我)

有关创建自定义元素的规则

- 自定义元素的名称必须包含短横线 (-)。因此，<x-tags>、<my-element> 和 <my-awesome-app> 等均为有效名称，而 <tabs> 和 <foo_bar> 则为无效名称....
- 您不能多次注册同一标记...
- 自定义元素不能自我封闭标签

> 教程里面更详细

和上面很相识, 扩展了自定义的元素

**扩展原生 HTML 元素**

```js
class popupButton extends HTMLButtonElement {
  constructor() {
    super()
  }
  connectedCallback() {
    this.innerText += ' extends'
  }
}

customElements.define('popup-button', popupButton, {extends: 'button'})
```
<img src="Building-Components-Custom-Elements-自定义元素/button.png" />


要扩展元素，您需要创建继承自正确 DOM 接口的类定义

扩展原生元素时，对 define() 的调用会稍有不同。所需的第三个参数告知浏览器要扩展的标记。

这很有必要，因为许多 HTML 标记均使用同一 DOM 接口

例如 section address 和 em（以及其他）都使用 HTMLElement；q 和 blockquote 则使用 HTMLQuoteElement；等等。

指定 {extends: 'blockquote'} 可让浏览器知道您创建的是 blockquote 而不是 q。有关 HTML DOM 接口的完整列表，请参阅 HTML 规范。



```js
class popupButton extends HTMLButtonElement {}

customElements.define('popup-button', popupButton)
```

**自定义元素响应**

自定义元素可以定义特殊生命周期钩子


|  名称   | 描述  |
| ---- | ---- |
| constructor | 创建或升级元素的一个实例。用于初始化状态、设置事件侦听器或创建 Shadow DOM... |
| connectedCallback | 元素每次插入到 DOM 时都会调用... |
| disconnectedCallback() | 	元素每次从 DOM 中移除时都会调用... |
| attributeChangedCallback(attrName, oldVal, newVal) | 属性添加、移除、更新或替换... |
| adoptedCallback(attrName, oldVal, newVal) | 自定义元素被移入新的 document... |

https://developers.google.com/web/fundamentals/web-components/customelements#extendhtml

https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_custom_elements#%E4%BD%BF%E7%94%A8%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%9E%E8%B0%83%E5%87%BD%E6%95%B0

> 上面写得很清晰 比我这个容易理解

```js
  // 生命周期钩子
  connectedCallback() {
    // 创建 div
    let div = document.createElement('div')
    div.setAttribute('role', 'popup-info')

    // 创建 img
    let img = document.createElement('img')
    let src = this.getAttribute('img')

    // 创建info信息
    let info = document.createElement('span')
    let text = this.getAttribute('data-text')

    // 设置img内容
    img.src = src
    img.alt = text

    // 设置info内容
    info.classList.add('info')
    info.innerText = text

    // 添加class
    div.classList.add('popup-info')

    // 添加内容 img info
    div.appendChild(img)
    div.appendChild(info)

    this.appendChild(div)
  }
```

dom创建时候 创建内容

```js
...
  disconnectedCallback() {
    console.log('我没有了呀')
  }
  ...

  // 测试移除 popup-info
const remove = () => {
  let remove = document.querySelector('#remove')
  remove.onclick = function() {
    document.querySelector('popup-info').remove()
  }
}
remove()
```

dom 移除执行的方法 可以移除事件什么的

```js
...
  attributeChangedCallback(attrName, oldVal, newVal) {
    console.log('当前的属性:', attrName)
    console.log('当前的属性 old:', oldVal)
    console.log('当前的属性 new:', newVal)
  }
...
  // 测试属性被修改 toggle
const toggle = () => {
  let i = 0
  let toggle = document.querySelector('#toggle')
  toggle.onclick = function() {
    i++
    document.querySelector('popup-info').setAttribute('role', `popup-info-change, ${i}`)
  }
}
toggle()
```

需要注意的是，如果需要在元素属性变化后，触发 attributeChangedCallback()回调函数，你必须监听这个属性。这可以通过定义observedAttributes() get函数来实现，observedAttributes()函数体内包含一个 return语句，返回一个数组，包含了需要监听的属性名称：

```js

  static get observedAttributes() {
    return ['role']
  }

```

监听属性变化 调用的方法 比如 role="popup" 什么的

```js
...
  adoptedCallback() {
    console.log('adoptedCallback 自定义元素被移入新的 document')
  }
...

  // 测试 自定义元素被移入新的 document
const testAdoptedCallback = ()=> {
  // 创建 iframe
  const createWindow = () => {
    let iframe = document.createElement('iframe')
    document.body.appendChild(iframe)
    return iframe.contentWindow
  }
  let cw = createWindow()
  // 创建 自定义元素
  let cw1 = document.querySelector('popup-info')

  // 创建的元素插入到 新创建的iframe
  cw.document.body.appendChild(cw1)
}

const move = () => {
  let move = document.querySelector('#move')
  move.onclick = function() {
    testAdoptedCallback()
  }
}
move()
```

自定义元素被移入新的 document



**元素定义的内容**

```js
class popupInfo extends HTMLElement {
  constructor() {
    super()

  }
  connectedCallback() {
     this.innerHTML = "xxxxxx";
  }
}
```

以新内容覆盖元素的子项并非一种好的做法，因为这样做会不符合设想。
添加元素定义内容的更好做法是使用 shadow DOM，下一篇文章会写


```js
class popupInfoShadow extends HTMLElement {
  constructor() {
    super()

    let shadowRoot = this.attachShadow({mode: 'open'})
    shadowRoot.innerHTML = "<span>hello</span>"
  }

}

customElements.define('popup-info-shadow', popupInfoShadow)
```

<img src="Building-Components-Custom-Elements-自定义元素/shadow.png" />


**通过 template 创建元素**

```js
<info-template></info-template>

<template id="info-template">
  <style>
    p {
      color: red;
    }
  </style>
  <p>hello template</p>

</template>


<script>
class infoTemplate extends HTMLElement {
  constructor(){
    super()

    let shadowRoot = this.attachShadow({mode: 'open'})
    const t = document.querySelector('#info-template')
    const instance = t.content.cloneNode(true)
    shadowRoot.appendChild(instance)
  }
}

customElements.define('info-template', infoTemplate)
```

<img src="Building-Components-Custom-Elements-自定义元素/template.png" />

- 我们在 HTML 中定义新的元素：info-template
- 元素的 Shadow DOM 使用 template 创建
- 由于是 Shadow DOM，元素的 DOM 局限于元素本地
- 由于是 Shadow DOM，元素的内部 CSS 作用域限于元素内

**设置自定义元素样式**

```css
<style>
p {
  ...
}
</style>
```
:defined CSS 伪类 表示任何已定义的元素。这包括任何浏览器内置的标准元素以及已成功定义的自定义元素 (例如通过 CustomElementRegistry.define() 方法)。

https://developer.mozilla.org/zh-CN/docs/Web/CSS/:defined

```css
app-drawer:not(:defined) {}
```

```html
<style>
info-template {
  color:red;
  opacity: 0;
}
aa-bb:not(:defined) {
  color:red;
  opacity: 0;
}
</style>

<info-template></info-template>
<info-template>123</info-template>

<aa-bb>123</aa-bb>
```

<img src="Building-Components-Custom-Elements-自定义元素/style.png" />


定义之前会隐藏起来哦

**其他详情**

未知元素与未定义的自定义元素

HTML 使用起来非常宽松和灵活。例如，在页面上声明 randomtagthatdoesntexist，浏览器将非常乐意接受它。为什么非标准标记可以生效？答案在于 HTML 规范允许这样。规范没有定义的元素作为 HTMLUnknownElement 进行解析。

自定义元素则并非如此。如果在创建时使用有效的名称（包含“-”），则潜在的自定义元素将解析为 HTMLElement。 您可以在支持自定义元素的浏览器中核实这一点。打开控制台：Ctrl+Shift+J（或者在 Mac 上，Cmd+Opt+J）并粘贴下列代码行：

```js
// "tabs" is not a valid custom element name
document.createElement('tabs') instanceof HTMLUnknownElement === true

// "x-tabs" is a valid custom element name
document.createElement('x-tabs') instanceof HTMLElement === true
```

**API 参考**

全局性 customElements 定义了处理自定义元素的方法。

**define(tagName, constructor, options)**

在浏览器中定义新的自定义元素。

```js
customElements.define('my-app', class extends HTMLElement { ... });
customElements.define(
  'fancy-button', class extends HTMLButtonElement { ... }, {extends: 'button'});
```

抽离出来可以更利于阅读


**get(tagName)**

```js
let Drawer = customElements.get('app-drawer');
console.log(Drawer)
if (Drawer) {
  let drawer = new Drawer();
}


let PopupInfo = customElements.get('popup-info');
console.log(PopupInfo)
if (PopupInfo) {
  let popupInfo = new PopupInfo();
}
```

在给定有效自定义元素标记名称的情况下，返回元素的构造函数。

如果没有注册元素定义，则返回 undefined。

<img src="Building-Components-Custom-Elements-自定义元素/get.png" />


**whenDefined(tagName)**

```js
customElements.whenDefined('popup-info').then(() => {
  console.log('popup-info ready!');
});

customElements.whenDefined('app-drawer').then(() => {
  console.log('app-drawer ready!');
}).catch(err => {
  console.log('err', err)
})
```
<img src="Building-Components-Custom-Elements-自定义元素/whenDefined.png" />

如果定义了自定义元素，则返回可解析的 Promise。如果元素已定义，则立即得到解析。

如果标记名称并非有效自定义元素名称，则拒绝(好像也不会走catch)

**历史记录和浏览器支持**

如果您最近几年持续关注网络组件，您应知道 Chrome 36+ 实施的自定义元素 API 版本使用了 document.registerElement() 而不是 customElements.define()。

但前者是标准的弃用版本，称为 v0。customElements.define() 成为现行标准并逐步获得各大浏览器厂商的支持。这称为自定义元素 v1。

https://developers.google.com/web/fundamentals/web-components/customelements

**浏览器支持**

要检测自定义元素功能，检测是否存在 window.customElements：

```js
const supportsCustomElementsV1 = 'customElements' in window;
```

<img src="Building-Components-Custom-Elements-自定义元素/in.png" />

**Polyfill**

https://www.npmjs.com/package/@webcomponents/custom-elements

注：无法对 :defined CSS 伪类执行 polyfill。 (没测试过)

```js
const supportsCustomElementsV1 = 'customElements' in window;
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}

if (!supportsCustomElementsV1) {
  loadScript('https://unpkg.com/@webcomponents/custom-elements')
  console.log('use polyfill')
} else {
  // Native support.Good to go.
  console.log('native')
}
```

总结:

自定义元素提供了一种新工具，可让我们在浏览器中定义新 HTML 标记并创建可重用的组件。
它们与 Shadow DOM 和 template 等新平台原语结合使用，我们可开始实现更多的可能

- 创建和扩展可重复使用组件的跨浏览器（网络标准）
- 无需库或框架即可使用。原生 JS/HTML 威武！
- 提供熟悉的编程模型。仅需使用 DOM/CSS/HTML。
- 与其他网络平台功能良好匹配（Shadow DOM、template、CSS 自定义属性等）
- 与浏览器的 DevTools 紧密集成。
- 利用现有的无障碍功能。
- (我也是复制的 2333)

https://developers.google.com/web/fundamentals/web-components/customelements

https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_custom_elements
