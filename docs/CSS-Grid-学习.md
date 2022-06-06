---
title: CSS Grid 学习
date: 2020-08-06 00:28:58
tags:
categories: css
---

[CSS Grid 网格布局教程 ](https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html) 

[写给自己看的display: grid布局教程](https://www.zhangxinxu.com/wordpress/2018/11/display-grid-css-css3/)

<!-- more -->

练习时候顺便敲的 就顺带贴进来了~

```html
  <!-- https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html -->
  <div class="item">
    <div>
      <p>1</p>
    </div>
    <div>
      <p>2</p>
    </div>
    <div>
      <p>3</p>
    </div>
    <div>
      <p>4</p>
    </div>
    <div>
      <p>5</p>
    </div>
    <div>
      <p>6</p>
    </div>
    <div>
      <p>7</p>
    </div>
    <div>
      <p>8</p>
    </div>
    <div>
      <p>9</p>
    </div>
  </div>
```

```css
.item {
  display: grid;
  /* grid-template-columns: repeat(auto-fill, 100px); */
  /* grid-template-columns: 1fr 2fr; */
  /* grid-template-columns: 1fr 1fr minmax(100px, 1fr); */
  /* grid-template-columns: 100px auto 100px; */
  /* grid-template-rows: repeat(3, 33.33%); */
  /* grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4]; */
  /* grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4]; */
  /* grid-template-columns: 70% 30%; */
  /* grid-template-columns: repeat(12, 1fr); */
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  /* column-gap: 20px; */
  /* row-gap: 20px; */
  grid-template-areas:
    'a b c '
    'd e f '
    'g h i';
  /* grid-template-areas:
    'a a a'
    'b b b'
    'c c c'; */
  /* grid-template-areas: "header header header"
    "main main sidebar"
    "footer footer footer"; */
  /* grid-template-areas: 'a . c'
    'd . f'
    'g . i'; */
  /* grid-auto-flow: row; */
  /* grid-auto-flow: row dense; */
  place-content: center;
}

.item>div {
  /* justify-content: center; */
  /* align-items: center; */
  display: grid;
  place-items: center center;
  /* justify-self: center; */
  /* align-self: center; */
  place-self: center;
}

.item div:nth-child(1) {
  background-color: red;
  /* grid-column-start: 1; */
  /* grid-column-end: 3; */
  grid-column-start: span 2;
  grid-area: e;
}

.item div:nth-child(2) {
  background-color: rgb(65, 107, 175);
  /* grid-column-start: 1; */
  /* grid-column-end: 3; */
}

.item div:nth-child(3) {
  background-color: rgb(81, 231, 81);
}

.item div:nth-child(4) {
  background-color: rgb(88, 23, 107);
}

.item div:nth-child(5) {
  background-color: rgb(50, 179, 129);
}

.item div:nth-child(6) {
  background-color: rgb(24, 70, 52);
}

.item div:nth-child(7) {
  background-color: rgb(175, 65, 133);
}

.item div:nth-child(8) {
  background-color: rgb(109, 110, 117);
  /* grid-column-start: 2; */
  /* grid-row-start: 4; */
}

.item div:nth-child(9) {
  background-color: rgb(161, 134, 69);
  /* grid-row-start: 5; */
  /* grid-column-start: 3; */
}
```

未完待续...