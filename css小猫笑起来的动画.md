---
title: css小猫笑起来的动画
date: 2018-06-05 13:39:54
tags:
categories: '我还不知道分类为什么'
---

### No.3 - CSS transition 和 CSS transform 配合制作动画

[仓库地址](http://ife.baidu.com/course/all)

[预览地址](https://xiaotiandada.github.io/ife/%E8%AE%BE%E8%AE%A1%E5%B8%88%E5%AD%A6%E9%99%A2/No.3/index.html)

[资料](http://ife.baidu.com/note/detail/id/418#)

[文章地址](http://ife.baidu.com/course/detail/id/30)

其实文章地址里面提供的资料已经很不错了！！！（偷懒～

<!-- more -->

### 效果

![截图](css小猫笑起来的动画/cat.png)

![截图](css小猫笑起来的动画/cats.png)

### 代码实现

``` bash
# html
<div class="container">
  <!-- 脸 -->
  <div class="face">
    <!-- 头发 -->
    <div class="hair"></div>
    <!-- 眼睛 -->
    <div class="eye-wrap">
      <div class="eye left">
        <div class="eye-circle">
          <div class="eye-core"></div>
        </div>
        <div class="eye-bottom"></div>
        <div class="face-red"></div>
      </div>
      <div class="eye right">
        <div class="eye-circle">
          <div class="eye-core"></div>
        </div>
        <div class="eye-bottom"></div>
        <div class="face-red"></div>
      </div>
    </div>
    <!-- 鼻子 -->
    <div class="nose"></div>
    <!-- 嘴巴 -->
    <div class="mouth-wrap">
      <div class="mouth left"></div>
      <div class="mouth right"></div>
    </div>
  </div>
  <!-- 耳朵 -->
  <div class="ear-wrap">
    <div class="ear left"></div>
    <div class="ear right"></div>
  </div>
</div>
```

``` bash
# css 动画部分样式
.face,
.hair,
.face-red,
.eye-bottom,
.ear,
.eye-core,
.mouth{
    transition: transform 1s;    
}
.face-red{
    transition: opacity 1s;
}
.mouth{
    transition: border-radius 1s;
}

.face:hover~.ear-wrap .left{
    transform-origin: 50%, 100%;
    transform: rotate(-30deg);
}
.face:hover~.ear-wrap .right{
    transform-origin: 50%, 100%;
    transform: rotate(30deg);
}
.face:hover .eye-wrap .eye-bottom{
    transform: translateY(-15px);
}

.face:hover .eye-wrap .face-red{
    opacity: 1;
}
.face:hover .eye-wrap .eye-core{
    transform: scaleX(.8);
}
.face:hover .mouth-wrap .left{
    border-radius: 0% 40% 50% 50%;
}
.face:hover .mouth-wrap .right{
    border-radius: 0% 40% 50% 50%;
}
.face:hover{
    transform: scaleX(.99);
    transform: translateY(-6px);
}
.face:hover .hair{
    transform: scaleX(.9);
}
```
Qq: 952822399