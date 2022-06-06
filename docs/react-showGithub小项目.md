---
title: react-showGithub小项目
date: 2019-02-12 21:12:56
tags:
categories: React
---

## 前言

之前一直在玩 vue 什么的，对 react 比较好奇 所以就来搞一搞，于是就边看文档变写东西 然后就写了一个显示 Github 信息的小东西。

ps：
预览地址 [showGithub](http://123.207.60.132:6001)
项目地址 [showGithub](https://github.com/xiaotiandada/showGithub)

<!-- more -->

## 技术栈

### React

用于构建用户界面的 JavaScript 库 https://reactjs.org/

### React-Redux

Official React bindings for Redux (不会翻译~~！ 做全局状态等)https://react-redux.js.org/

### React-router

路由(简单点 hhh) https://reacttraining.com/react-router

### Axios

Promise based HTTP client for the browser and node.js (做请求) https://github.com/axios/axios

### Api

Github Api https://developer.github.com/v3/

### Ant Design

组件库 (真香！！) https://ant.design/

### MORE

```js
// ...
// 依赖
"@antv/data-set": "^0.10.1",
"antd": "^3.11.6",
"axios": "^0.18.0",
"bizcharts": "^3.4.3",
"react": "^16.7.0",
"react-dom": "^16.7.0",
"react-redux": "^6.0.0",
"react-router-dom": "^4.3.1",
"react-scripts": "2.1.2",
"redux": "^4.0.1",
"redux-devtools-extension": "^2.13.7",
"redux-logger": "^3.0.6",
"redux-persist": "^5.10.0"
// ...

```

## 界面预览

### 路由 index

![index](react-showGithub小项目/index.png)

### 路由 list

![list](react-showGithub小项目/list.png)

### 路由 about

![about](react-showGithub小项目/about.png)

## 完成进度

自己下班回来抽空写写，一直卡卡顿顿的 终于完成了第一版！！！ 如果大佬们感兴趣的话可以 pr 或者点 start 哦！！！

## 技术实现

### 组件

自己也是重复改了很多次，对于组件化还是很弱鸡 导致代码臃肿~~QAQ

最后将每一个页面放到一个文件夹，如果组件过多可以再次细分，about 没有处理太好(懒 不想改了)，详情可以看代码目录哦。

### 路由

```js
<Router>
  <Switch>
    <Route path="/" exact component={IndexDom} />
    <Route path="/list" exact component={ListDom} />
    <Route path="/about/" exact component={DetailDom} />
    <Redirect from="*" to="/" />
  </Switch>
</Router>
```

一共三个页面，还有一个处理 404 页面的，但是我没有做 404 页面 于是就跳转到首页算了。

### Redux

储存请求回来的数据(没有做太多逻辑 如果重复数据可以不用请求)，手动切换路由的时候便会有数据不用再次请求。

```js
// redux
import { connect } from "react-redux";
import action from "../../store/action/index";

// ...
const { xxx } = this.props;
// ...
const mapStateToProps = state => ({
  ...state
});
export default connect(
  mapStateToProps,
  action
)(IndexDom);
```

如果没有数据 变会自动跳转到首页。

```js
export const isEmptyArray = arr => Array.isArray(arr) && arr.length === 0;

if (isEmptyArray(userList)) this.props.history.push("/");
```

并不是所有的组件都有 history 只有 Router 引入的组件才会有...

ps： 资料 https://github.com/Daotin/Web/blob/a924e9d973/17-React.js/04-react%E8%B7%AF%E7%94%B1.md

### APi

使用 Axios 调用 Github 的接口，他有一个限制 在一定的时间内 ip 只能调用多少次，似乎需要弄一个什么 token 还是 什么 id 来着 我懒得研究了 如果大佬们有空的话可以教教我 下面有联系方式 或者留言 评论什么的

### More

其他的就是一些零零碎碎的东西了，比较重要的大概就是这些。

## 总结

第一次学习 React，然后写项目学习 在实现的过程中肯定有不好的地方，如果大佬有空可以 PR 或者 Issues 或者评论留言 ，我会虚心学习的 嘿嘿嘿。

感觉 React 还是很香的， 高级的写法还没有去学习 今后有空会继续搞搞！！！

基础的第一版大概就是这样的~！！！ 告辞！

## 联系方式

Qq：952822399

Email： 952822399@qq.com

新开了个 Qq 群，大家也可以进来互相交流~ iD 718639024 😏😏😏
