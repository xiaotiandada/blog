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