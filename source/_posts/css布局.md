---
title: css布局
date: 2018-06-20 16:50:52
tags:
categories: Css
---

> 更多信息可以查看我的github仓库

### MDN 定位

https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/%E5%AE%9A%E4%BD%8D


### MDN 定位实战

https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Practical_positioning_examples

### MDN Flexbox

https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Flexbox

<!-- more -->

### 布局

> 这个基础需要恶补

> 圣杯布局

``` bash
# css
body {
    margin: 0;
    padding: 0;
}

.header,
.footer {
    background: red;
    padding: 20px 0;
}

.container {
    padding-left: 200px;
    padding-right: 200px;
    /* min-width: 600px; */
}

.content,
.left,
.right {
    height: 200px;
    float: left;
    position: relative;
}


.content {
    width: 100%;
    background: gold;
}

.left {
    width: 200px;
    height: 200px;
    background: #333;
    margin-left: -100%;
    right: 200px;
}

.right {
    width: 200px;
    height: 200px;
    background: #eee;
    margin-right: -200px;
}

.footer {
    clear: both;
}

* html .left {
    left: 200px;
}
# html
<div class="header">
    header
</div>

<div class="container">
    <div class="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati iusto cumque quibusdam quis qui sit quisquam iure repellat perferendis. Tempora accusantium dignissimos, magnam est placeat enim dicta dolores nam distinctio!</div>
    <div class="left"></div>
    <div class="right"></div>
</div>

<div class="footer">
    footer
</div>
```

> 双飞翼布局

``` bash
#css 

.left,
.main,
.right {
    float: left;
    min-height: 200px;
}
.left {
    background: gray;
    width: 200px;
    margin-left: -100%;
}
.main {
    background: rgb(252, 102, 102);
    width: 100%;
}
.right {
    background: #333;
    width: 200px;
    margin-left: -200px;
}
.content {
    margin: 0 200px;
    overflow: hidden;
}

#html 
<div class="container">

    <div class="main">
        <div class="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quos labore, ad officiis animi libero ipsam dolorum explicabo placeat facere fuga ex suscipit porro nesciunt quod mollitia corrupti voluptatem a?</div>
    </div>
    <div class="left">left</div>
    <div class="right">right</div>
</div>
```

圣杯布局和双飞翼布局的作用和区别

> http://www.cnblogs.com/woodk/p/5147085.html

> http://www.cnblogs.com/imwtr/p/4441741.html


flex 布局

``` bash
#css
.container {
    -webkit-display:flex;
    display: flex;
    min-height: 200px;
}
.left {
    order: -1;
    background: red;
    flex-basis: 200px;
}
.main {
    background: forestgreen;
    flex-grow: 1;
}
.right{
    background: gold;
    flex-basis: 300px;
}
#html
<div class="container">

    <div class="main">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque quae, veritatis dignissimos laborum debitis id accusantium dolore inventore odit sed! Sunt officiis temporibus esse eum ab fuga ad sequi officia?</div>
    <div class="left">left</div>
    <div class="right">right</div>
</div>
```

> 绝对定位布局

```bash
# css 

.container {
    position: relative;
}

.main,
.right,
.left {
    top: 0;
    height: 130px;
}

.main {
    background: gray;
    margin: 0 300px 0 200px;
}

.right {
    position: absolute;
    width: 300px;
    right: 0;
    background: red;
}

.left {
    width: 200px;
    position: absolute;
    left: 0;
    background: green;
}

#html
<div class="container">
    <div class="main">man</div>
    <div class="left">left</div>
    <div class="right">right</div>
</div>

```

> 实现布局还原

``` bash

#css 
body{
    margin: 0;
    padding: 0;
}

* {
    box-sizing: border-box;
}
.fl{
    float: left;
}
.ri {
    float: right;
}

.header{
    width: 100%;
    min-width: 960px;
    height: 100px;
    background: #333;
}

.header-content{
    width: 960px;
    height: 100%;
    margin: 0 auto;
}
.header-content .logo{
    width: 100px;
    height: 100%;
}
.header-content .logo h1 {
    margin: 0;
    padding: 0;
    font-size: 40px;
    color: #fff;
    line-height: 100px;
    text-align: center;
}
.header-content .about a{
    display: inline-block;
    padding: 0 4px;
    color: #fff;
    font-size: 16px;
    line-height: 100px;
}


.banner{
    width: 100%;
    height: 400px;
    background: rgb(77, 206, 77);
    position: relative;
}

.list{
    position: absolute;
    bottom: 10px;
    right: 10%;
    -webkit-display: flex;
    display: flex;
}

.list span {
    display: block;
    width: 30px;
    height: 40px;
    line-height: 40px;
    background: rgba(238, 238, 238, 0.7);
    border: 1px solid #333;
    float: left;
    text-align: center;
    align-self: flex-end;
    margin: 0 2px;

}
/* .list span:hover{
    height: 50px;
    line-height: 60px;    
} */
.list span.active{
    height: 50px;
    line-height: 60px;    
}

.nav{
    width: 100%;
    height: 80px;
    background: #fff;
    border-bottom: 1px solid #eee;
}

.nav-content {
    width: 960px;
    height: 100%;
    margin: 0 auto;
}

.nav-content a{
    display: block;
    float: left;
    width: 140px;
    height: 50px;
    line-height: 50PX;
    text-align: center;
    text-decoration: none;
    color: #000;
    border-left: 1px solid #c5c5c5;
    border-top: 1px solid #c5c5c5;
    border-right: 1px solid #c5c5c5;
    border-bottom: 1px solid #c5c5c5;
    background: #eee;
    border-radius: 20px 20px 0 0;
    margin-top: 30px;
}
.nav-content a.active{
    background: #fff;
    border-bottom: 1px solid #fff;
}


.main{
    width: 960px;
    overflow: hidden;
    margin: 10px auto 0;
}

.main .row{
    -webkit-display: flex;
    display: flex;
}

.main .row .row-content {
    flex: 1;
    height: 200px;
    text-align: center;
    border: 1px solid #bfbfbf;
    /* padding: 80px; */
    margin: 4px;
    align-items: center;
    justify-content: center;
    -webkit-display: flex;
    display: flex;
}


.footer{
    width: 100%;
    height: 100px;
    background: #404040;
    text-align: center;
    line-height: 100px;
    font-size: 16px;
    color: #fff;
}

# html

<div class="header">
    <div class="header-content">
        <div class="logo fl">
            <h1>logo</h1>
        </div>
        <div class="about ri">
            <a href="#">Github</a>
            <a href="#">Register</a>
            <a href="#">Login</a>
        </div>
    </div>
</div>

<div class="banner">
    <div class="list">
        <span>1</span>
        <span class="active">2</span>
        <span>3</span>
        <span>4</span>
    </div>
</div>

<div class="nav">
    <div class="nav-content">
        <a href="#" class="active">HOME</a>
        <a href="#">PROFLE</a>
        <a href="#">ABOUT</a>
    </div>
</div>

<div class="main">
    <div class="row">
        <div class="row-content">content</div>
        <div class="row-content">content</div>
        <div class="row-content">content</div>
    </div>
    <div class="row">
        <div class="row-content">content</div>
        <div class="row-content">content</div>
        <div class="row-content">content</div>
        <div class="row-content">content</div>
    </div>
    <div class="row">
        <div class="row-content">content</div>
        <div class="row-content">content</div>
        <div class="row-content">content</div>
    </div>
</div>

<div class="footer">
    <p>&copy; 2018 ife.baidu.com</p>
</div>

```

[预览地址](https://xiaotiandada.github.io/ife/%E9%9B%B6%E5%9F%BA%E7%A1%80%E5%AD%A6%E9%99%A2/%E7%AC%AC%E4%B8%83%E5%A4%A9%E5%88%B0%E7%AC%AC%E5%85%AB%E5%A4%A9%EF%BC%9A%E5%AD%A6%E4%B9%A0%E5%B8%83%E5%B1%80/%E8%AE%BE%E8%AE%A1%E6%90%9E%E5%B8%83%E5%B1%80%E8%BF%98%E5%8E%9F/%E8%AE%BE%E8%AE%A1%E6%90%9E%E5%B8%83%E5%B1%80%E8%BF%98%E5%8E%9F.html)