---
title: CSS3图片旋转木马效果
date: 2018-06-08 23:48:48
tags:
categories: '我还不知道分类为什么'
---

### CSS3图片旋转木马效果

[模仿demo](https://xiaotiandada.github.io/Case/Anime/CSS3%E5%9B%BE%E7%89%87%E6%97%8B%E8%BD%AC%E6%9C%A8%E9%A9%AC%E6%95%88%E6%9E%9C/)

[资料](http://www.zhangxinxu.com/wordpress/2012/09/css3-3d-transform-perspective-animate-transition/)

[资料demo](http://www.zhangxinxu.com/wordpress/2012/09/css3-3d-transform-perspective-animate-transition/)

---

<!-- more -->


![img](CSS3图片旋转木马效果/img.png)

``` bash
# html

<div class="stage_area">
  <div class="container" id="container">
    <img src="http://image.zhangxinxu.com/image/study/s/s128/mm1.jpg" alt="">
    <img src="http://image.zhangxinxu.com/image/study/s/s128/mm1.jpg" alt="">
    <img src="http://image.zhangxinxu.com/image/study/s/s128/mm1.jpg" alt="">
    <img src="http://image.zhangxinxu.com/image/study/s/s128/mm1.jpg" alt="">
    <img src="http://image.zhangxinxu.com/image/study/s/s128/mm1.jpg" alt="">
    <img src="http://image.zhangxinxu.com/image/study/s/s128/mm1.jpg" alt="">
    <img src="http://image.zhangxinxu.com/image/study/s/s128/mm1.jpg" alt="">
    <img src="http://image.zhangxinxu.com/image/study/s/s128/mm1.jpg" alt="">
    <img src="http://image.zhangxinxu.com/image/study/s/s128/mm1.jpg" alt="">
  </div>
</div>

<div class="stage_button">
  <button id="prev">上滑</button>
  <button id="next">下滑</button>
</div>

# css

.stage_area {
  width: 900px;
  margin-left: auto;
  margin-right: auto;
  background: #f0f0f0;
  -webkit-perspective: 800px;
  -moz-perspective: 800px;
  perspective: 800px;
  position: relative;
  padding: 100px 50px;
  min-height: 100px;
}

.container {
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  transform-style: preserve-3d;

  width: 128px;
  height: 100px;
  left: 50%;
  margin-left: -64px;
  position: absolute;

  /* transform: rotateY(40deg); */

  -webkit-transition: transform 1s;
  -moz-transition: transform 1s;
  transition: transform 1s;
}

.container img {
  position: absolute;
}

.container img:nth-child(1) {
  transform: rotateY(0deg) translateZ(195.839px);
}

.container img:nth-child(2) {
  transform: rotateY(40deg) translateZ(195.839px);
}

.container img:nth-child(3) {
  transform: rotateY(80deg) translateZ(195.839px);
}

.container img:nth-child(4) {
  transform: rotateY(120deg) translateZ(195.839px);
}

.container img:nth-child(5) {
  transform: rotateY(160deg) translateZ(195.839px);
}

.container img:nth-child(6) {
  transform: rotateY(200deg) translateZ(195.839px);
}

.container img:nth-child(7) {
  transform: rotateY(240deg) translateZ(195.839px);
}

.container img:nth-child(8) {
  transform: rotateY(280deg) translateZ(195.839px);
}

.container img:nth-child(9) {
  transform: rotateY(320deg) translateZ(195.839px);
}

# js

window.onload = init
function init(){
  var prev = document.querySelector('#prev')
  var next = document.querySelector('#next')
  var container = document.querySelector('#container')
  var len = 0

  var transform = function(element, value, key) {
    key = key || "Transform";
    ["Moz", "O", "Ms", "Webkit", ""].forEach(function(prefix) {
      element.style[prefix + key] = value;	
    });	
    
    return element;
  }

  prev.addEventListener('click', function(){
    var _this = this
    len-=40

    transform(container, 'rotateY('+ len +'deg)');
    
  })

  next.addEventListener('click', function(){
    var _this = this
    len+=40

    transform(container, 'rotateY('+ len +'deg)');
  })
}
```

---

js部分用了大佬demo的js方法（就是赞！！