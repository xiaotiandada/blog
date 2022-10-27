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

![image-20221027011615046](https://i.imgur.com/Ex6dZ2O.png)

![image-20221027014443748](https://i.imgur.com/lB2FLiA.png)

![image-20221027014513796](https://i.imgur.com/fk2yBAi.png)

#### 13丨webpack核心概念之plugins

![image-20221027014824132](https://i.imgur.com/u20S2Lo.png)

![image-20221027014901916](https://i.imgur.com/bS9ApY2.png)

![image-20221027014933799](https://i.imgur.com/D5CvFoe.png)

#### 14丨webpack核心概念之mode

![image-20221027015011643](https://i.imgur.com/MR68IoN.png)

![image-20221027015055654](https://i.imgur.com/6pS0RdL.png)

#### 15丨解析ES6和React JSX

```js
import React from 'react'
import ReactDOM from 'react-dom'

class Hello extends React.Component {
  render() {
    return <div>Hello {this.props.toWhat}</div>
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Hello toWhat="World" />)
```

```js
'use strict'

const path = require('path')

module.exports = {
  entry: {
    index: './src/index.js',
    search: './src/search.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
}
```

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

```json
  "devDependencies": {
    "@babel/core": "^7.19.6",
    "@babel/plugin-proposal-class-properties": "^7.18.6",
    "@babel/preset-env": "^7.19.4",
    "@babel/preset-react": "^7.18.6",
    "babel-loader": "^8.2.5",
    "webpack": "^5.74.0",
    "webpack-cli": "^4.10.0"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```



#### 16丨解析CSS、Less和Sass

![image-20221027115129916](https://i.imgur.com/75b0phe.png)

链式调用 从右到左

![image-20221027115336207](https://i.imgur.com/pApCNrP.png)

```js
'use strict'

const path = require('path')

module.exports = {
  entry: {
    index: './src/index.js',
    search: './src/search.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },
}
```

#### 17丨解析图片和字体

```js
import img from './file.png';

module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
};
```

file-loader 导入了，换了好几种字体都没成功...

```less
@font-face {
  font-family: 'SourceHanSerifSC-Heavy';
  src: url('./fonts/SourceHanSerifSC-Heavy.otf') format('tryetype');
}

body {
  font-family: 'SourceHanSerifSC-Heavy';
}
```

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: true,
            },
          },
        ],
      },
    ],
  },
};
```

```html
<img src="data:image/jpeg;base64....." />
```

#### 18丨webpack中的文件监听

![image-20221027143026278](https://i.imgur.com/KS2Ew7g.png)

![image-20221027143102316](https://i.imgur.com/i3eeNcv.png)

![image-20221027143137587](https://i.imgur.com/iJA4HWB.png)

#### 19丨webpack中的热更新及原理分析

- https://www.npmjs.com/package/webpack-dev-server
- https://github.com/webpack/webpack-dev-middleware

![image-20221027144403799](https://i.imgur.com/asvGC6l.png)

![image-20221027144530060](https://i.imgur.com/5nGsrWu.png)

![image-20221027144652357](https://i.imgur.com/XYH4g4Y.png)

#### 20丨文件指纹策略：chunkhash、contenthash和hash

![image-20221027150951865](https://i.imgur.com/2TwPH4h.png)

![image-20221027151036706](https://i.imgur.com/uE7ZktI.png)

![image-20221027151427395](https://i.imgur.com/ZAfcdGt.png)

JS 的文件指纹设置

设置 output 的 filename，使用[chunnkhash]  `[name][chunkhash:8].js`

CSS 的文件指纹设置

设置 MiniCssExtractPlugin 的 filename， 使用 [contenthash] `[name][commtenthash:8].css`

图片的文件指纹设置

`[name][hash:8].[ext]`

#### 21丨HTML 、CSS和JS代码压缩

