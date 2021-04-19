---
title: toString(36)
date: 2020-05-29 23:02:07
tags: Javascript
categories: Javascript
---

## 序

在某个开源项目里面发现一个随机生成 ID 的方法, 于是好奇的搜了搜, 发现一篇写的不错的文章!!!

<!-- more -->

[文章地址](http://dongjunhui.com/archives/98/)



## 方法源码

```javascript
Math.random().toString(36).substr(2, 9);
```

这个方法会返回一串随机的 ID ``adp1r8xh7`` 类似于这样的

## HackMD

在 HackMD 里面(一款很好用的在线编辑工具) 在上传的时候会有个占位 Tag

```
![Uploading file..._unv0ukdwd]()
```

``_unv0ukdwd`` 这个 ID 就是随机生成的!!! 

## Ant Design

分享给群友的时候, 群友提到 antd 里面也用到了了

[Select选择器](https://ant.design/components/select-cn/#header)

```javascript
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
```

因为是从 10 开始循环的 所以结果是从 A-Z 

## 测试

```javascript
for (let i = 0; i < 36; i++) {
  console.log(i, i.toString(36))
}

0 "0"
1 "1"
2 "2"
3 "3"
4 "4"
5 "5"
6 "6"
7 "7"
8 "8"
9 "9"
10 "a"
11 "b"
12 "c"
13 "d"
14 "e"
15 "f"
16 "g"
17 "h"
18 "i"
19 "j"
20 "k"
21 "l"
22 "m"
23 "n"
24 "o"
25 "p"
26 "q"
27 "r"
28 "s"
29 "t"
30 "u"
31 "v"
32 "w"
33 "x"
34 "y"
35 "z"
undefined
```

上面是测试结果

0-9 输出了 0-9 

10-35 输出了 a-z

36 为 undefined 

``如果转换的基数大于10，则会**使用字母**来表示大于9的数字，比如基数为16的情况，则使用a到f的字母来表示10到15。`` 复制文章的文字



## End

在一些简单的随机数生成或者demo展示的时候这个方法应该还是挺好用的

