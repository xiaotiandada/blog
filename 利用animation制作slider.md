---
title: 利用animation制作slider
date: 2018-06-25 19:02:53
tags:
categories: '我还不知道分类为什么'
---

# 利用css animation制作slider

> [文章地址](http://ife.baidu.com/course/detail/id/33?t=1529924615098#learn)

> [预览地址](https://xiaotiandada.github.io/ife/%E8%AE%BE%E8%AE%A1%E5%B8%88%E5%AD%A6%E9%99%A2/No.6/)

<!-- more -->

``` html
<div class="container">
    <div class="img">
        <img src="./img/1.jpg" alt="">
    </div>
    <div class="img">
        <img src="./img/2.jpg" alt="">
    </div>
    <div class="img">
        <img src="./img/3.png" alt="">
    </div>
    <div class="img">
        <img src="./img/4.jpg" alt="">
    </div>
    <div class="img">
        <img src="./img/5.jpg" alt="">
    </div>

    <div class="bottom">
        <div class="img-bottom">
            <img src="./img/1.jpg" alt="">
        </div>
        <div class="img-bottom">
            <img src="./img/2.jpg" alt="">
        </div>
        <div class="img-bottom">
            <img src="./img/3.png" alt="">
        </div>
        <div class="img-bottom">
            <img src="./img/4.jpg" alt="">
        </div>
        <div class="img-bottom">
            <img src="./img/5.jpg" alt="">
        </div>
    </div>
</div>
```

``` css
*,
*::after,
*::before {
    box-sizing: border-box;
}
html,
body {
    height: 100%;
}
body {
    padding: 0;
    margin: 0;
}
.container {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
}
div.img {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
div.img img {
    width: 100%;
    height: 100%;
}
div.img:nth-child(1) {
    left: -100%;
    -webkit-transition: .5s;
    -moz-transition: .5s;
    -ms-transition: .5s;
    -o-transition: .5s;
    transition: .5s;
    -webkit-transition-timing-function: ease-out;
    -moz-transition-timing-function: ease-out;
    -ms-transition-timing-function: ease-out;
    -o-transition-timing-function: ease-out;
    transition-timing-function: ease-out;
}
div.img:nth-child(2) {
    top: 100%;
    -webkit-transition: .5s;
    -moz-transition: .5s;
    -ms-transition: .5s;
    -o-transition: .5s;
    transition: .5s;
    -webkit-transition-timing-function: ease-out;
    -moz-transition-timing-function: ease-out;
    -ms-transition-timing-function: ease-out;
    -o-transition-timing-function: ease-out;
    transition-timing-function: ease-out;
}
div.img:nth-child(3) {
    transform: scale(0.1);
    -webkit-transition: 1s;
    -moz-transition: 1s;
    -ms-transition: 1s;
    -o-transition: 1s;
    transition: 1s;
    -webkit-transition-timing-function: ease-in;
    -moz-transition-timing-function: ease-in;
    -ms-transition-timing-function: ease-in;
    -o-transition-timing-function: ease-in;
    transition-timing-function: ease-in;
}
div.img:nth-child(4) {
    transform: scale(2.0);
    -webkit-transition: 1s;
    -moz-transition: 1s;
    -ms-transition: 1s;
    -o-transition: 1s;
    transition: 1s;
    -webkit-transition-timing-function: ease-out;
    -moz-transition-timing-function: ease-out;
    -ms-transition-timing-function: ease-out;
    -o-transition-timing-function: ease-out;
    transition-timing-function: ease-out;
    z-index: 1;
}
div.img:nth-child(5) {
    transform: rotate(-360deg) scale(0.1);
    -webkit-transition: .7s;
    -moz-transition: .7s;
    -ms-transition: .7s;
    -o-transition: .7s;
    transition: .7s;
    -webkit-transition-timing-function: ease-in-out;
    -moz-transition-timing-function: ease-in-out;
    -ms-transition-timing-function: ease-in-out;
    -o-transition-timing-function: ease-in-out;
    transition-timing-function: ease-in-out;
}
div.bottom {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 850px;
    z-index: 10;
}
div.bottom div.img-bottom {
    float: left;
    margin: 0 10px;
}
div.bottom div.img-bottom img {
    width: 150px;
    height: 100px;
}
div.active {
    left: 0 !important;
}
div.active {
    top: 0 !important;
}
div.active {
    transform: scale(1.0) !important;
}
div.active {
    transform: scale(1.0) !important;
}
div.active {
    transform: rotate(0deg) scale(1.0) !important;
}
```

``` js
window.onload = function () {
    var imgBottom = document.getElementsByClassName('img-bottom')
    var imgToggle = document.getElementsByClassName('img')

    var attrArr = [
        'leftImg', 'topImg', 'scaleImg', 'scaleImgs', 'scaleRotateImg'
    ]

    var getCls = function (element) {
        return element.getAttribute('class')
    }
    var setCls = function (element, cls) {
        return element.setAttribute('class', cls)
    }
    var addCls = function (element, cls) {
        var baseCls = getCls(element)
        if (baseCls.indexOf(cls) == -1) {
            setCls(element, baseCls + ' ' + cls)
        }
    }

    var delCls = function(element, cls) {
        var baseCls = getCls(element)
        if(baseCls.indexOf(cls) != -1){
            setCls(element, baseCls.split(cls).join(' ').replace(/\s+/g, ' '))
        }
    }

    var toggleImg = function (i) {
        return function () {
            ImgAddIndex(i)
        }
    }
    for (var i = 0; i < imgBottom.length; i++) {
        imgBottom[i].onclick = toggleImg(i)
    }

    function ImgAddIndex (i) {
        for(var j = 0;j<imgToggle.length;j++) {
            imgToggle[j].style.zIndex = 0
            delCls(imgToggle[j], 'active')
        }

        addCls(imgToggle[i], 'active')
        imgToggle[i].style.zIndex = 9;
    }
}
```