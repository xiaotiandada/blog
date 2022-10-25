<!-- Webpack -->

Babel 7 不需要 ts-loader。从 Babel 7 开始，ts-loader 是不必要的，因为 Babel 7 支持 TypeScript

- https://github.com/Microsoft/TypeScript-Babel-Starter
- https://stackoverflow.com/questions/38320220/how-to-setup-typescript-babel-webpack
- https://babeljs.io/docs/en/babel-preset-typescript
- https://devblogs.microsoft.com/typescript/typescript-and-babel-7/



#### Notes

#### 01丨课程介绍

![image-20221025120059984](https://i.imgur.com/6j8buUl.png)

#### 02丨内容综述

![image-20221025120209481](https://i.imgur.com/UYWRCHz.png)

![image-20221025120227550](https://i.imgur.com/IRk60n2.png)

#### 03丨为什么需要构建工具

![image-20221025120459282](https://i.imgur.com/Z4IFNRb.png)

#### 04丨前端构建演变之路

![image-20221025120539534](https://i.imgur.com/fF6Tcj7.png)

#### 05丨为什么选择webpack

![image-20221025120645148](https://i.imgur.com/WCYDI5O.png)

![image-20221025120703101](https://i.imgur.com/b4Fr0Rf.png)



- https://webpack.js.org/loaders/
- https://webpack.js.org/plugins/

#### 06丨初识webpack

![image-20221026004230452](https://i.imgur.com/K9meybw.png)

![image-20221026004300308](https://i.imgur.com/ZIC5Gb0.png)

![image-20221026004329388](https://i.imgur.com/60lbgMA.png)

只设定了 entry output

#### 07丨环境搭建：安装webpack

- NVM
- Node.js
- NPM



```bash
yarn init
yarn add webpack webpack-cli -D

./node_modules/.bin/webpack -v
webpack: 5.74.0
webpack-cli: 4.10.0
webpack-dev-server not installed
```

#### 08丨webpack初体验：一个最简单的例子

```bash
'use strict'

const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode: 'production',
}
```

```bash
import { helloworld } from './helloworld'

document.write(helloworld())
```

```bash
export function helloworld() {
  return 'Hello webpack'
}
```

#### 09丨通过npm script运行webpack

![image-20221026005943014](https://i.imgur.com/FdE982Y.png)

```bash
  "scripts": {
    "build": "webpack"
  },
```

#### 10丨webpack核心概念之entry用法

Entry 用来指定 webpack 的打包入口

![image-20221026010215258](https://i.imgur.com/stDzLZm.png)

![image-20221026010255896](https://i.imgur.com/Dm6ipqN.png)

#### 11丨webpack核心概念之output

 Output 用来告诉 webpack 如何将编译后的文件输出到磁盘

![image-20221026010419722](https://i.imgur.com/9Bx9rYa.png)

![image-20221026010438954](https://i.imgur.com/MFUl2gm.png)

#### 12丨webpack核心概念之loaders