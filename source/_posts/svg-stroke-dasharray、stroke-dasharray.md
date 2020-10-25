---
title: svg stroke-dasharray、stroke-dasharray
date: 2020-03-15 00:45:54
tags:
---

svg stroke-dasharray、stroke-dasharray的学习 [京东零售设计服务平台](https://jdrd.jd.com/home/scene.html)在这里看到一个按钮 里面用到了这两个属性 于是找了资料学习一下

<!-- more -->

## 资料

[SVG学习之stroke-dasharray 和 stroke-dashoffset 详解](https://www.cnblogs.com/daisygogogo/p/11044353.html)

> 这片文章我觉得讲得很不错 👍

<iframe height="265" style="width: 100%;" scrolling="no" title="svg stroke" src="https://codepen.io/xiaotiandada/embed/RwPMmbJ?height=265&theme-id=dark&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/xiaotiandada/pen/RwPMmbJ'>svg stroke</a> by xiaotiandada
  (<a href='https://codepen.io/xiaotiandada'>@xiaotiandada</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


```html
  <svg id="line">
    <line x1="30" y1="30" x2="300" y2="30" stroke="red" stroke-width="20" stroke-dasharray="300"></line>
  </svg>

  <svg id="circle" width="200" height="200">
    <circle cx="100" cy="100" r="50" stroke="red" stroke-width="5" fill="green"></circle >
  </svg>

  <svg id="box">
    <polyline points="0,20 0,0, 100,0, 100,20" stroke="red" stroke-width="1"></polyline>
    <polyline points="0,20 0,40, 100,40, 100,0" stroke="red" stroke-width="1"></polyline>
  </svg>
```

```css
    #line {
      stroke-dashoffset: 300
    }
    #line:hover {
      stroke-dashoffset: 0;
    }
    #line line {
      transition: all .3s;
    }


    #circle circle {
      transition: all .3s;
      stroke-dasharray: 314;
      stroke-dashoffset: 314;
    }


    #circle:hover circle {
      stroke-dashoffset: 0;
    }


    #box polyline {
      fill: transparent;
      stroke-dasharray: 360;
      stroke-dashoffset: 360;
      transition: all .3s;
    }
    #box:hover polyline {
      stroke-dashoffset: 0;
    }
```

下面是jd的按钮style

![](https://i.loli.net/2020/03/15/NF6PYDKMVjc94wQ.png)

**鼠标经过**

![](https://i.loli.net/2020/03/15/rCfWLetIsdH7Ax3.png)

>  我在这个[cui](https://github.com/xiaotiandada/cui)项目里面也写了一个这个效果的小组件 具体可以自己查看 🍑