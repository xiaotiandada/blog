---
title: vue优化记录
date: 2019-11-21 12:48:47
tags:
---


1.看别人怎么优化的
2.看chrome提示怎么优化


```js
const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminMozjpeg = require('imagemin-mozjpeg')

// 图片优化
new ImageminPlugin({
  test: /\.(jpe?g|png|gif)$/i,
  plugins: [
    imageminMozjpeg({
      disable: process.env.NODE_ENV !== 'production',
      quality: '65-80',
      progressive: true
    })
  ]
})
```


[提取 CSS 到单个文件-简单的方法](https://vue-loader-v14.vuejs.org/zh-cn/configurations/extract-css.html)

# 首页

**performance 30**
**Accessibility 78**
**BestPractices 79**
**SEO 100**

# performance

**performance 30!**

## Serve images in next-gen formats
Image formats like JPEG 2000, JPEG XR, and WebP often provide better compression than PNG or JPEG, which means faster downloads and less data consumption. Learn more.

修改了png, 使用[webp](https://developers.google.com/speed/webp/) 利用photoshop插件保存图片

**performance 35!**

## Serve images in next-gen formats(不提示)

> 但是由于兼容问题, 这里炸了 哈哈哈哈哈哈哈哈😂

... 等待后续