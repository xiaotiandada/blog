---
title: Echarts系列之复制粘贴大法
date: 2018-12-17 20:33:08
tags:
categories: '我还不知道分类为什么'
---

# Echarts 系列之复制粘贴大法

> 最近在耍 Echarts 稍微有点小经验，写(熬)篇文章记录一下下~
>
> 话不多说，直接开始(开始复制粘贴) hhhhh~~
>
> 开发中也有找类似的图表直接修改 附上链接
> [官方链接](http://echarts.baidu.com/examples/#chart-type-pie) > [社区-GALLERY](http://gallery.echartsjs.com/explore.html#sort=rank~timeframe=all~author=all)
>
> [仓库地址](https://github.com/xiaotiandada/Case) [预览地址](https://xiaotiandada.github.io/Case/Echarts/) [文章地址](https://xiaotiandada.github.io/2018/12/17/Echarts%E7%B3%BB%E5%88%97%E4%B9%8B%E5%A4%8D%E5%88%B6%E7%B2%98%E8%B4%B4%E5%A4%A7%E6%B3%95/#more)

<!-- more -->

## 饼图

### Doughnut Chart

> [链接](http://www.echartsjs.com/examples/editor.html?c=pie-doughnut)

<div align='center'>
  <img width="360px" src='Echarts系列之复制粘贴大法/DoughnutChart.png' />
</div>

官方给出了 demo 其实也还挺好看的，只是不适合直接放在业务里面(需要变变色，变色大小什么的)

让我们一步步改造他吧。

```js
let json = {
  ...
   legend: {
     ...
    icon: "circle",  // legend icon形状 也可以自定义
  },
  series: [{
    name: "甜甜圈",
    type: "pie",
    radius: ["30%", "60%"], // 'radius' 扇区圆心角展现数据的百分比，半径展现数据的大小。
    center: ["50%", "50%"], // 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
    color: ["#1976D2", "#2196F3", "#03A9F4"], // 颜色
    ...
  }]
}
```

<div align='center'>
  <img width="360px" src='Echarts系列之复制粘贴大法/DoughnutChart1.png' />
</div>

> 是不是很简单！感觉都没什么好写的 23333(继续改，后面使用上面的 json)。
>
> [仓库地址](https://github.com/xiaotiandada/Case)
>
> 有时候会遇到这种空心圆中间放 icon 图片的时候 于是就有下图

<div align='center'>
  <img width="360px" src='Echarts系列之复制粘贴大法/DoughnutChart2.png' />
</div>

```js
let json = {
  ...
    // graphic 是原生图形元素组件。可以支持的图形元素包括：
    // image, text, circle, sector, ring, polygon, polyline, rect, line, bezierCurve, arc, group,
   graphic: {
    type: "image",
    left: "center",  // 位置
    top: "center",   // 位置
    style: {
      image: "chartsGraphic.png",  // 路径
      width: 100,                  // 宽高
      height: 100
    }
  },
  ...
}
```

[文档地址](http://www.echartsjs.com/option.html#graphic)

继续复制粘贴 emmmm

如果很多个标题，设计稿放在两边！ （xiaochangmian）

<div align='center'>
  <img width="360px" src='Echarts系列之复制粘贴大法/DoughnutChart3.png' />
</div>

```js
let json = {
  ...
  // 将legend 变成数组形式，左右各一个
    legend: [{
      x: "left",
      itemGap: 30,
      icon: "circle",
      data: []      // 里面存放名字
    },
    {
      x: "right",
      itemGap: 30,
      icon: "circle",
      data: []   // 里面存放名字
    }
  ],
  ...
}

// 我自己写了一个方法存进去，可供参考
// 传入数据和 json 配置
// 数字可以抽离出来，大家可以自行改造(或者取长度/2 需要算上单数情况)
function setChartsAreaLength(areaName, json) {
let arr1 = [],
arr2 = [];
areaName.map((item, index) => {
index < 8 ? (arr1 = [...arr1, item]) : (arr2 = [...arr2, item]);
});
json.legend[0].data = arr1;
json.legend[1].data = arr2;
}

```

### Referer of a website

于是继续搞

这个同第一个 改改颜色就好了 然后隐藏标线和文字

<div align='center'>
  <img width="360px" src='Echarts系列之复制粘贴大法/DoughnutChart4.png' />
</div>

```js
let json = {
  ...
   series: [{
    data: [],
    label: {
      show: false // 是否显示标示文字
    },
    labelLine: {
      show: false // 是否显示视觉引导线
    }
  }]
  ...
};
```

### Nested Pies

> 嵌套饼图

<div align='center'>
  <img width="360px" src='Echarts系列之复制粘贴大法/DoughnutChart5.png' />
</div>

```js
let json = {
  ...
  // 将legend 变成数组形式，左右各一个
    legend: [{
      data: ['白天', '晚上']
    },
    {
      data: ['上班', '游戏', '休息']
    }
  ],
   series: [{
      radius: [0, '36%'],    // 饼图大小  内饼图 从0-36%
      data: [{
          value: 12,
          name: '白天',
        },
        {
          value: 12,
          name: '晚上'
        }
      ]
    },
    {
      name: '分类',
      type: 'pie',
      radius: ['44%', '72%'],  // 饼图大小  内饼图 从44%-75%
      data: [{
          value: 335,
          name: '上班'
        },
        {
          value: 310,
          name: '游戏'
        }, {
          value: 300,
          name: '休息'
        }
      ]
    }
  ]
  ...
}
```

> 2018-12-24 更

嵌套饼图有时候可能文字需要在图表上面,让我们一起来改造改造

<div align='center'>
  <img width="360px" src='Echarts系列之复制粘贴大法/DoughnutChart6.png' />
</div>

```js
let json = {
  ...
  // 配置和上一个饼图一模一样
   series: [{
     label: {
        show: true,            // 显示折线文字(好像默认显示)
        color: '#fff',        // 文字颜色
        position: 'inside'    // 显示位置
      },
      labelLine: {
        show: false          // 内饼图文字在图上方 不需要折线
      },
    },
    {
    label: {
          show: true,       // 同上
          color: '#fff'
        },
        labelLine: {
          show: true,       // 需要折线(可自行扩展)
        },
      }
  ]
  ...
}

```

> 大家也可以自行发挥，我看社区里面的大佬发的饼图非常强大也很好看，开发中都可以直接拿过去用(节省开发时间)hhh,
> 后面我还会继续更新这篇文章的，目前在公司一直都是 jq 所以这些都是原生的，后面也会出 Vue Or React 里面使用的(hhh)

如果阅读中，有什么不明白的 可以问我，也可以去群里交流

Qq：952822399

Qq 群 iD 718639024

大家也可以进来互相交流~

最后就是厚脸皮的一步(觉得不错可以点个 star 哦~~~) [仓库地址](https://github.com/xiaotiandada/E-video)

同时也欢迎 Pr 帮我修复不正确的地方！！
