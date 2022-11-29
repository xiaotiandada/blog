<!-- Webpack -->

Babel 7 不需要 ts-loader。从 Babel 7 开始，ts-loader 是不必要的，因为 Babel 7 支持 TypeScript

- https://github.com/Microsoft/TypeScript-Babel-Starter
- https://stackoverflow.com/questions/38320220/how-to-setup-typescript-babel-webpack
- https://babeljs.io/docs/en/babel-preset-typescript
- https://devblogs.microsoft.com/typescript/typescript-and-babel-7/



- [webpack 系列一：最佳配置指北 #68](https://github.com/sisterAn/blog/issues/68)
- [玩转 webpack5（上）](https://heapdump.cn/article/3551616)
- [学习 Webpack5 之路（优化篇）- 近 7k 字](https://juejin.cn/post/6996816316875161637)
- [webpack5](https://github.com/HolyZheng/holyZheng-blog/issues/46)



#### Notes

webpack4

version: 4.31.0

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

HTML CSS JS 压缩



JS

内置了

- https://www.npmjs.com/package/uglifyjs-webpack-plugin

CSS

- https://www.npmjs.com/package/optimize-css-assets-webpack-plugin
- https://github.com/webpack-contrib/css-minimizer-webpack-plugin

HTML

- https://www.npmjs.com/package/html-webpack-plugin

#### 22丨自动清理构建目录产物

每次构建的时候不会清理目录，造成构建的输出目录 ouput 文件越来越多

```bash
rm -rf ./dist && webpack
rimraf ./dist && webpack
```

- https://www.npmjs.com/package/clean-webpack-plugin 一个用于删除/清理构建文件夹的 webpack 插件。 默认会删除 output 指定的输出目录

#### 23丨PostCSS插件autoprefixer自动补齐CSS3前缀

- https://github.com/postcss/postcss
- https://github.com/postcss/autoprefixer
- https://github.com/webpack-contrib/postcss-loader

```json
// package.json
"browserslist": {
    "production": [
      "last 2 version",
      ">0.2%"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version",
      "last 1 ie version"
    ]
  }
```

```js
// postcss.config.js
module.exports = {
  plugins: [require('autoprefixer')],
}
```

#### 24丨移动端CSS px自动转换成rem

- https://www.npmjs.com/package/px2rem-loader
- https://github.com/amfe/lib-flexible

![image-20221028114409511](https://i.imgur.com/4DFViXW.png)

![image-20221028114441932](https://i.imgur.com/1J8C5Wx.png)

![image-20221028114511058](https://i.imgur.com/Khvni0m.png)

#### 25丨静态资源内联

![image-20221028115300273](https://i.imgur.com/WSBDxZq.png)

![image-20221028115346229](https://i.imgur.com/oTD91v4.png)

![image-20221028115418689](https://i.imgur.com/w42pFDu.png)

- https://www.npmjs.com/package/html-inline-css-webpack-plugin
- https://www.npmjs.com/package/raw-loader
- https://webpack.js.org/guides/asset-modules/ webpack 5

#### 26丨多页面应用打包通用方案

**多页面应用（MPA）概念**

每一次页面跳转的时候，后台服务器都会给返回一个新的 html 文档，这种类型的网站也就是多页网站，也叫做多页应用。



**多页面打包基本思路**

每个页面对应一个 entry，一个 html- webpack- plugin

缺点：每次新增或删除页面需要改 webpack 配置



**多页面打包通用方案**

动态获取 entry 和设置 html- webpack- plugin 数量 利用 glob.sync

entry: glob.sync (path.join (_dirname, './src/*/index.js'),



- https://www.npmjs.com/package/glob



```js
'use strict'

const glob = require('glob')
const path = require('path')
// const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const setMPA = () => {
  const entry = {}
  const htmlWebpackPlugins = []

  //  '/Users/x/Code/Case/webpack/learn2/src/index/index.js',
  //  '/Users/x/Code/Case/webpack/learn2/src/search/index.js'
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))

  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index]

    const match = entryFile.match('/src/(.*)/index.js')
    const pageName = match && match[1]

    entry[pageName] = entryFile

    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [pageName],
      })
    )
  })

  return {
    entry,
    htmlWebpackPlugins,
  }
}

const { entry, htmlWebpackPlugins } = setMPA()

module.exports = {
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js',
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
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.less$/i,
        sideEffects: true,
        use: [
          // compiles Less to CSS
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
    // new webpack.HotModuleReplacementPlugin()
    new CleanWebpackPlugin(),
  ].concat(htmlWebpackPlugins),
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    hot: true,
  },
}
```

#### 27丨使用sourcemap

- https://juejin.cn/post/6960941899616092167

- https://webpack.js.org/configuration/devtool/#devtool





作用：通过 source map 定位到源代码

- source map 科普文：
- [JavaScript Source Map 详解](https://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)

开发环境开启，线上环境关闭

- 线上排查问题的时候可以将 sourcemap 上传到错误监控系统



**Source map 关键字**

- eval：使用 eval 包裹模块代码 

- source map：产生 .Map 文件 
- cheap：不包含列信息

- inline：将.Map 作为 DataURI 嵌入，不单独生成.Map 文件 
- module：包含 loader 的 sourcemap



![image-20221028151453409](https://i.imgur.com/A1fyYt8.png)



**default**

![image-20221028153252920](https://i.imgur.com/BgFCWnM.png)

  **devtool: 'source-map'**

![image-20221028152920605](https://i.imgur.com/df110u0.png)

**devtool: 'cheap-source-map',**

![image-20221028153142936](https://i.imgur.com/w3t7r6K.png)

#### 28丨提取页面公共资源

- https://www.npmjs.com/package/html-webpack-externals-plugin
- https://webpack.js.org/configuration/optimization/
- https://webpack.js.org/plugins/split-chunks-plugin/#splitchunksminsize



**基础库分离**

- 思路：将 react、react-dom 基础包通过 cdn 引入，不打入 bundle 中

- 方法：使用 html- webpack- externals-plugin



**利用 SplitChunksPlugin 进行公共脚本分离**



Webpack4 内置的，替代 CommonsChunkPlugin：插件 chunks 参数说明：

- async 异步引入的库进行分离（默认）

- initial 同步引入的库进行分离
- all 所有引入的库进行分离（推荐)



**利用 SplitChunksPlugin 分离基础包**

test：匹配出需要分离的包



**利用 SplitChunksPlugin 分离页面公共文件**

minChunks：设置最小引用次数为 2 次

minuSize：分离的包体积的大小 name: 'commons',



```js
{
  plugins: [
       new HtmlWebpackPlugin({
        template: path.join(__dirname, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        // chunks 不配置 'vendors', 'commons' 也讷讷个工作
        chunks: ['vendors', 'commons', pageName], 
      })
  ],
  optimization: {
    // minSize: 0 不生效，在 common 里面导入了 lodash 体积变大才功能打包出来
    minimizer: [new CssMinimizerPlugin()],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
  },
}
```

```bash
assets by info 753 KiB [immutable]
  assets by path *.js 689 KiB
    asset commons_b8135d34.js 528 KiB [emitted] [immutable] [big] (name: commons) (id hint: commons)
    asset vendors_dcd4109b.js 137 KiB [emitted] [immutable] (name: vendors) (id hint: vendor)
    asset search_b218e1ce.js 17.2 KiB [emitted] [immutable] (name: search)
    asset index_e3aea713.js 7.62 KiB [emitted] [immutable] (name: index)
  asset img_f48f97d1.jpeg 64 KiB [emitted] [immutable] [from: src/images/img.jpeg] (auxiliary name: search)
  asset search_6e9cebe1.css 123 bytes [emitted] [immutable] [minimized] (name: search)
assets by path *.html 844 bytes
  asset search.html 476 bytes [emitted]
  asset index.html 368 bytes [emitted]
Entrypoint index [big] 535 KiB = commons_b8135d34.js 528 KiB index_e3aea713.js 7.62 KiB
Entrypoint search [big] 682 KiB (64 KiB) = commons_b8135d34.js 528 KiB vendors_dcd4109b.js 137 KiB search_b218e1ce.js 17.2 KiB search_6e9cebe1.css 123 bytes 1 auxiliary asset
```

> 当 webpack 处理文件路径时，它们总是包含`/`在 Unix 系统和`\`Windows 上。这就是为什么必须使用`[\\/]`in`{cacheGroup}.test`字段来表示路径分隔符。`/`或`\`在`{cacheGroup}.test`跨平台使用时会导致问题。

#### 29丨treeshaking的使用和原理分析

- https://webpack.js.org/guides/tree-shaking/



**Tree shaking（摇树优化）**

概念：1 个模块可能有多个方法，只要其中的某个方法使用到了，则整个文件都会被打到 bundle 里面去，tree shaking 就是只把用到的方法打入 bundle，没用到的方法会在 uglify 阶段被擦除掉。

使用：webpack 默认支持，在。Babelrc 里设置 modules: false 即可

· production model 的情况下默认开启

要求：必须是 ES6 的语法，CJS 的方式不支持



> 摇树，顾名思义，就是将枯黄的落叶摇下来，只留下树上活的叶子。枯黄的落叶代表项目中未引用的无用代码，活的树叶代表项目中实际用到的源码。https://juejin.cn/post/6996816316875161637#heading-40



**DCE  (Elimination)**

代码不会被执行，不可到达代码执行的结果不会被用到代码只会影响死变量（只写不读）

```js
if (false) {
	console.log('这段代码永远不会执行')
}
```

**Tree- shaking 原理**

利用 ES6 模块的特点：

- 只能作为模块顶层的语句出现

- import 的模块名只能是字符串常量
- import binding 是 immutablel 的

代码擦除：uglify 阶段删除无用代码

#### 30丨ScopeHoisting使用和原理分析

![image-20221031232538654](https://i.imgur.com/adv6zTK.png)

**会导致什么问题？**

大量函数闭包包裹代码，导致体积增大（模块越多越明显）

运行代码时创建的函数作用域变多，内存开销变大

![image-20221031232641769](https://i.imgur.com/dlraHFg.png)

结论：

- 被 webpack 转换后的模块会带上一层包裹 
- import 会被转换成_ webpack_ require

**进一步分析 webpack 的模块机制**

![image-20221031232951481](https://i.imgur.com/TnLcfc6.png)



分析：

- 打包出来的是一个 IFE（匿名闭包）

- modules 是一个数组，每一项是一个模块初始化函数

- _ webpack. Require 用来加载模块，返回 module. Exports 
- 通过 WEBPACK_ REQUIRE_ METHOD (O）启动程序



**Scope hoisting 原理**

原理：将所有模块的代码按照引用顺序放在一个函数作用域里，然后适当的重命名一些变量以防止变量名冲突

对比：通过 scope hoisting 可以减少函数声明代码和内存开销

![image-20221031233341816](https://i.imgur.com/1Qup4B9.png)

**Scope hoisting 使用**

webpack mode 为 production 默认开启必须是 ES6 语法，CJS 不支持

- https://webpack.js.org/plugins/module-concatenation-plugin/

```
// 历史版本 3 可能需要手动配置
new webpack.optimize.ModuleConcatenationPlugin();
```

#### 31丨代码分割和动态import

- https://zhuanlan.zhihu.com/p/73325163



**代码分割的意义**

对于大的 Web 应用来讲，将所有的代码都放在一个文件中显然是不够有效的，特别是当你的某些代码块是在某些特殊的时候才会被使用到。webpack 有一个功能就是将你的代码库分割成 chunks（语块），当代码运行到需要它们的时候再进行加载。

适用的场景：

- 抽离相同代码到一个共享块

- 脚本懒加载，使得初始下载的代码更小

![image-20221031234314107](https://i.imgur.com/xN0KtZQ.png)



**懒加载 JS 脚本的方式**

CommonJS: require.ensure
ES6:动态import (目 前还没有原生支持，需要babel转换)

**如何使用动态 import?**

- 安装 babel 插件
- ES6:动态import ( 目前还没有原生支持，需要babel转换)
- https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import

**代码分割的效果**

![image-20221101003950592](https://i.imgur.com/cr9iRLz.png)

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import img from '../images/img.jpeg'
import '../../common/index'

import './index.css'
import './style.less'

class Hello extends React.Component {
  constructor() {
    super(...arguments)
    this.state = {
      Text: null,
    }
  }

  loadComponent() {
    import('./text.js').then((Text) => {
      this.setState({
        Text: Text.default,
      })
    })
  }

  render() {
    const { Text } = this.state
    return (
      <div>
        {Text ? <Text /> : null}
        Hello {this.props.toWhat}
        <p>汉字 watch devServer 12345678</p>
        <img src={img} onClick={this.loadComponent.bind(this)} />
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Hello toWhat="World" />)
```

发送一个 Jsonp 请求，`window[webpackJsonp]` 异步加载逻辑

新版本 webpack5 是 `(self["webpackChunkwebpack_learn"] = self["webpackChunkwebpack_learn"] || [])`

根据我的 package name 来的，`"name": "webpack-learn"`

![image-20221101004234265](https://i.imgur.com/W5QQCoz.png)

#### 32丨webpack和ESLint结合

- https://www.npmjs.com/package/eslint-config-airbnb
- https://www.npmjs.com/package/eslint-config-airbnb-base

![image-20221108021024587](https://i.imgur.com/AhNhf67.png)

![image-20221101005334648](https://i.imgur.com/s6NXBjB.png)

**ESL _int如何执行落地?**
和CI/CD系统集成
和webpack集成



![image-20221101005457333](https://i.imgur.com/yUqJfo7.png)

本地开发阶段增加 precommit 钩子

- husky https://www.npmjs.com/package/husky

**方案二: webpack 与ESLint集成**

- https://www.npmjs.com/package/eslint-loader  been deprecated
- https://www.npmjs.com/package/eslint-webpack-plugin
- https://esprima.org/
- https://www.npmjs.com/package/babel-eslint been deprecated
- https://www.npmjs.com/package/@babel/eslint-parser
- https://www.robinwieruch.de/webpack-eslint/
- https://webpack.js.org/plugins/eslint-webpack-plugin/

#### 33丨webpack打包组件和基础库

- https://www.npmjs.com/package/terser-webpack-plugin
- https://webpack.js.org/configuration/output/#outputlibrary

**webpack打包库和组件**

webpack除了可以用来打包应用，也可以用来打包js库

实现一个大整数加法库的打包

- 需要打包压缩版和非压缩版本
- 支持AMD/CJS/ESM模块引入



**如何将库暴露出去?**

library:指定库的全局变量

libraryTarget:支持库引入的方式



```js
  {
    entry: {
      'large-number': './src/index.ts',
      'large-number.min': './src/index.ts',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      library: {
        name: 'largeNumber',
        type: 'umd',
        export: 'default',
      },
    },
      optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          include: /\.min\.js$/,
        }),
      ],
    },
  }
```

```js
{
  "main": "index.js",
  "script": {
     "prepublish": "yarn run build:prod"
  }
}
```

#### 34丨webpack实现SSR打包（上）

![image-20221110020622305](https://i.imgur.com/67Zetvb.png)

**服务端渲染(SSR)是什么?**

渲染:HTML+csS+JS+Data-->渲染后的HTML

服务端:

- 所有模板等资源都存储在服务端
- 内网机器拉取数据更快
- 一个HTML返回所有数据

![image-20221110020929988](https://i.imgur.com/HUeD3Me.png)

![image-20221110020948219](https://i.imgur.com/aPdoNMQ.png)



**SSR的优势**

减少白屏时间

对于SEO友好

![image-20221110021033620](https://i.imgur.com/0qhncJb.png)

![屏幕快照 2022-11-10 上午2.11.05](https://i.imgur.com/uJehkyR.png)

#### 35丨webpack实现SSR打包（下）

**如何解决样式不显示的问题?**

- 使用打包出来的浏览器端htm|为模板
- 设置占位符，动态插入组件

**首屏数据如何处理?**

- 服务端获取数据
- 替换占位符

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <div id="root"><!--HTML_PLACEHOLDER--></div>
    <!--INSTALL_DATA_PLACEHOLDER-->
  </body>
</html>

```

```js
const express = require('express')
const fs = require('fs')
const path = require('path')
const { renderToString } = require('react-dom/server')

const template = fs.readFileSync(path.join(__dirname, '../dist/search.html'), 'utf-8')
const data = require('./data.json')
const SSR = require('../dist/search-server')

if (typeof self === 'undefined') {
  global.self = {}
}

const renderMarkUp = str => {
  const dataStr = JSON.stringify(data)
  return template
    .replace('<!--HTML_PLACEHOLDER-->', str)
    .replace(
      '<!--INSTALL_DATA_PLACEHOLDER-->',
      `<script>window.__install_data=${dataStr}</script>`
    )
}

const server = (port) => {
  const app = express()

  app.use(express.static('dist'))
  app.get('/search', (req, res) => {
    const html = renderToString(SSR)
    res.status(200).send(renderMarkUp(html))
  })

  app.listen(port, () => {
    console.log('Server is running on port: ', `http://localhost:${port}`)
  })
}

server(process.env.port || 3000)
```

```js
'use strict'
const glob = require('glob')
const path = require('path')
// const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const setMPA = () => {
  const entry = {}
  const htmlWebpackPlugins = []

  //  '/Users/xiaotian/Code/Case/webpack/learn2/src/index/index.js',
  //  '/Users/xiaotian/Code/Case/webpack/learn2/src/search/index.js'
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index-server.js'))

  // eslint-disable-next-line array-callback-return
  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index]

    const match = entryFile.match('/src/(.*)/index-server.js')
    const pageName = match && match[1]

    if (pageName) {
      entry[pageName] = entryFile

      htmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
          template: path.join(__dirname, `src/${pageName}/index.html`),
          filename: `${pageName}.html`,
          chunks: ['vendors', 'commons', pageName],
          minify: {
            removeComments: false
          }
        })
      )
    }
  })

  return {
    entry,
    htmlWebpackPlugins
  }
}

const { entry, htmlWebpackPlugins } = setMPA()

module.exports = {
  entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-server.js',
    library: {
      type: 'umd'
    },
    globalObject: 'typeof self !== \'undefined\' ? self : this',
    publicPath: ''

  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/i,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: ''
          }
        },
        'css-loader']
      },
      {
        test: /\.less$/i,
        sideEffects: true,
        use: [
          // compiles Less to CSS
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: ''
            }
          },
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    // new webpack.HotModuleReplacementPlugin()
    new CleanWebpackPlugin(),
    new ESLintPlugin()
  ].concat(htmlWebpackPlugins),
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    compress: true,
    hot: true
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2
        }
      }
    }
  }
}
```

- https://www.npmjs.com/package/ignore-loader

#### 36丨优化构建时命令行的显示日志

- https://www.npmjs.com/package/friendly-errors-webpack-plugin
- https://webpack.js.org/configuration/stats/



**当前构建时的日志显示.**

展示一大堆日志，很多并不需要开发者关注



**Stats Presets**

Webpack comes with certain presets available for the stats output:

| Preset              | Alternative | Description                                                  |
| :------------------ | :---------- | :----------------------------------------------------------- |
| `'errors-only'`     | *none*      | Only output when errors happen                               |
| `'errors-warnings'` | *none*      | Only output errors and warnings happen                       |
| `'minimal'`         | *none*      | Only output when errors or new compilation happen            |
| `'none'`            | `false`     | Output nothing                                               |
| `'normal'`          | `true`      | Standard output                                              |
| `'verbose'`         | *none*      | Output everything                                            |
| `'detailed'`        | *none*      | Output everything except `chunkModules` and `chunkRootModules` |
| `'summary'`         | *none*      | Output webpack version, warnings count and errors count      |



**如何优化命令行的构建日志**

使用friendly-errors-webpack-plugin

- success:构建成功的日志提示
- warning:构建警告的日志提示
- error:构建报错的日志提示
- stats设置成errors- only



#### 37丨构建异常和中断处理

**如何判断构建是否成功?**

在CI/CD的pipline 或者发布系统需要知道当前构建状态

每次构建完成后输入echo $?获取错误码



**构建异常和中断处理**

webpack4之前的版本构建失败不会抛出错误码(error code)

Node.js中的process.exit规范

- 0表示成功完成，回调函数中，err为null
- 非0表示执行失败，回调函数中，err 不为null, err.code 就是传给exit 的数字

**如何主动捕获并处理构建错误?**

compiler在每次构建结束后会触发 done 这个 hook

process.exit主动处理构建报错

![image-20221111003141815](https://i.imgur.com/QmqU9Bd.png)

```js
function () {
  this.hooks.done.tap('done', (stats) => {
    console.log(stats.errors)
    // process.exit(0)
  })
}
```

- https://stackoverflow.com/questions/43147330/what-is-difference-between-method-process-exit1-and-process-exit0-in-node-js
- https://nodejs.org/api/process.html#processexitcode
- https://nodejs.org/api/process.html#process_exit_codes

#### 38丨构建配置包设计

**构建配置抽离成npm包的意义**

**通用性**

- 业务开发者无需关注构建配置
- 统一团队构建脚本

**可维护性**

- 构建配置合理的拆分
- README文档、ChangeLog文档等

**质量**

- 冒烟测试、单元测试、测试覆盖率
- 持续集成

**构建配置管理的可选方案**

通过多个配置文件管理不同环境的构建，webpack -- config参数进行控制

将构建配置设计成一个库，比如: hjs- -webpack、 Neutrino、 webpack- -blocks

抽成一个工具进行管理，比如: create-react- -app, kyt, nwb

将所有的配置放在一个文件，通过-- env参数控制分支选择

- https://www.npmjs.com/package/hjs-webpack
- https://www.npmjs.com/package/neutrino
- https://www.npmjs.com/package/webpack-blocks
- https://www.npmjs.com/package/react-scripts
- https://www.npmjs.com/package/kyt
- https://www.npmjs.com/package/nwb



**构建配置包设计**

通过多个配置文件管理不同环境的webpack配置

- 基础配置: webpack.base.js
- 开发环境: webpack.dev.js
- 生产环境: webpack.prod.js
- SSR环境: webpack.ssr.js
- ...

**抽离成一个npm 包统一管理**

- 规范: Git commit日志、README、ESLint规范、Semver规范
- 质量:冒烟测试、单元测试、测试覆盖率和CI

**通过 webpack-merge 组合配置**

https://www.npmjs.com/package/webpack-merge

#### 39丨功能模块设计和目录结构

**功能模块设计**

![image-20221111004830237](https://i.imgur.com/8SBP7yU.png)

**目录结构**

lib放置源代码

test放置测试代码

![image-20221111004951377](https://i.imgur.com/a0h3qU8.png)

拆分不同环境的配置，通过 merge 合并

#### 40丨使用ESLint规范构建脚本

**使用ESL int规范构建脚本**

使用eslint-config- -airbnb- base

eslint -- fix 可以自动处理空格

```json
module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
  },
};
```

#### 41丨冒烟测试介绍和实际运用

- https://www.npmjs.com/package/rimraf
- https://www.npmjs.com/package/glob-all
- https://www.npmjs.com/package/mocha

**冒烟测试(smoke testing)**

冒烟测试是指对提交测试的软件在进行详细深入的测试之前而进行的预测试，这种
预测试的主要目的是暴露导致软件需重新发布的基本功能失效等严重问题。

**冒烟测试执行**

构建是否成功

每次构建完成build目录是否有内容输出

- 是否有JS、CSS等静态资源文件
- 是否有HTML文件



**判断构建是否成功**

在示例项目里面运行构建，看看是否有报错

```js
const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const Mocha = require('mocha');

const mocha = new Mocha({
  timeout: 10000,
});

process.chdir(path.join(__dirname, 'template'));

rimraf('./dist', () => {
  // eslint-disable-next-line global-require
  const prodConfig = require('../../lib/webpack.pord');

  webpack(prodConfig, (err, stats) => {
    if (err) {
      console.error(err);
      process.exit(2);
    }

    console.log(stats.toString({
      color: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    }));
  });

  console.log('Webpack Build Success, begin run test.');

  // 不知道为什么 先执行了，延迟执行一下
  setTimeout(() => {
    mocha.addFile(path.join(__dirname, 'html-test.js'));
    mocha.addFile(path.join(__dirname, 'css-js-test.js'));

    mocha.run();
  }, 3000);
});
```

**判断基本功能是否正常**

编写mocha测试用例

- 是否有JS、CSS等静态资源文件
- 是否有HTML文件

```js
const glob = require('glob-all');

// eslint-disable-next-line no-undef
describe('Checking generated html files', () => {
  // eslint-disable-next-line no-undef
  it('should generate html files', (done) => {
    const files = glob.sync(['./dist/index.html', './dist/search.html']);
    console.log('object', files);

    if (files.length > 0) {
      done();
    } else {
      throw new Error('no html files generated');
    }
  });
});
```

```js
const glob = require('glob-all');

describe('Checking generated css js files', () => {
  it('should generate css js files', (done) => {
    const files = glob.sync([
      './dist/index_*.js',
      './dist/index_*.css',
      './dist/search_*.js',
      './dist/search_*.css',
    ]);

    if (files.length > 0) {
      done();
    } else {
      throw new Error('no css js files generated');
    }
  });
});
```

#### 42丨单元测试和测试覆盖率

- https://github.com/gotwarlost/istanbul
- https://github.com/gotwarlost/istanbul

![image-20221113000931871](https://i.imgur.com/Yt5uNrN.png)

![image-20221113001238178](https://i.imgur.com/oIKZwpy.png)

![image-20221113001253129](https://i.imgur.com/c2dnA4I.png)

#### 43丨持续集成和TravisCI

- https://www.travis-ci.com/

![image-20221113005128247](https://i.imgur.com/aN1OWse.png)

![image-20221113005138720](https://i.imgur.com/SH6M6Xs.png)

接入Travis CI
1. https:/ /travis- -ci.org/ 使用GitHub账号登录
2. 在https:/ /travis- -ci.org/ account/ repositories为项目开启
3. 项目根目录下新增.travis.ymI

![image-20221113005339015](https://i.imgur.com/HIpN57g.png)

#### 44丨发布到npm

发布到npm

添加用户: npm adduser

升级版本

​	升级补丁版本号: npm version patch
​	升级小版本号: npm version minor
​	升级大版本号: npm version major

发布版本: npm publish



#### 45丨Git丨Commi规范和changelog生成

![image-20221113005720379](https://i.imgur.com/1uJ8UHg.png)

![image-20221113005749636](https://i.imgur.com/HKlRVO3.png)

![image-20221113005822212](https://i.imgur.com/bkasYsR.png)

![image-20221113005835285](https://i.imgur.com/8Pnflr8.jpg)

#### 46丨语义化版本（Semantic丨Versioning）规范格式

![image-20221113010204690](https://i.imgur.com/M3tdyiY.png)

![image-20221113010020618](https://i.imgur.com/FreXnLd.png)

![image-20221113010111239](https://i.imgur.com/YM9smU8.png)

![image-20221113010130190](https://i.imgur.com/rv3nB3V.png)

#### 47丨初级分析：使用webpack内置的stats

stats:构建的统计信息

package.json 中使用 stats

```bash
"build:stats": "webpack --config webpack.prod.js --json > stats.json",
```



![image-20221113011416349](https://i.imgur.com/RvCHHAa.jpg)

#### 48丨速度分析：使用speed-measure-webpack-plugin

- https://www.npmjs.com/package/speed-measure-webpack-plugin



![image-20221113011901608](https://i.imgur.com/8Pf9iVP.jpg)

**速度分析插件作用**

分析整个打包总耗时

每个插件和loader的耗时情况

#### 49丨体积分析：使用webpack-bundle-analyzer

![image-20221113012823423](https://i.imgur.com/BwxYmMb.png)

**可以分析哪些问题?**

依赖的第三方模块文件大小

业务里面的组件代码大小



#### 50丨使用高版本的webpack和Node

![image-20221113013737079](https://i.imgur.com/FGv1Gb3.jpg)

![image-20221113013812707](https://i.imgur.com/L2OaX6W.jpg)

#### 51丨多进程多实例构建

- https://webpack.js.org/loaders/thread-loader/

![image-20221113015946094](https://i.imgur.com/p8IzRES.png)

![image-20221113015956399](https://i.imgur.com/uajgIB9.png)

![image-20221113020013496](https://i.imgur.com/N7ty97l.png) 

#### 52丨多进程多实例并行压缩

![image-20221113020527310](https://i.imgur.com/Np16rwx.png)

![image-20221113020542399](https://i.imgur.com/qW1xhiZ.png)

![image-20221113020552299](https://i.imgur.com/VTof56Y.png)

推荐

#### 53丨进一步分包：预编译资源模块

![image-20221113023141437](https://i.imgur.com/SPk9p1r.png)

**进一步分包:预编译资源模块**

思路:将react、react- dom、redux、 react- redux 基础包和业务基础包打包成一个文件

方法:使用DLLPlugin进行分包，DllReferencePlugin 对manifest.json弓|用

![image-20221113023225717](https://i.imgur.com/vkJAmhO.png)

![image-20221113023242507](https://i.imgur.com/C4hx4La.png)

```js
const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    library: ['react', 'react-dom']
  },
  output: {
    filename: '[name]_[hash].ddl.js',
    path: path.join(__dirname, 'build/library'),
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[hash]',
      path: path.join(__dirname, 'build/library/[name].json')
    })
  ]
}
```

#### 54丨充分利用缓存提升二次构建速度

**缓存**

目的:提升二次构建速度

缓存思路:

- babel-loader开启缓存
- terser- -webpack- -plugin 开启缓存
- 使用cache-loader或者hard- source-webpack-plugin

#### 55丨缩小构建目标

缩小构建目标

目的:尽可能的少构建模块

比如babel-loader 不解析node_ modules



![image-20221113023958678](https://i.imgur.com/OfwF8C8.png)

**减少文件搜索范围**

优化resolve.modules配置(减少模块搜索层级)

优化resolve.mainFields配置

优化resolve.extensions 配置

合理使用alias

![image-20221113024036424](https://i.imgur.com/TidgZvO.png)

#### 56丨使用webpack进行图片压缩

图片压缩
要求:基于Node库的imagemin或者tinypng API
使用:配置image- -webpack-loader



- https://www.npmjs.com/package/image-webpack-loader

```json
rules: [{
  test: /\.(gif|png|jpe?g|svg)$/i,
  use: [
    'file-loader',
    {
      loader: 'image-webpack-loader',
      options: {
        mozjpeg: {
          progressive: true,
        },
        // optipng.enabled: false will disable optipng
        optipng: {
          enabled: false,
        },
        pngquant: {
          quality: [0.65, 0.90],
          speed: 4
        },
        gifsicle: {
          interlaced: false,
        },
        // the webp option will enable WEBP
        webp: {
          quality: 75
        }
      }
    },
  ],
}]
```



![image-20221121142259358](https://i.imgur.com/9dYRwRt.png)



#### 57丨使用TreeShaking擦除无用的CSS

**tree shaking(摇树优化)复习**

概念: 1个模块可能有多个方法，只要其中的某个方法使用到了，则整个文件都会被打到
bundle里面去，tree shaking就是只把用到的方法打入bundle，没用到的方法会在
uglify阶段被擦除掉。


使用: webpack默认支持，在.babelrc里设置modules: false即可

- production mode的情况下默认开启

  

要求:必须是ES6的语法，CJS的方式不支持





**无用的CSS如何删除掉?**

PurifyCSS:遍历代码，识别已经用到的CSS class

uncss: HTML需要通过jsdom加载，所有的样式通过PostCSS解析，通过
document.querySelector来识别在html文件里面不存在的选择器



- https://www.npmjs.com/package/purifycss-webpack-plugin
- https://www.npmjs.com/package/mini-css-extract-plugin

![image-20221130014349452](https://i.imgur.com/MvoSRKo.png)

#### 58丨使用动态Polyfill服务

![image-20221130014628362](https://i.imgur.com/CHGmd7G.png)

- https://caniuse.com/?search=promise

![image-20221130015150972](https://i.imgur.com/AIViPiY.png)

- https://github.com/paulmillr/es6-shim

![image-20221130015209644](https://i.imgur.com/o70zcvf.png)

- https://polyfill.io/v3/
- https://polyfill.io/v3/polyfill.min.js?features=Promise

![image-20221130015431686](https://i.imgur.com/kQBvsXt.png)

![image-20221130015552975](https://i.imgur.com/2y8fb9l.png)

![image-20221130015711356](https://i.imgur.com/V0rtaXE.png)

#### 59丨webpack启动过程分析

![image-20221130015853825](https://i.imgur.com/yCMP9Kh.png)

**查找webpack入口文件**

在命令行运行以上命令后，npm会让命令行工具进入node_ modules\.bin 目录
查找是否存在webpack.sh或者webpack.cmd文件，如果存在，就执行，不
存在，就抛出错误。

实际的入口文件是: node_ modules \webpack \bin\webpack.js

```json
"bin": {
  "webpack": "bin/webpack.js"
},
```

![image-20221130020232562](https://i.imgur.com/XKtFe9P.png)

"version": "5.75.0",

```js
const cli = {
	name: "webpack-cli",
	package: "webpack-cli",
	binName: "webpack-cli",
	installed: isInstalled("webpack-cli"),
	url: "https://github.com/webpack/webpack-cli"
};

if (!cli.installed) {
		//...
		process.exitCode = 0;

		//...

		runCommand(packageManager, installOptions.concat(cli.package))
			.then(() => {
				runCli(cli);
			})
			.catch(error => {
				console.error(error);
				process.exitCode = 1;
			});
	});
} else {
	runCli(cli);
}
```

**启动后的结果**

webpack最终找到webpack- -cli (webpack- -command) 这个npm包，并且执行CLI

#### 60丨webpack-cli源码阅读

**webpack- -cli做的事情**

引入yargs,对命令行进行定制

分析命令行参数，对各个参数进行转换，组成编译配置项

引用webpack,根据配置项进行编译和构建



**从NON_ COMPIL ATION_ _CMD分析出不需要编译的命令**

webpack- cli处理不需要经过编译的命令



![image-20221130021319443](https://i.imgur.com/Fgr81ia.png)

![image-20221130021657625](https://i.imgur.com/rXutr4v.png)

- https://www.npmjs.com/package/yargs

![image-20221130021744065](https://i.imgur.com/7xX7YVd.png)

![image-20221130022025149](https://i.imgur.com/MmBYFaW.png)

**webpack-cli执行的结果**

webpack--cli对配置文件和命令行参数进行转换最终生成配置选项参数options

最终会根据配置参数实例化webpack对象，然后执行构建流程

#### 61丨Tapable插件架构与Hooks设计