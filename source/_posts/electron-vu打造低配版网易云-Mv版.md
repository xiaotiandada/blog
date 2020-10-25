---
title: electron-vu打造低配版网易云(Mv版)
date: 2018-10-03 01:01:12
tags:
categories: electron
---

# 前言

[仓库地址](https://github.com/xiaotiandada/E-video)

想体验一下写桌面程序，所以使用electron,然后为了快速开发 选择了electron-vue.

找了一些Api 最后发现还是网易云的Api比较好使，然后很多大佬写了网易云音乐了，所以我就走一波歪路~~

最后就是开干，上键盘一梭哈(尽量少写文字，节省大家阅读时间)。

<!-- more -->


![梭哈](electron-vu打造低配版网易云-Mv版/e11.jpg)


# 技术栈

> 核心用到的东西

## electron-vue
[electron-vue](https://github.com/SimulatedGREG/electron-vue) - 基于 vue (基本上是它听起来的样子) 来构造 electron 应用程序的样板代码。

## element

[element](http://element.eleme.io/#/zh-CN) - Element，一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库.

## axios

[axios](https://github.com/axios/axios) - 基于Promise的HTTP客户端，用于浏览器和node.js(Google 自动翻译，这个大家都懂).

## vue-dplayer

[vue-dplayer](https://github.com/MoePlayer/vue-dplayer) - 基于DPlayer的Vue 2.x视频播放器组件.

## Api

[网易云音乐Node.js API服务](https://github.com/Binaryify/NeteaseCloudMusicApi) - 网易云音乐Node.js API服务(我是部署在自己服务器上面了).

# 界面展示

![1](electron-vu打造低配版网易云-Mv版/e1.png)
![2](electron-vu打造低配版网易云-Mv版/e2.png)
![3](electron-vu打造低配版网易云-Mv版/e3.png)

界面很简单，展示Mv然后可以播放，评论会以弹幕的形式显示出来

> (弹幕处理得不太好，而且写了很久才写了这么点界面 哎o(︶︿︶)o 唉).

# 完成进度

- [x] 基本页面展示
- [x] 自定义状态栏 支持放大、缩小、关闭
- [x] 播放Mv 请求点击的Mv然后播放视频
- [x] 显示弹幕 评论转换弹幕显示
- [x] 切换页面 上一页、下一页、首页、尾页
- [ ] 弹幕处理的不好
- [ ] 没有性能优化
- [ ] 没有分离组件
- [ ] 打包没有处理icon(懒~~)
- [ ] 忘记了...娱乐项目 没有注意很多 随缘随缘

# 技术实现

> 技术实现过程和一些踩过的坑

## 自定义状态栏

因为win自带的状态栏太丑了，所以自己模拟了一个，electron-vue 通过 ipcMain 发送消息

[ipcMain](https://electronjs.org/docs/api/ipc-main#ipcmain) - 从主进程到渲染进程的异步通信。

> ipcMain模块是EventEmitter类的一个实例。 当在主进程中使用时，它处理从渲染器进程（网页）发送出来的异步和同步信息。 从渲染器进程发送的消息将被发送到该模块。 -- copy c & v

[参考文章](https://blog.csdn.net/liyangyang08/article/details/78608822?locationNum=7&fps=1)

1. 在 index.js 修改窗口大小.

[BrowserWindow](https://electronjs.org/docs/api/browser-window#winsetcontentsizewidth-height-animate) - 创建和控制浏览器窗口。

> 里面的参数自己可以看文档哦~

```js

 mainWindow = new BrowserWindow({
    height: 710,
    width: 1200,
    useContentSize: true,
    frame: false
  })

```

设置之后，有一个细节需要了解一下.

[可拖拽区](https://electronjs.org/docs/api/frameless-window) - 默认情况下, 无框窗口是 non-draggable 的..... (总之就是，你需要设置一下)

要使整个窗口可拖拽, 您可以添加 -webkit-app-region: drag 作为 body 的样式:
```css
<body style="-webkit-app-region: drag"></body>
```
请注意, 如果您已使整个窗口draggable, 则必须将按钮标记为 non-draggable, 否则用户将无法单击它们:

```css
button {
  -webkit-app-region: no-drag;
}
```
如果你设置自定义标题栏为 draggable, 你也需要标题栏中所有的按钮都设为 non-draggable。

> 详情可以看文档呢。

2. 模拟事件

参考文章里面有介绍到，流程大概就是这样。

```js

// 引入
const {ipcRenderer: ipc} = require('electron')

// 自定义事件
winMin () {
    ipc.send('window-min')
},
winEnlargeOrNarrow () {
    ipc.send('win-enlarge-or-narrow')
},
winClose () {
    ipc.send('window-close')
}

/**
 * 模拟 最小 放大 还原 关闭 事件
 * index.js 修改
 */
ipcMain.on('window-min', () => {
  mainWindow.minimize()
})
ipcMain.on('win-enlarge-or-narrow', () => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize()
  } else {
    mainWindow.maximize()
  }
})
ipcMain.on('window-close', () => {
  mainWindow.close()
})
```

> 不想写的话，可以复制粘贴我的一梭哈.

## 评论转弹幕

播放器提供了相应的接口，只需要获取评论转换相应的数据就可以了。

```js
transformComments (commentsArr) {}

dp.danmaku.draw({
   text: 'DIYgod is amazing',
   color: '#fff',
   type: 'top'
});
```
[源码地址](https://github.com/xiaotiandada/E-video/blob/master/src/renderer/view/index.vue)

## 其他

> 封装方法

```js
import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'http://123.207.60.132:3000',
    timeout: 1000
  })
}

-----------------

import Api from './Api'

export default {
  /**
   * 默认30条数据，可以自定义
   * @param limit
   * @returns {*}
   */
  getTopMv (limit = 30, offset = 0) {
    return Api().get(`/top/mv?limit=${limit}&offset=${offset}`)
  },
  getMvId (id) {
    return Api().get(`/mv?mvid=${id}`)
  },
  getMvComments (id) {
    return Api().get(`/comment/mv?id=${id}`)
  }
}

```
> 有的懒得打注释了， 不懂得可以问我哦

> 有更优化的方法也可以滴滴我

# 总结

因为纯粹是为了体验，所以没写很多功能(不要干死我hhhhh)

如果阅读中，有什么不明白的 可以问我，也可以去群里交流

Qq：952822399 

Qq群 iD 718639024

大家也可以进来互相交流~

最后就是厚脸皮的一步(觉得不错可以点个star哦~~~) [仓库地址](https://github.com/xiaotiandada/E-video)

同时也欢迎Pr 帮我修复不正确的地方！！


![比心](electron-vu打造低配版网易云-Mv版/e22.jpg)