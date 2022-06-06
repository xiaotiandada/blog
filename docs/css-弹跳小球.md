---
title: css 弹跳小球
date: 2019-10-27 22:08:23
tags:
categories: css
---

[资料](https://juejin.im/post/5d2e00315188255a0476ea51)

<!-- more -->

```html
  <div class="circle"></div>
  <div class="line"></div>
```

```css

    body {
      -webkit-box-reflect: below 0px -webkit-linear-gradient(transparent,transparent 50%, rgba(255,255,255,.6));
    }
    .circle {
      width: 100px;
      height: 100px;
      /* background: red; */
      background: radial-gradient(circle at 40% 0, red 60%, #104b63);
      border-radius: 50%;
      margin-top: 300px;
      margin-left: 300px;
      transform: translate(0, -200px);
      animation: circle 1.8s cubic-bezier(0.18, 0.89, 0.32, 1.28) infinite;
    }

    @keyframes circle {
      0% {
        transform: translate(0, -200px);
      }
      10% {
        transform: translate(0, -160px);
      }
      20% {
        transform: translate(0, -120px);
      }
      30% {
        transform: translate(0, -80px);
      }
      40% {
        transform: translate(0, -40px);
      }
      50% {
        transform: translate(0, 0);
      }
      60% {
        transform: translate(0, -40px) scale(1.13, 0.87);
      }
      70% {
        transform: translate(0, -80px) scale(0.87, 1.13);
      }
      80% {
        transform: translate(0, -120px) scale(1.05, 0.95);
      }
      90% {
        transform: translate(0, -160px) scale(0.98, 1.02);
      }
      100% {
        transform: translate(0, -200px);
      }
    }

    .line {
      height: 1px;
      width: 100%;
      background-color: #000;
    }
```

<p class="codepen" data-height="353" data-theme-id="dark" data-default-tab="css,result" data-user="xiaotiandada" data-slug-hash="VwwWVwg" style="height: 353px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="弹跳小球">
  <span>See the Pen <a href="https://codepen.io/xiaotiandada/pen/VwwWVwg">
  弹跳小球</a> by xiaotiandada (<a href="https://codepen.io/xiaotiandada">@xiaotiandada</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>