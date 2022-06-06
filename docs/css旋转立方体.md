---
title: css旋转立方体
date: 2018-06-24 23:30:56
tags:
categories: '我还不知道分类为什么'
---

## 纯 CSS 制作绕中轴旋转的立方体

- http://ife.baidu.com/course/detail/id/32
- https://codepen.io/jordizle/pen/haIdo
- 文章已经给了很多资料了

> [预览地址](https://xiaotiandada.github.io/ife/%E8%AE%BE%E8%AE%A1%E5%B8%88%E5%AD%A6%E9%99%A2/No.5%20/)

<!-- more -->

``` html
<div id="wrapper">
    <div class="viewport">
        <div class="cube">
            <div class="side">
                <div class="cube-image">1</div>
            </div>
            <div class="side">
                <div class="cube-image">2</div>
            </div>
            <div class="side">
                <div class="cube-image">3</div>
            </div>
            <div class="side">
                <div class="cube-image">4</div>
            </div>
            <div class="side">
                <div class="cube-image">5</div>
            </div>
            <div class="side">
                <div class="cube-image active">6</div>
            </div>
        </div>
    </div>
</div>
```

``` css
*,
*::before,
*::after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

body {
    background: #1b1b1b;
    font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
    font-weight: 300;
}


#wrapper {
    padding-top: 20%;
}

.viewport {
    -webkit-perspective: 800px;
    -moz-perspective: 800px;
    -ms-perspective: 800px;
    -o-perspective: 800px;
    perspective: 800px;


    -webkit-perspective-origin: 50% 50%;
    -moz-perspective-origin: 50% 50%;
    -ms-perspective-origin: 50% 50%;
    -o-perspective-origin: 50% 50%;
    perspective-origin: 50% 50%;

    -webkit-transform: scale(0.8, 0.8);
    -moz-transform: scale(0.8, 0.8);
    -ms-transform: scale(0.8, 0.8);
    -o-transform: scale(0.8, 0.8);
    transform: scale(0.8, 0.8);

        -webkit-transition: .28s;
    -moz-transition: .28s;
    -ms-transition: .28s;
    -o-transition: .28s;
    transition: .28s;

}

.cube {
    position: relative;
    margin: 0 auto;
    height: 200px;
    width: 200px;

    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    -ms-transform-style: preserve-3d;
    -o-transform-style: preserve-3d;
    transform-style: preserve-3d;

    -webkit-transform: rotate(180deg) rotateY(0deg);
    -moz-transform: rotate(180deg) rotateY(0deg);
    -ms-transform: rotate(180deg) rotateY(0deg);
    -o-transform: rotate(180deg) rotateY(0deg);
    transform: rotate(180deg) rotateY(0deg);


    -webkit-transition: 5s;
    -moz-transition: 5s;
    -ms-transition: 5s;
    -o-transition: 5s;
    transition: 5s;
}

.cube>div {
    overflow: hidden;
    position: absolute;
    opacity: .5;
    height: 200px;
    width: 200px;
    background: rgba(0, 191, 255, 0.07);
    border: 2px solid rgb(0, 170, 255);

    -webkit-touch-callout: none;
    -moz-touch-callout: none;
    -ms-touch-callout: none;
    -o-touch-callout: none;
    touch-callout: none;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
}

.cube>div>div.cube-image {
    height: 200px;
    width: 200px;

    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);

    line-height: 200px;
    font-size: 80px;
    text-align: center;
    color: #1b9bd8;

    -webkit-transition: color 600ms;
    -moz-transition: color 600ms;
    -ms-transition: color 600ms;
    -o-transition: color 600ms;
    transition: color 600ms;
}


.cube>div:hover {
    cursor: pointer;
}

.cube>div:active {
    cursor: pointer;
}

.cube:hover {
    -webkit-transform: rotate(180deg) rotateY(360deg);
    -moz-transform: rotate(180deg) rotateY(360deg);
    -ms-transform: rotate(180deg) rotateY(360deg);
    -o-transform: rotate(180deg) rotateY(360deg);
    transform: rotate(180deg) rotateY(360deg);
}

.cube>div:first-child {
    -webkit-transform: rotateX(90deg) translateZ(100px);
    -moz-transform: rotateX(90deg) translateZ(100px);
    -ms-transform: rotateX(90deg) translateZ(100px);
    -o-transform: rotateX(90deg) translateZ(100px);
    transform: rotateX(90deg) translateZ(100px);
    outline: 1px solid transparent;
}

.cube>div:nth-child(2) {
    -webkit-transform: translateZ(100px);
    -moz-transform: translateZ(100px);
    -ms-transform: translateZ(100px);
    -o-transform: translateZ(100px);
    transform: translateZ(100px);
    outline: 1px solid transparent;
}

.cube>div:nth-child(3) {
    -webkit-transform: rotateY(90deg) translateZ(100px);
    -moz-transform: rotateY(90deg) translateZ(100px);
    -ms-transform: rotateY(90deg) translateZ(100px);
    -o-transform: rotateY(90deg) translateZ(100px);
    transform: rotateY(90deg) translateZ(100px);
    outline: 1px solid transparent;
}

.cube>div:nth-child(4) {
    -webkit-transform: rotateY(180deg) translateZ(100px);
    -moz-transform: rotateY(180deg) translateZ(100px);
    -ms-transform: rotateY(180deg) translateZ(100px);
    -o-transform: rotateY(180deg) translateZ(100px);
    transform: rotateY(180deg) translateZ(100px);
    outline: 1px solid transparent;
}

.cube>div:nth-child(5) {
    -webkit-transform: rotateY(-90deg) translateZ(100px);
    -moz-transform: rotateY(-90deg) translateZ(100px);
    -ms-transform: rotateY(-90deg) translateZ(100px);
    -o-transform: rotateY(-90deg) translateZ(100px);
    transform: rotateY(-90deg) translateZ(100px);
    outline: 1px solid transparent;
}

.cube>div:nth-child(6) {
    -webkit-transform: rotateX(-90deg) rotate(180deg) translateZ(100px);
    -moz-transform: rotateX(-90deg) rotate(180deg) translateZ(100px);
    -ms-transform: rotateX(-90deg) rotate(180deg) translateZ(100px);
    -o-transform: rotateX(-90deg) rotate(180deg) translateZ(100px);
    transform: rotateX(-90deg) rotate(180deg) translateZ(100px);
    outline: 1px solid transparent;
}


@media (max-width: 640px) {
    .viewport {
        -webkit-transform: scale(0.6, 0.6);
        -moz-transform: scale(0.6, 0.6);
        -ms-transform: scale(0.6, 0.6);
        -o-transform: scale(0.6, 0.6);
        transform: scale(0.6, 0.6);
    }
}
```

