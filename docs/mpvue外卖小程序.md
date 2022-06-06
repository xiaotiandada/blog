---
title: mpvue外卖小程序
date: 2018-09-09 00:37:52
tags:
categories: mpvue
---


# 前言

首先说说为什么自己会想着写一个小程序emmmmmm 感觉没有为什么 就是想写了 我就干了~~~hhhhh

我就粗略看了一下小程序的官方文档和mpvue的文档 然后就开撸了。 

[项目仓库](https://github.com/xiaotiandada/takeaway) 欢迎start和pr哦~~

为了节省大家的宝贵时间，不废话 直接进入正题；

--- 



<!-- more -->

# 技术栈

## mpvue

[mpvue](http://mpvue.com/) 是一个使用 Vue.js 开发小程序的前端框架。框架基于 Vue.js......(可以看官网介绍~).

## iview weapp

[iview weapp ](https://weapp.iviewui.com/) 一套高质量的
微信小程序 UI 组件库.

# 界面展示

![mpvue](mpvue外卖小程序/mpvue1.png)
![mpvue](mpvue外卖小程序/mpvue2.png)
![mpvue](mpvue外卖小程序/mpvue3.png)
![mpvue](mpvue外卖小程序/mpvue4.png)
![mpvue](mpvue外卖小程序/mpvue5.png)

大概的界面就是这样(界面是模仿得饿了么 我也只会模仿点页面了hhhhh)

# 完成进度

- [x] 小程序的基本界面展示
- [x] 简单的购买流程
- [x] 使用全局状态保存部分数据
- [x] 使用Fly请求数据
- [x] 使用Easy-mock模拟数据
- [x] ......
- [ ] 没有数据库保存真实数据
- [ ] 没有根据多个数据渲染店和商品
- [ ] 没有做添加地址的数据校验等
- [ ] 订单页面还需要优化 折叠显示等
- [ ] 商家端还未开发
- [ ] ......

其实还有很多功能没写，因为这是刚开始上班没事做的时候撸的(所以兴趣才是最好的老师)，然后现在事情比较忙就可能先放下了 如果有大佬或者有时间的大佬可以帮忙完善或者pr emmm  你直接拿走再写也是可以的~

# 技术实现

技术实现过程和一些踩过的坑

## 界面

界面主要使用 iview weapp 组件库 然后 有一些组件库没有的自己原生写法来撸，这里还好没啥坑 但是在布局上面似乎有一个1px的问题 我好像没处理 不知道哪位大佬能发现 并且教我怎么解决~~ 单位主要使用小程序的rpx(很好用) 只需要根据iPhone6的尺寸来使用就可以了，详情可以看[官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html).

iview weapp input 似乎不能使用双向数据绑定，需要自己重新撸.

底部的tabBar我是用的json来配置的 省得自己写 方便

```json
tabBar: {
      color: '#6f6f6f',
      selectedColor: '#18a3ff',
      backgroundColor: '#ffffff',
      borderStyle: 'black',
      list: [
        {
          pagePath: 'pages/index/main',
          iconPath: 'static/img/wm.png',
          selectedIconPath: 'static/img/wms.png',
          text: '外卖'
        },
        {
          pagePath: 'pages/order/main',
          iconPath: 'static/img/dd.png',
          selectedIconPath: 'static/img/dds.png',
          text: '订单'
        },
        {
          pagePath: 'pages/shopp/main',
          iconPath: 'static/img/tj1.png',
          selectedIconPath: 'static/img/tj1s.png',
          text: '推荐'
        },
        {
          pagePath: 'pages/user/main',
          iconPath: 'static/img/user.png',
          selectedIconPath: 'static/img/users.png',
          text: '我的'
        }
      ]
    }
```

这块的话可能需要大家查看小程序的文档来配置，其实也简单 跟玩一样就配置的非常好看

可能最麻烦的也是很简单的一个坑 如何引入 其实iview weapp 官方文档写的很清楚了 但是只是大家不知道这么配置而已 我来扣个代码演示一下.

到 GitHub 下载 iView Weapp 的代码，将 dist 目录拷贝到自己的项目中。然后按照如下的方式使用组件，以 Button 为例，其它组件在对应的文档页查看：

```json
1. 添加需要的组件 在页面的 json 中配置（路径根据自己项目位置配置）
// 添加 config json
export default {
  config: {
    // 这儿添加要用的小程序组件
    usingComponents: {
      'i-button': '../../dist/button/index'
    }
  }
}

```

```html
2. 在 wxml 中使用组件
<i-button type="primary" bind:click="handleClick">这是一个按钮</i-button>
```

是不是很简单！！！ 没看明白的也可以看我的[github](https://github.com/xiaotiandada/takeaway)仓库哦~

界面这块大概就是这么多 也可能我写掉了 后续想起来我会更一下的hhhh(懒)


## mpvue

mpvue 新建页面需要重新 npm run dev 这个官方文档已经明确说明过了，由于一个页面只用重启一次 问题不大。

小程序的请求似乎不能用axios 所以使用了Fly 来代替，至于为什么 可以看github里面的[issues](https://github.com/Meituan-Dianping/mpvue/issues/109)

mpvue 支持小程序和vuejs的事件 详情可以[查看文档](http://mpvue.com/mpvue/#_13)

然后可能最坑的就是页面转跳了吧... 其实官方文档有写 [目前页面路径最多只能十层。](https://developers.weixin.qq.com/miniprogram/dev/api/ui-navigate.html#wxnavigatetoobject) 比如说我再添加地址的时候 使用了wx.navigateTo(OBJECT) 然后返回到地址的列表页面然后继续重复添加地址 到达一定的数量之后 就不会再跳转，而且返回的也是之前重复的页面 用户体验很不好 所以需要一个解决的办法。文字太多可能看不懂 我来画个图。

![mpvue](mpvue外卖小程序/mpvue6.png)

关于登录一块的话 我没有做什么处理 直接用新的用户信息接口就可以了

[小程序与小游戏获取用户信息接口调整](https://developers.weixin.qq.com/blogdetail?action=get_post_info&lang=zh_CN&token=1894828834&docid=0000a26e1aca6012e896a517556c01&idescene=6&devtools=1&idescene=6)

```html
<open-data type="groupName" open-gid="xxxxxx"></open-data>
<open-data type="userAvatarUrl"></open-data>
<open-data type="userGender" lang="zh_CN"></open-data>
```

# 总结

这样一总结下来感觉自己似乎没写多少功能Orz！！！

但是这篇文章可能是我写的文字最多的一篇了 如果大家觉得还不错的话可以点个喜欢哦~~ 蟹蟹o(∩_∩)o 哈哈

所以回到标题，兴趣才是最好的老师，接下面准备玩一玩electron-vue.....

写得好累，介绍的不多 可能有遗漏 但是大部分的核心基本上都已经说了，如果大佬们想找我交流的 ，可以加我QQ github 邮箱 都ojbk的

Qq：952822399 就留QQ吧 手指酸了emmmmm~~~~ 告辞 溜

新开了个Qq群，大家也可以进来互相交流~ iD 718639024
