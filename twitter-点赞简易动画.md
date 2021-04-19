---
title: twitter 点赞简易动画
date: 2019-09-08 16:06:47
tags:
categories: css
---

## 资料

https://zhuanlan.zhihu.com/p/20486738
<img src="https://abs.twimg.com/a/1446542199/img/t1/web_heart_animation.png">

## GO

- 首先去twitter打开控制台下载png的素材
- 放入一个div
- 设置css 完事

## Js


```js
export default class Render {
  append(parent, dom){
    parent.append(dom)
  }
}


let render =  new Render()

let likeButton = document.createElement('div')
likeButton.classList.add('like-button')


render.append(document.querySelector('body'), likeButton)
```

## Css
```css
.like-button {
  width: 50px;
  height: 50px;
  background-position: left;
  background-image: url(https://abs.twimg.com/a/1446542199/img/t1/web_heart_animation.png);
  background-repeat:no-repeat;
  background-size:2900%;
  cursor: pointer;
  &:hover {
    background-position: right;
  }
}

.is-animating {
  animation: heart-burst .8s steps(28) 1 forwards;
}

@keyframes heart-burst { // 从左到右
  0%{
    background-position: left;
  }
  100%{
    background-position: right;
  }
}


```

鼠标经过png从 **background-position: left;** 到 **background-position: right;** 变色处理

通过单击添加 class 达到目的

**animation: heart-burst .8s steps(28) 1 forwards;** 分为steps 28 执行动画

## js

```js
likeButton.onclick = function() {
  let hasClass = likeButton.classList.contains('is-animating')
  if (!hasClass) likeButton.classList.add('is-animating')
}

likeButton.addEventListener('animationend', function() {
  let hasClass = likeButton.classList.contains('is-animating')
  if (hasClass) likeButton.classList.remove('is-animating')
}) // 根据情况处理
```
-- end ---