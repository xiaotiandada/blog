---
title: vue自定义滚动指令
date: 2019-10-21 10:48:56
tags:
categories: vue
---

[教程](https://cn.vuejs.org/v2/cookbook/creating-custom-scroll-directives.html)

教程写的很好, 我按照教程跑了一部分

**真实的示例：为级联动画使用一个自定义滚动指令**

这部分没有跑, 看了看directive里面的代码, 通过v-scroll里面的参数来进行判断的, 然后把toPath里面的参数传入进来,

我根据教程学习, 然后顺便添加了一个lodash throttle 来'节流'

## 创建一个vue demo
```
... ... 省略
```

新建一个directive.js

```js
import Vue from 'vue'
import throttle from "lodash/throttle";
Vue.directive('scroll', {
  inserted: (el, binding) => {
    let f = evt => {
      if (binding.value(evt, el)) {
        // eslint-disable-next-line no-console
        // console.log(8, binding.value(evt, el))
        // remove event
        window.removeEventListener('scroll', f)
      }
    }
    // listen event
    // use lodash/throttle call methods
    window.addEventListener('scroll', throttle(f, 300))
    // eslint-disable-next-line no-console
    console.log(el, binding)
  }
})

import "./directive"; // main.js 里面 import
```

在组件里面

```html
<HelloWorld v-scroll="handleScroll" class="box" msg="Welcome to Your Vue.js App"/>
````

可以是任何元素 使用 v-scroll="xxx"

```js
// ....
    handleScroll (evt, el) {
      // eslint-disable-next-line no-console
      console.log(19, evt, el, window.scrollY)
      // judeg window.scroll, execution TweenMax function
      if (window.scrollY > 50) {
        TweenMax.to(el, .3, {
          y: -10,
          opacity: 1,
          // eslint-disable-next-line no-undef
          ease: Sine.easeOut
        })
      }
      // to meet the conditions return true else return false
      return window.scrollY > 100
    }
// ...
```

```css
.box {
  opacity: 0;
  transition: 1.5s all cubic-bezier(0.39, 0.575, 0.565, 1);
  /* transform: translate3d(0, 10px, 0); */
}
```