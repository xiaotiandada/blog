---
title: CodeNote
date: 2019-04-14 16:49:16
tags:
categories: '我还不知道分类为什么'
---

![](CodeNote/code_note_banner.png)

<!-- more -->

### 正则

```js
// 判断字符串是否为数字
reg = /^[0-9]*$/;

// 判断字符串是否为数字 开头为1-9
reg = /^\+?[1-9][0-9]*$/;
reg.test('12323123123213213213')

// 小数点后三位 如果后面需要解除限制修改正则  {0,3}
value.match(/^\d*(\.?\d{0,3})/g)[0] || null;

```

[正则表达式 - 语法](http://www.runoob.com/regexp/regexp-syntax.html)
[正则表达式在线测试 常用正则表达式](https://c.runoob.com/front-end/854)


记录一些 CodeNote( 方便Copy ) 233~
