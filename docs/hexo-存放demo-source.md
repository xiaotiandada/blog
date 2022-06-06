---
title: hexo 存放demo source
date: 2019-09-24 13:17:57
tags:
categories:
- [hexo]
- [gulp]
---


开始自己想找个地方存放自己的文章demo,开了一个仓库感觉懒得维护,直接放进文件价里面又会被build编译

然后搜了一个好像没有什么好的方案,自己想了一个'野路子'(gulp)

使用简单的gulp命令就能解决这个需求!!!💗

https://www.gulpjs.com.cn/

## 安装
```bash
npm install --save-dev gulp
```

## 写 gulpfile.js

```js
const { src, dest } = require('gulp');

exports.default = function() {
  console.log('copy blog_source')
  return src('blog_source/**/*')
    .pipe(dest('.deploy_git/blog_source'));
}
```

我只需要吧存放demo的文件夹全部copy过去不就好了吗!!!(机智)

## 修改原来的推送

```bash
# old
hexo g -d

# now
"scripts": {
    "gd": "hexo g -d && gulp"
},

yarn gd
```

先执行原来的命令,然后执行gulp(完事) 这样大家需要demo也可以直接去仓库里面查看或者下载😄