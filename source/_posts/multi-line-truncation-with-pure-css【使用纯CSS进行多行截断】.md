---
title: multi-line-truncation-with-pure-css【使用纯CSS进行多行截断】
date: 2019-07-19 01:37:58
tags:
categories: Css
---

**搬砖系列**

[multi-line-truncation-with-pure-css](https://css-tricks.com/multi-line-truncation-with-pure-css/)

个人平时截断用的第三方库(为了兼容吧), -webkit-line-clamp 这个属性也不错!!!

下面是按照自己的理解来的2333

## 使用行高

比如一个元素 line-height: 1.4rem, 确保只显示三行. max-height 设置为 1.4rem * 3.

设置一个全局变量line-height

```css
html {
  --lh: 1.4rem;
  line-height: var(--lh);
}
```

## 设置最大高度

```css
.truncate-overflow {
  --max-lines: 3;
  max-height: calc(var(--lh) * var(--max-lines));
  overflow: hidden;
}
```
如果你不关心省略号，这可能就足够了

## 当你想显示省略号的东西时，剩下的技巧就出现了

如果`position: relative`在元素上设置，则可以将省略号放在右下角

```css
.truncate-overflow::before {
  content: "...";
  position: absolute;
  bottom: 0;
  right: 0;
}
```

## 当文本太短时，让我们掩盖省略号

制作一个与背后的背景相同的小盒子，并将其设置在省略号的顶部以覆盖它。我们可以用其他伪元素做到这一点：

```css
.truncate-overflow::after {
  content: "";
  position: absolute;
  right: 0; /* note: not using bottom */
  width: 1rem;
  height: 1rem;
  background: white;
}
```

https://css-tricks.com/multi-line-truncation-with-pure-css/

> 建议大家看原文吧,按照个人理解(后续有空会重写或者更新)