---
title: 把AE动画转换成Web原生动画
date: 2018-06-26 12:00:07
tags:
categories: 动效
---

# 把AE动画转换成Web原生动画

> 先贴效果图

> [预览地址 pc 端食用更佳](https://xiaotiandada.github.io/ife/%E8%AE%BE%E8%AE%A1%E5%B8%88%E5%AD%A6%E9%99%A2/No.8/)

> [模仿san官网效果文章地址](https://juejin.im/post/5aff09ee6fb9a07a9b36365b)

> [博客地址](https://xiaotiandada.github.io/)

<!-- more -->


![img](把AE动画转换成Web原生动画/1.png)

![img](把AE动画转换成Web原生动画/2.png)

> 右边这个动画会一直动 在firefox可以直接打开 其他浏览器需要服务环境

> 正经分割线
---


- [ife](http://ife.baidu.com/course/detail/id/35?t=1529985511134#learn)
- [官网效果](http://vis.baidu.com/)
- [仓库地址](https://github.com/xiaotiandada/ife)
- [lottie库](https://xiaotiandada.github.io/)
https://github.com/airbnb/lottie-web
- [博客地址](https://xiaotiandada.github.io/)

大家其实看第一个就知道怎么弄了 这个我之前写过一个vue-lottie 的时候说过类似的实现方法

[文章地址](https://juejin.im/post/5b180a706fb9a01e780a49d4)

---

## 页面布局
```html
<div class="home-banner">
    <div class="home-banner-left">
        <h1>
            <b>ECharts</b>数据可视化实验室</h1>
        <p>由百度 ECharts 团队创建，联合公司内外众多数据可视化从业人组成的技术研究虚拟组织，致力于数据可视化的相关研究、教育普及、产品研发及生态建设。</p>
    </div>
    <div class="home-banner-right">
        <div id="bm"></div>
    </div>
</div>
```

### 页面样式
``` css
*,
*::after,
*::before {
    box-sizing: border-box;
}

body {
    padding: 0;
    margin: 0;

    background-color: #102131;

    min-height: 100%;
}

.home-banner {
    max-width: 1130px;
    margin: 0 auto;
    position: relative;

    padding-top: 8%;

}


.home-banner-left {
    width: 54%;
    vertical-align: top;
    display: inline-block;
    position: relative;

}

.home-banner-left h1 {
    font-size: 48px;
    line-height: 62px;
    color: #fff;
    font-weight: 800;
    margin: 0;
    margin-bottom: 30px;
}

.home-banner-left h1 b {
    font-size: 53px;
    margin-right: 5px;
}

.home-banner-left p {
    color: rgba(255, 255, 255, .7);
    font-size: 15px;
    padding-right: 47px;
    padding-left: 5px;
    font-weight: 200;
    line-height: 30px;
    letter-spacing: 2px;
}

.home-banner-right {
    width: 62%;
    margin-left: -8%;
    margin-right: -300px;
    vertical-align: top;
    display: inline-block;
    position: relative;
}

#bm {
    max-width: 700px;
    display: block;
}
@media screen and (max-width: 768px) {
    .home-banner {
        padding-top: 2%;
    }

    .home-banner-left {
        text-align: center;
        display: block;
        width: 100%;
        box-sizing: border-box;
        padding: 0 20px;
    }

        .home-banner-right {
        display: block;
        width: 100%;
        margin: 0;
    }
}

````

## 功能实现
``` js
<script src="./lottie.min.js"></script>
<script>
    var animation = lottie.loadAnimation({
        container: document.getElementById('bm'), // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'test.json' // the path to the animation json
    });
</script>
```

其实这里复制粘贴就好了2333

[预览地址 pc 端食用更佳](https://xiaotiandada.github.io/ife/%E8%AE%BE%E8%AE%A1%E5%B8%88%E5%AD%A6%E9%99%A2/No.8/)

ife No.8下面还有一个模仿san官网效果的 结果发现之前已经模仿了2333机缘啊哈哈哈

[模仿san官网效果文章地址](https://juejin.im/post/5aff09ee6fb9a07a9b36365b)