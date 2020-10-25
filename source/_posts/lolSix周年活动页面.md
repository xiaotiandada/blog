---
title: lolSix周年活动页面
date: 2018-03-19 12:27:36
tags:
categories: 动效
---

# 前言

小白文采不好,大佬们看见了多多指点,自己的代码可能也有很多"毒瘤"希望大佬们指正,蟹蟹~~

在掘金看到了一个大佬发的 [LOL六周年里的按钮动画](https://juejin.im/entry/59ad11f3f265da247158203d) 的文章

效果非常 very nice 也很有意思

于是进 [lolSix周年活动页面](http://lol.qq.com/act/a20170810sixyears/index.html?ADTAG=lolweb.index) 看看效果 只剩下哇塞!哇塞!哇塞!

于是自己决定试试,参考首页写一部分效果,于是... 有图有真相 

<!-- more -->


![效果图](lolSix周年活动页面/lolsix.png) 

ps: [demo](https://xiaotiandada.github.io/lolSix/) [demo仓库](https://github.com/xiaotiandada/lolSix)

如果觉得不错的话,可以给个star鼓励一下 蟹蟹~~

两个动画都是通过改变class来完成的效果,简单粗暴 赞~\(≧▽≦)/~\\


``` bash

(function () {
    // 定义所需要的变量
    let navBtns = $('#nav-ul i')
    let navBtnli = $('#nav-ul li')
    let navhs = $('#nav li')
    let navhem = $('#nav em')
    // 两个改变class的计数变量
    let numLi = {
        numi: 1,
        numh: 1
    }
    // 清楚定时器的变量
    let time = null

    // 鼠标经过和移除 触发run方法
    navBtnli.on('mouseover', function () {
        let navI = $(this).children('i')
        run(navI, 'ans2_btn', numLi.numi)
    })
    navBtnli.on('mouseout', function () {
        let target = $(this).children('i')
        stop(target)
    })

    navhs.on('mouseover', function () {
        $(this).removeClass('ligb')
        let navh = $(this).children('em')
        run(navh, 'ans_btn', numLi.numh)
    })

    navhs.on('mouseout', function () {
        let target = $(this).children('em')
        stop(target)
        $(this).addClass('ligb')
    })

    // 接受三个参数, 需要改变的对象, 需要改变的名字, 需要改变的数
    function run(obj, name, num) {
        // js定时器setTimeout 无法调用局部变量的解决办法
        function runs() {
            if (num > 25) {
                num = 1
            }
            obj.css('display', 'block')
            obj.removeClass()
            obj.addClass(nameNav + num)
            num++
            time = setTimeout(function () {
                clearTimeout(time)
                runs()
            }, 30)
        }
        runs()
    }
    // 停止动画
    function stop(target) {
        clearTimeout(time)
        target.css('display', 'none')
    }

})()
```

html结构请参考 官方页面或者我的仓库里面的html文件

然后就是中间的 flash 动画,使用了html object标签,

但是我在Ubuntu上面chrome测试的时候正常没有问题,(自己在Ubuntu开虚拟机上win测试,IE11,360有效果,chrome,firefox就没有了,懵逼 希望有大佬可以跟我提点一二)

但是在Firefox测试的时候不会显示,

于是用了兼容的处理方法,先贴一个通用的处理方法(自己也研究了一会儿,第一次接触2333~~),

``` bash
    // 这是活动页面的解决办法
    // 大家也可以看看这个文档 https://github.com/swfobject/swfobject 
    // An open source Javascript framework for detecting the Adobe Flash Player plugin and embedding Flash (swf) files.
    // 自己英文比较垃圾 chrome 翻译过来就是
    // 用于检测Adobe Flash Player插件并嵌入Flash（swf）文件的开源Javascript框架。

    // 这个文件可以引用腾讯的,也可以下载,也可以新建文件复制粘贴
    <script src="./public/js/swfobject.js"></script>
    <script src="index.swf"></script>
    <script>
        var params = {
            scale: "noscale",
            wmode: "transparent",
            align: "middle",
            allowFullscreen: "true",
            allowScriptAccess: "always",
            FlashVars: "timer=1480586966506&endtimer=1481094000000"
        }
        swfobject.embedSWF("index.swf", "mymovie", "100%", "670", "8.0.0","expressInstall.swf", null, params);
    </script>
```

虽然解决了引入swf动画的兼容问题,但是在firefox上面根本不显示啊 23333~~~

大佬的解决办法非常简单 请继续细心观看文章!

``` bash
// 提前在html结构上面写一个静态的替代图片,然后隐藏
<div class="logob">英雄联盟6周年盛典</div>

// 这里是swf文件的位置
<div id="mymovie" class="mymovie"></div>

// 通过判断 来显示静态图片(虽然没有了swf动画,但是总不不显示比较好 赞 学习了~!)
 setTimeout(function () {
    if ($(".mymovie").length > 0) {
        $(".logob").css({
            "display": "block"
        });
    }
}, 1000)
```

大概就是跌么多了! 如果有不对的地方希望大佬们多多指正,

也可以加小白我交流2333~~ Qq: 952822399

自己大二也快要毕业了QAQ,希望被大佬们带走!!!