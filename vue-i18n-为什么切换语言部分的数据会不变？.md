---
title: vue-i18n 为什么切换语言部分的数据会不变？
date: 2019-09-26 15:48:12
tags:
categories: 'vue'
---

**vue-i18n国际化在data中切换不起作用**

https://www.bbsmax.com/A/qVdep96p5P/

配置会写在另一篇文章里面!!


```
将this.$t() 写到了data属性里，切换语言不起作用

data是一次性生产的，你这么写只能是在 data 初始化的时候拿到这些被国际化的值，并不能响应变化。

官方的解决办法是，建议我们将表达式写到computed属性里，不要写到data里

copy⬆️

```

因为在 js 中的this.options只会在初始化的时候执行一次，它的数据并不会随着你本地 lang的变化而变化，所以需要你在lang变化的时候手动重设this.options。 -- copy

https://panjiachen.github.io/vue-element-admin-site/zh/guide/advanced/i18n.html

有些数据又不想写在computed里面怎么办???

解决方案

1. 刷新页面 (体验不太好
2. 写入computed
3. 通过监听locale重新赋值

```js
  watch: {
    '$i18n.locale'() {
      console.log(this.$i18n.locale)
      this.setContent() // 重新设置一下值
    }
  },
```