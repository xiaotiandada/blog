---
title: less循环
date: 2019-08-16 11:55:30
tags:
categories: Css
---

使用递归调用来循环

<!-- more -->

### less 编译前
```less
.loop(@n) when (@n > 0) {
  div:nth-of-type(@{n}){
    width: (@n*10px);
    height: 40px;
    background: red;
    margin: 10px;
    font-size: 12px;
  }
  .loop(@n - 1);
}

.loop(5);
```
### css 编译后
```css
div:nth-of-type(5) {
  width: 50px;
  height: 40px;
  background: red;
  margin: 10px;
  font-size: 12px;
}
div:nth-of-type(4) {
  width: 40px;
  height: 40px;
  background: red;
  margin: 10px;
  font-size: 12px;
}
div:nth-of-type(3) {
  width: 30px;
  height: 40px;
  background: red;
  margin: 10px;
  font-size: 12px;
}
div:nth-of-type(2) {
  width: 20px;
  height: 40px;
  background: red;
  margin: 10px;
  font-size: 12px;
}
div:nth-of-type(1) {
  width: 10px;
  height: 40px;
  background: red;
  margin: 10px;
  font-size: 12px;
}
```