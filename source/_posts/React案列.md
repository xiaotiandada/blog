---
title: React案列
date: 2018-11-23 17:47:51
tags:
categories: React
---

---


# React案列

React 做的小案列

> 记录学习笔记什么的~

[仓库地址](https://github.com/xiaotiandada/react-case)

[博客地址](https://xiaotiandada.github.io/)

[学习资料-reactjs](https://reactjs.org/)

[学习资料-imooc](https://www.imooc.com/)

<!-- more -->



## React案列一

### 简易版-todoList

```js
import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";

class App extends Component {

  // 状态
  constructor(props){
    super(props)
    this.state = {
      list: [],  // 列表数据
      inputValue: ''  // 输入框数据
    }
  }
  
  // 添加列表数据
  addList(){
    // es6 语法
    this.setState({
      list: [...this.state.list, this.state.inputValue],
      inputValue: ''
    })
  }

  // 改变inputValue
  changeInput(e) {
    // 目标值
    let value = e.target.value
    this.setState({
      inputValue: value,
    })
  }

  // 删除列表数据
  delList(index) {
    // 拷贝值 删除
    let list = [...this.state.list]
    list.splice(index, 1)
    this.setState({
      list
    })
  }

  render() {
    return (
      <div>
      <div>
        // 数据绑定  改变事件绑定this
        <input value={this.state.inputValue} onChange={this.changeInput.bind(this)} type="text"/>
        // 添加事件 绑定this
        <button onClick={this.addList.bind(this)}>添加</button>
      </div>
        <ul>
        {
          this.state.list.map((item,index) => {
            return (
              // 删除事件 绑定this 传index
              <li key={index} onClick={this.delList.bind(this, index)}>{item}</li>
            )
          })
        }
        </ul>
      </div>
    );
  }
}

export default App;

```

1. 事件，需要state里面的值需要绑定this

``` js
onClick={this.delList.bind(this, index)}
```

2. 改变state 需要用 this.setState

``` js
this.setState({})
```

3. input 双向绑定数据 不用改变事件 输入框内容不会改变 并且警告报错

``` js
// 改变inputValue
changeInput(e) {
  // 目标值
  let value = e.target.value
  this.setState({
    inputValue: value,
  })
}

<input value={this.state.inputValue} onChange={this.changeInput.bind(this)} type="text"/>

```

> 刚刚搜了一下

[ 参考文章 react中实现数据双向绑定](https://blog.csdn.net/qq_39081974/article/details/81007576)

---

## todoList 组件与通信

``` js

// 父组件
import React, { Component, Fragment } from "react";
import Item from './Item'
class App extends Component {
  constructor(props){
    // ...

    // 绑定this 代码优化
    this.addList = this.addList.bind(this)
    this.changeInput = this.changeInput.bind(this)
    this.delList = this.delList.bind(this)
  }
  
  // ...
  getHead() {
    return (
      <div>
        <input value={this.state.inputValue} onChange={this.changeInput} type="text"/>
        <button onClick={this.addList}>添加</button>
      </div>
    ) 
  }

  getItem() {
    return (
      this.state.list.map((item,index) => {
        return (
          <Item 
            delList={this.delList}    // 子组件调用父组件方法
            key={index}               // 父组件通过属性传递值
            content={item}            // 同
            index={index}             // 同
          />
        )
      })
    )
  }

  render() {
    return (
      <Fragment>                   // 忽略外层包裹的 div 页面不显示
        {this.getHead()}           // 函数返回 head
        <ul>{this.getItem()}</ul>  // 函数返回 Item
      </Fragment>
    );
  }
}

export default App;


// 子组件
import React, { Component } from "react";  // ...

class Item extends Component {

  constructor(props){
    super(props)
    this.delItem = this.delItem.bind(this)  // 同上
  }

  delItem(){
    const {delList, index} = this.props  // 解构赋值
    delList(index)                       // 调用父级方法
  }

  render() {
    const { content } = this.props;     // 解构赋值
    return (
      <li onClick={this.delItem}>{content}</li>  // 调用删除方法
    )
  }
}

export default Item

```

---

### css 样式

1.内样样式需要 

``` js
style={{'background': 'red','color': '#fff'}}
```

2. 定义类名不能用 class

> 因为 class 已经用来 定义React组件

```js
className='head-button'
```

Qq：952822399 

Qq群 iD 718639024

大家也可以进来互相交流~

最后就是厚脸皮的一步(觉得不错可以点个star哦~~~) [仓库地址](https://github.com/xiaotiandada/E-video)

同时也欢迎Pr！！！

同时也欢迎Pr！！！

同时也欢迎Pr！！！