---
title: 让Mocha支持es6语法
date: 2020-07-08 18:23:34
tags:
---

因为 Mocha 默认支持 commonJS

参考资料 https://greenfavo.github.io/blog/docs/02.html

<!-- more -->

如果直接引入 import 会报错, 这让 写 es 语法的时候无法通过 import 来直接测试

这里借助 babel 转换	

定义 **scripts** 运行 **test** Mocha 会自动执行 test 目录的测试代码

```javascript
"scripts": {
  "test": "mocha",
}
```

为了支持es6语法，加上以下代码

```javascript
"scripts": {
  "test": "mocha --require babel-register --bail",
}
```

安装依赖

```bash
npm install babel-register  babel-preset-env -D
```

新建 **.babelrc** 

```json
{
  "presets": [
    ["env"]
  ]
}
```

babel会自动读取`.babelrc`配置文件，这样就让我们的Mocha代码支持es6的模块系统和es6的其他语法了

运行

```bash
npm run test
```

Mocha配置说明 (纯复制

>Mocha的两个配置--require和--bail,官方文档是这样说的：
>
>–require
>
>The –require option is useful for libraries such as should.js, so you may simply –require should instead of manually invoking require(‘should’) within each test file.
>
>意思是--require和在代码里手动require('babel-register')一样，但写在配置里会作用到每个test文件。默认支持.es .js .jsx扩展名. 老版本的Mocha使用--compilers命令支持其他文件扩展名，但在4.0后就废弃掉了。
>
>–bail
>
>Only interested in the first exception? use –bail!
>
>--bail可以在第一个异常抛出的时候停止运行测试,这对集成测试很重要。
>
>About Babel
>
>If your ES6 modules have extension .js, you can npm install –save-dev babel-register and use mocha –require babel-register; –compilers is only necessary if you need to specify a file extension.
>
>babel-register可以让Mocha支持ES6 module，就是import export 写法.
>
>babel-preset-env在没有任何配置选项的情况下，与 babel-preset-latest（或者babel-preset-es2015，babel-preset-es2016和babel-preset-es2017一起）的行为完全相同。官方推荐使用babel-preset-env.

