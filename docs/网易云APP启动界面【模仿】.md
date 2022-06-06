---
title: 网易云APP启动界面【模仿】
date: 2019-07-04 22:24:23
tags:
categories: 动效
---

第一次还原这样的效果吧(我真菜😢😢😢!!!), 完成度70-80%(叹气😕)

[项目地址](https://github.com/xiaotiandada/interest-page)

<!-- more -->


**预览**

<img width="300" src="网易云APP启动界面【模仿】/app1.png" />
<img width="300" src="网易云APP启动界面【模仿】/app2.png" />


### 素材

- [https://www.lottiefiles.com/](https://www.lottiefiles.com/) 我从这里找的,有源文件和JSON

### 工具
- 工具
  - AE
  - PS
  - PxCook

- Code
  - [lottie-web](https://github.com/airbnb/lottie-web)
  - webpack (辅助)

### 还原过程

#### 简单的适配

``` js
let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
let htmlDom = document.querySelector('html')
htmlDom.style.fontSize = htmlWidth / 10 + 'px'
```

其实适配的方法有很多种,个人比较懒就简单的搜哈先 下面给大家贴出了一些文章

- [https://www.imweb.io/topic/5a523cc0a192c3b460fce3a5](https://www.imweb.io/topic/5a523cc0a192c3b460fce3a5)
- [http://www.alloyteam.com/2016/03/mobile-web-adaptation-tool-rem/](http://www.alloyteam.com/2016/03/mobile-web-adaptation-tool-rem/)
- [https://segmentfault.com/a/1190000007526917](https://segmentfault.com/a/1190000007526917)

- [Google](https://www.google.com/)

手淘的方案也非常好,挺好用的 [https://github.com/amfe/lib-flexible](https://github.com/amfe/lib-flexible)

**Vant的方案**

``` js
// Rem 适配
// Vant 中的样式默认使用px作为单位，如果需要使用rem单位，推荐使用以下两个工具

// postcss-pxtorem 是一款 postcss 插件，用于将单位转化为 rem
// lib-flexible 用于设置 rem 基准值
// 下面提供了一份基本的 postcss 配置，可以在此配置的基础上根据项目需求进行修改

module.exports = {
  plugins: {
    'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 7']
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
```

> [https://youzan.github.io/vant/#/zh-CN/quickstart](https://youzan.github.io/vant/#/zh-CN/quickstart)

### 素材导出

**bodymovin**

- 使用Ae的插件bodymovin导出Json文件, 我们装上之后把一些用不到的元素按钮隐藏先. 教程靠大家自己[Google](https://www.google.com/)了

- 然后需要psd的可以在AE中导出(方法一样Google 233😏😏😏)

- icon可以在PSD导出, 然后尺寸什么的在PxCook Ps了吗标注,量尺寸什么的,甚至在在线的标注工具标记(方法很多🤨🤨🤨)

### 使用Lottie

```js
npm install lottie-web

lottie.loadAnimation({
  container: element, // the dom element that will contain the animation
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'data.json' // the path to the animation json
});
```

基本的使用还是很简单的👨🏻‍💻


我们可以看见下面有时间轴, 可以看到动画时长什么的,然后我根据这个还原出来的效果不尽人意,(自己太菜 慢慢学习怎么还原这样的稿吧🙁🙁🙁)

![](网易云APP启动界面【模仿】/1.png)
> 查看动画时间
```css
  animation: logo-button-bottom 1.5s;
  animation-fill-mode: forwards;
```
![](网易云APP启动界面【模仿】/2.png)
> 查看效果执行
```css
@keyframes logo-button-bottom {
  0% {
    transform: translate(-50%, 80/75rem);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}
```
![](网易云APP启动界面【模仿】/3.png)
> 查看效果的动画曲线

```css
animation: logo-button-bottom 1.5s ease-out;
```

大概就是这么多了吧... ... 看了看 垃圾文章无疑了 2333

开了个Qq群，大家也可以进来互相交流~ iD 718639024
